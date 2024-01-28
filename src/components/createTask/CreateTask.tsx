import { useState } from "react";
import "./CreateTask.scss";
import { FaRegStar } from "react-icons/fa";

interface Task {
  title: string;
  description: string;
  color: string;
  id: number;
  favorite: boolean;
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

  const handleCreateTask = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTaskId = Math.floor(Math.random() * 1000);

    const newTask: Task = {
      title: title,
      description: description,
      color: "white",
      id: newTaskId,
      favorite: !false,
    };

    await onTaskCreate(newTask);

    try {
      const response = await fetch("https://todo-api-jijk.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        onTaskCreate(newTask);
        console.log("Task created successfully");
      } else {
        console.error("Error creating task:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }

    setTitle("");
    setDescription("");
    setIsFavorite(false);
  };

  return (
    <main>
      <div className="createTask">
        <form onSubmit={handleCreateTask}>
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
          <button className="createTaskBtn" type="submit">
            Criar tarefa
          </button>
        </form>
      </div>
    </main>
  );
}
