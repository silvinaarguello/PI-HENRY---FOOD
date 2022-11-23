import React from "react";
import s from './paginado.module.css'

export default function Paginado ({recipesPerPage ,  allRecipes , paginado}) {
  const pageNumbers = []
      for (let i = 0 ; i < Math.ceil(allRecipes/recipesPerPage) ; i++){
     pageNumbers.push(i+1)
  }
  return(
    <nav className={s.nav_container}>
        <ul className={s.ul_container}>
            { pageNumbers && pageNumbers.map(number => (
                <li className={s.li_container} onClick={() => paginado(number)} key={number}>
                     <button type="button">{number}</button> 
                </li>
            ))}
        </ul>
    </nav>
)
}