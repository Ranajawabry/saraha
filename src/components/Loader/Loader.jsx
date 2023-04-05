import React from "react";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={style.loading}>
      <div className={style.spinner}>
        <div className={style.rect1} />
        <div className={style.rect2} />
        <div className={style.rect3} />
        <div className={style.rect4} />
        <div className={style.rect5} />
      </div>
    </div>
  );
}
