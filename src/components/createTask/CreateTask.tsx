import "./CreateTask.scss";
import { FaRegStar } from "react-icons/fa";

export default function Tasks() {
  return (
    <main>
      <div className="createTask">
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
          <button className="createTaskBtn" type="submit">
            Criar tarefa
          </button>
        </div>
      </div>
    </main>
  );
}
