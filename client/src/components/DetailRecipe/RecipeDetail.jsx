import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeId, cleanDetail } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../../components/navBar/navBar';
import s from './RecipeDetail.module.css';



// export default function RecipeDetail() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { image, name, diet, summary, score, healthScore, instructions } =
//     useSelector((state) => state.detail);

//     console.log('detail');

//   useEffect(() => {

//     dispatch(getRecipeId(id));
//     return () => {
//       dispatch(cleanDetail());
//     };
//   }, [id, dispatch]);
const RecipeDetail = ({match}) => {
  let dispatch = useDispatch();
  let id = match.params.id;
  let p = useSelector((state) => state.detail)

  useEffect(() => {
    dispatch(getRecipeId(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id, dispatch]);



  return (
    <div>
      <NavBar />
      <div className={s.content}>
        <h3 className={s.title}>{p.name}</h3>
        <img
          src={p.image}
          alt="Img Not Found"
          width="500px"
          className={s.img}
        />
        <div className={s.summary}>
          <p>{p.summary && p.summary.replace(/<[^>]+>/g, "")}</p>
        </div>
        <div className={s.types}>
          {p.diet?.map((d) => (
            <h4 key={d}>{d}</h4>
          ))}
        </div>
        <div className={s.scores}>
          <span id="score">
            Score:{" "}
            <progress id="score" max="100" value={p.score} className={s.score} />{" "}
            {p.score}/100
          </span>
          <span id="healthScore">
            Health Level:{" "}
            <progress
              id="healthScore"
              max="100"
              value={p.healthScore}
              className={s.score}
            />{" "}
            {p.healthScore}/100
          </span>
        </div>
        <div className={s.instructions}>
          {p.instructions && (
            <p dangerouslySetInnerHTML={{ __html: `${p.instructions}` }} />
          )}
        </div>
      </div>
    </div>
  );
}
 export default RecipeDetail;