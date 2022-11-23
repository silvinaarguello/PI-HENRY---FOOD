import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeId, cleanDetail } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../../components/navBar/navBar';
import s from './RecipeDetail.module.css';

export default function RecipeDetail() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

 
  useEffect(() => {

   
    return () => {
      dispatch(getRecipeId(id));
    };
  }, []);
console.log(id);
  const { image, name, diets, summary, score, healthScore, steps } = useSelector((state) => state.detail);
 console.log(image, name, diets, summary, score, healthScore, steps)

 return (
    <div>
      <NavBar />
      <div className={s.content}>
        <h3 className={s.title}>{name}</h3>
        <img
          src={image}
          alt="Img Not Available"
          width="500px"
          className={s.img}
        />
        <div className={s.summary}>
          <p>{summary && summary.replace(/<[^>]+>/g, "")}</p>
        </div>
        <div className={s.types}>
          {diets?.map((d) => (
            <h4 key={d}>{d}</h4>
          ))}
        </div>
        <div className={s.scores}>
          <span id="score">
            Score:{" "}
            <progress id="score" max="100" value={score} className={s.score} />{" "}
            {score}/100
          </span>
          <span id="healthScore">
            Health Level:{" "}
            <progress
              id="healthScore"
              max="100"
              value={healthScore}
              className={s.score}
            />{" "}
            {healthScore}/100
          </span>
        </div>
        {/* <div className={s.steps}>
          {steps && (
            <p dangerouslySetInnerHTML={{ __html: `${steps}` }} />
          )}
        </div> */}
      </div>
    </div>
  );
}

