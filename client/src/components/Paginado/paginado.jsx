import React from 'react';
import s from './paginado.module.css';


export default function Paginate({recipesPerPage, recipes, paginate}){
 const pageNumbers = []

 for(let i=1; i<=Math.ceil(recipes/recipesPerPage); i++){
  pageNumbers.push(i)
 }

 return (
    <nav>
        <ul className={s.pagenav}> 
        {
                pageNumbers && pageNumbers.map(e => 
                    (
                        <li key={e} className={s.pagenumber}>
                            <a href={() => false} className={s.apage} onClick={() => paginate(e)}>{e}</a>
                        </li>
                    )
                )
            }
        </ul>
    </nav>
 )

}