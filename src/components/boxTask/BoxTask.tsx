import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoMdClose, IoMdColorFill } from "react-icons/io";
import { GoPencil, GoCheck } from "react-icons/go";
import BoxColor from "../boxColor/BoxColor";

import "./BoxTask.scss";
import { useState } from "react";

interface BoxTaskProps {
  title: string;
  description: string;
  selectedColor?: string;
  favorite: boolean;
  taskId: number;
  onToggleFavorite: (taskId: number) => void;
  onDeleteNote: (taskId: number) => void;
  onTaskEdit: (
    taskId: number,
    updatedTitle: string,
    updatedDescription: string
  ) => void;
  onColorChange: (taskId: number, color: string) => void;
}

export default function TaskBox({
  taskId,
  favorite,
  title: initialTitle,
  description: initialDescription,
  onToggleFavorite,
  onDeleteNote,
  onTaskEdit,
  onColorChange,
  selectedColor,
}: BoxTaskProps) {
  const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
  const [isEditorModeActive, setIsEditorModeActive] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedDescription, setEditedDescription] =
    useState(initialDescription);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleColorBoxOpen = () => {
    setIsColorBoxOpen(true);
  };

  const handleColorSelect = (selectedColor: string) => {
    onColorChange(taskId, selectedColor);
    setIsColorBoxOpen(false);
  };

  const handleEditorModeOpen = () => {
    setIsEditorModeActive(true);
  };

  const handleEdition = () => {
    setIsEditorModeActive(false);
    setTitle(editedTitle);
    setDescription(editedDescription);
    onTaskEdit(taskId, editedTitle, editedDescription);
  };

  const handleToggleNoteFavorite = () => {
    onToggleFavorite(taskId);
  };

  const handleDeleteNote = () => {
    onDeleteNote(taskId);
  };

  return (
    <div className={`boxTask ${selectedColor}`}>
      <div className="header">
        {isEditorModeActive ? (
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Título"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h5>{title}</h5>
        )}
        {favorite ? (
          <FaRegStar
            className="addToFavorite"
            onClick={handleToggleNoteFavorite}
          />
        ) : (
          <button className="favoriteSubmit" type="submit">
            <FaStar
              className="addToFavorite"
              onClick={handleToggleNoteFavorite}
              style={{ color: "#FFA000" }}
            />
          </button>
        )}
      </div>
      <div className="content">
        {isEditorModeActive ? (
          <textarea
            name="description"
            className="description"
            placeholder="Criar nota..."
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <p>{description}</p>
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
        <span className="remove" onClick={handleDeleteNote}>
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
