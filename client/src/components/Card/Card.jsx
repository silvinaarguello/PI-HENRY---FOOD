import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css';


export default function Card({ image, name, diets, id }) {
    return (
      <div className={s.card}>
      <Link to={"/recipes/" + id} className={s.link}>
        <img src={image} alt="" width="120px" className={s.img} />
        <h3 className={s.name}>{name[0].toUpperCase() + name.slice(1)}</h3>
        {diets?.map((d) => (
          <p className={s.types} key={d}>
            {d[0].toUpperCase() + d.slice(1)}
          </p>
        ))}
      </Link>
    </div>
  );
}