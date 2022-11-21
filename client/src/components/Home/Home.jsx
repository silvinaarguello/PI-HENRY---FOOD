import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes,   getRecipeName,
    getDietTypes,
    orderByScore,
    orderByName,
    filterByType, } from "../../Redux/actions";
import { Link } from 'react-router-dom';
import Card from '../Card/Card'
import Paginado from "../Paginado/paginado";
import s from './Home.module.css';
import NavBar from "../navBar/navBar";
import loader from '../Multimedia/loader.gif';
import notFound from '../Multimedia/notFound.png';
import reload from '../Multimedia/reload1.png';




export default function Home () {

    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.showedRecipes);
    const diets = useSelector((state) => state.diets);
    const isLoading = useSelector((state) => state.isLoading);
    const [name, setName] = useState("");
    const [,setOrder] = useState("");
    

    //---------------------PAGINADO------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1)    //--> Declaro un estado local, currentPage=pagina actual setCurrentPage=cual va a ser la pag actual
    const [recipesPerPage, setRecipesPerPage] = useState(9)  //--> Declaro otro estado local en donde defino la cantidad de recetas por pagina
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
   



useEffect (() =>{
    dispatch(getRecipes());
    dispatch(getDietTypes());
    }, [dispatch]);

const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
};

const handleInput = (e) => {
    e.preventDefault();
    dispatch(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeName(name));
    setCurrentPage(1);
};

const filterTypes = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
};
const orderNames = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Order by name: ${e.target.value}`);
    setCurrentPage(1);
};

const orderScore = (e) => {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setOrder(`Order by score: ${e.target.value}`);
    setCurrentPage(1);
};

return (
    <div>
     <NavBar />
      <div className={s.home}>
        {isLoading ? (
          <img src={loader} alt="Loading..." className={s.loader} />
        ) : typeof currentRecipes[0] === "object" ? (
          <div className={s.cards}>
            {currentRecipes?.map((r) => (
              <Card
                key={r.id}
                image={r.image}
                name={r.name}
                diet={r.diet}
                id={r.id}
              />
            ))}
          </div>
        ) : (
          <div className={s.notFound}>
            <img
             src={notFound}
              alt="Recipe Not Found"
              width="800px"
              height="400px"
            />
          </div>
        )}
        <div className={s.filters}>
          <button className={s.btnReload} onClick={ e =>{handleClick(e)}}>
            <img src={reload} alt="Reload" width="50px" />
          </button>
          <div>
            <form onClick={e =>{handleSubmit(e)}}>
              <input
                className={s.search}
                type="text"
                placeholder="  Write a recipe here..."
                onChange={handleInput}
              />
              <button type="submit" className={s.btnSearch}>
                Search
              </button>
            </form>
          </div>
          <select onChange={filterTypes} className={s.select}>
          <option value="all">Filter By Diets</option>
            {diets?.map((d) => (
              <option key={d.name} value={d.name}>
                {" "}
                {d.name[0].toUpperCase() + d.name.slice(1)}
              </option>
            ))}
            {/* <option value="all">Filter By Diets</option>
            <option value ="gluten free">Gluten Free</option>
            <option value ="dairy free">Dairy Free</option>
            <option value ="ketogenic">Ketogenic</option>
            <option value ="vegetarian">Vegetarian</option>
            <option value="lacto vegetarian">Lacto Vegetarian</option>
            <option value ="lacto ovo vegetarian">Lacto-Ovo-Vegetarian </option>
            <option value ="ovo vegetarian">Ovo-Vegetarian </option>
            <option value ="vegan">Vegan</option>
            <option value ="pescatarian">Pescatarian</option>
            <option value ="paleolithic">Paleolithic</option>
            <option value ="primal">Primal</option>
            <option value ="fodmap friendly">Fodmap Friendly</option>
            <option value ="whole 30">Whole 30</option> */}
          </select>
          <select onChange={orderNames} className={s.select}>
            <option value="all">Order By Name</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select onChange={orderScore} className={s.select}>
            <option value="all">Order By Score</option>
            <option value="high">Highest Score</option>
            <option value="low">Lowest Score</option>
          </select>
          <Link to="/create">
            <button className={s.btnCreate}>Create Your Recipe!</button>
          </Link>
        </div>
      </div>
      <Paginado
        className={s.pagination}
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
      />
    </div>

  );
 }


