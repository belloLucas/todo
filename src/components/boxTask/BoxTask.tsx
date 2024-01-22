import { FaRegStar } from "react-icons/fa";
// import {  FaStar } from "react-icons/fa";
import { IoMdClose, IoMdColorFill } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import BoxColor from "../boxColor/BoxColor";

import "./BoxTask.scss";
import { useState } from "react";

export default function TaskBox() {
  const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);

  const handleColorBoxOpen = () => {
    setIsColorBoxOpen(true);
  };

  const handleColorSelect = (selectedColor: string) => {
    console.log(selectedColor);
    setIsColorBoxOpen(false);
  };

  return (
    <div className="boxTask">
      <div className="header">
        <input type="text" name="title" id="title" placeholder="Título" />
        <FaRegStar className="addToFavorite" />
      </div>
      <div className="content">
        <textarea
          name="description"
          className="description"
          placeholder="Criar nota..."
        />
      </div>
      <div className="buttons">
        <div className="left">
          <span className="edit">
            <GoPencil />
          </span>
          <span
            className="paint"
            onClick={handleColorBoxOpen}
            style={{
              background: isColorBoxOpen ? "#ffe3b3" : "none",
            }}
          >
            <IoMdColorFill />
          </span>
        </div>
        <span className="remove">
          <IoMdClose />
        </span>
      </div>
      {isColorBoxOpen && (
        <BoxColor
          onSelect={handleColorSelect}
          onClose={() => setIsColorBoxOpen(false)}
        />
      )}
    </div>
  );
}
