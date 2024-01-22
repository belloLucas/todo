import BoxTask from "../boxTask/BoxTask";

import "./Tasks.scss";

export default function Tasks() {
  return (
    <>
      <section className="favorite">
        <p className="title">Favoritas</p>
        <div className="fav-row">
          <BoxTask></BoxTask>
          <BoxTask></BoxTask>
          <BoxTask></BoxTask>
        </div>
      </section>
      <section className="others">
        <p className="title">Outras</p>
        <div className="others-row">
          <BoxTask></BoxTask>
          <BoxTask></BoxTask>
          <BoxTask></BoxTask>
        </div>
      </section>
    </>
  );
}
