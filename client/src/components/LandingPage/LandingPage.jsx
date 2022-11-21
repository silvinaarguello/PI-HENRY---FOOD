import React from 'react';
import {Link} from 'react-router-dom';
import s from './LandingPage.module.css';
  


export default function LandingPage() {
    return (
        <div className={s.landing}>
        <div className={s.div}>
            <div className={s.content}>
                <h2>HENRY</h2>
                <h2>HENRY</h2>
            </div><div className={s.content}>
                <h2>FOOD</h2>
                <h2>FOOD</h2>
            </div>
        </div>
        <Link to='/home'>
            <button type="button" >Let's Cook</button>
        </Link>
        </div>
    )
}