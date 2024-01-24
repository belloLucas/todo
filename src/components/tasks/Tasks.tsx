import BoxTask from "../boxTask/BoxTask";
import CreateTask from "../createTask/CreateTask";
import { useState, useEffect } from "react";

import "./Tasks.scss";

interface Task {
  title: string;
  description: string;
  id: number;
  favorite: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const toggleFavorite = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, favorite: !task.favorite } : task
      )
    );
  };

  const createTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = async (
    taskId: number,
    updatedTitle: string,
    updatedDescription: string
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, title: updatedTitle, description: updatedDescription }
        : task
    );

    setTasks(updatedTasks);

    try {
      const response = await fetch(
        `https://todo-api-jijk.onrender.com/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error updating task:", response.statusText);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? { ...task, title: task.title, description: task.description }
              : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteNote = async (taskId: number) => {
    try {
      const response = await fetch(
        `https://todo-api-jijk.onrender.com/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error("Error deleting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://todo-api-jijk.onrender.com/tasks"
        );
        if (response.ok) {
          const tasksData = await response.json();
          setTasks(tasksData);
        } else {
          console.error("Error fetching tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://todo-api-jijk.onrender.com/tasks"
        );
        if (response.ok) {
          const tasksData = await response.json();
          setTasks(tasksData);
        } else {
          console.error("Error fetching tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <CreateTask onTaskCreate={createTask} />
      <section className="favorite">
        <p className="title">Favoritas</p>
        <div className="fav-row">
          {tasks
            .filter((task) => !task.favorite)
            .map((task) => (
              <BoxTask
                key={task.id}
                taskId={task.id}
                favorite={task.favorite}
                title={task.title}
                description={task.description}
                onToggleFavorite={toggleFavorite}
                onDeleteNote={() => deleteNote(task.id)}
                onTaskEdit={editTask}
              />
            ))}
        </div>
      </section>
      <section className="others">
        <p className="title">Outras</p>
        <div className="others-row">
          {tasks
            .filter((task) => task.favorite)
            .map((task) => (
              <BoxTask
                key={task.id}
                taskId={task.id}
                favorite={task.favorite}
                title={task.title}
                description={task.description}
                onToggleFavorite={toggleFavorite}
                onDeleteNote={() => deleteNote(task.id)}
                onTaskEdit={editTask}
              />
            ))}
        </div>
      </section>
    </>
  );
}
