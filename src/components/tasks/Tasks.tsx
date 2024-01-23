import BoxTask from "../boxTask/BoxTask";
import { useState } from "react";

import "./Tasks.scss";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, favorite: false },
    { id: 2, favorite: false },
    { id: 3, favorite: false },
  ]);

  const toggleFavorite = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, favorite: !task.favorite } : task
      )
    );
  };

  return (
    <>
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
                onToggleFavorite={toggleFavorite}
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
                onToggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      </section>
    </>
  );
}
