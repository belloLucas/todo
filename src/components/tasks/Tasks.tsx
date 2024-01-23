import BoxTask from "../boxTask/BoxTask";
import CreateTask from "../createTask/CreateTask";
import { useState } from "react";

import "./Tasks.scss";

interface Task {
  id: number;
  favorite: boolean;
  title: string;
  description: string;
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

  const editTask = (
    taskId: number,
    updatedTitle: string,
    updatedDescription: string
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task
      )
    );
  };

  const deleteNote = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

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
                onDeleteNote={deleteNote}
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
                onDeleteNote={deleteNote}
                onTaskEdit={editTask}
              />
            ))}
        </div>
      </section>
    </>
  );
}
