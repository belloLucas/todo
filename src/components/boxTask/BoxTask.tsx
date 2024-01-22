import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdClose, IoMdColorFill } from "react-icons/io";
import { GoPencil } from "react-icons/go";

import "./BoxTask.scss";

export default function TaskBox() {
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
            <GoPencil></GoPencil>
          </span>
          <span className="paint">
            <IoMdColorFill></IoMdColorFill>
          </span>
        </div>
        <span className="remove">
          <IoMdClose></IoMdClose>
        </span>
      </div>
    </div>
  );
}
