import { FaRegStar } from "react-icons/fa";
// import {  FaStar } from "react-icons/fa";
import { IoMdClose, IoMdColorFill } from "react-icons/io";
import { GoPencil, GoCheck } from "react-icons/go";
import BoxColor from "../boxColor/BoxColor";

import "./BoxTask.scss";
import { useState } from "react";

export default function TaskBox() {
  const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
  const [isEditorModeActive, setIsEditorModeActive] = useState(false);

  const handleColorBoxOpen = () => {
    setIsColorBoxOpen(true);
  };

  const handleColorSelect = (selectedColor: string) => {
    console.log(selectedColor);
    setIsColorBoxOpen(false);
  };

  const handleEditorModeOpen = () => {
    setIsEditorModeActive(true);
  };

  const handleEdition = () => {
    setIsEditorModeActive(false);
  };

  return (
    <div className="boxTask">
      <div className="header">
        {isEditorModeActive ? (
          <input type="text" name="title" id="title" placeholder="Título" />
        ) : (
          <h5>Titulo</h5>
        )}
        <FaRegStar className="addToFavorite" />
      </div>
      <div className="content">
        {isEditorModeActive ? (
          <textarea
            name="description"
            className="description"
            placeholder="Criar nota..."
          />
        ) : (
          <p>Criar nota...</p>
        )}
      </div>
      <div className="buttons">
        <div className="left">
          {isEditorModeActive ? (
            <span
              className="completeEdit"
              onClick={handleEdition}
              style={{ background: isEditorModeActive ? "#ffe3b3" : "none" }}
            >
              <GoCheck />
            </span>
          ) : (
            <span onClick={handleEditorModeOpen} className="edit">
              <GoPencil />
            </span>
          )}

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
