import { useState } from "react";
import "./CreateTask.scss";
import { FaRegStar } from "react-icons/fa";

interface Task {
  id: number;
  favorite: boolean;
  title: string;
  description: string;
}

interface CreateTaskProps {
  onTaskCreate: (newTask: Task) => void;
}

export default function CreateTask({ onTaskCreate }: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleCreateTask = () => {
    const newTaskId = Math.floor(Math.random() * 1000);

    const newTask: Task = {
      id: newTaskId,
      favorite: !false,
      title: title,
      description: description,
    };

    onTaskCreate(newTask);

    setTitle("");
    setDescription("");
    setIsFavorite(false);
  };

  return (
    <main>
      <div className="createTask">
        <div className="createTaskBox">
          <div className="header">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FaRegStar
              className={`addToFavorite ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteToggle}
            />
          </div>
          <div className="content">
            <textarea
              name="description"
              className="description"
              placeholder="Criar nota..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button
          className="createTaskBtn"
          type="button"
          onClick={handleCreateTask}
        >
          Criar tarefa
        </button>
      </div>
    </main>
  );
}
