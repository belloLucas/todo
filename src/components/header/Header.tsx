import logo from "../../assets/logo.png";
import { MdSearch } from "react-icons/md";

import "./header.scss";

export default function Header() {
  return (
    <header>
      <div className="left">
        <img src={logo} alt=" Imagem de uma Lista de Tarefas" />
        <h4>CoreNotes</h4>
      </div>
      <form>
        <input type="text" id="search" placeholder="Pesquisar notas" />
        <button type="submit">
          <MdSearch />
        </button>
      </form>
    </header>
  );
}
