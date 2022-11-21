import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../Multimedia/volver.png";
import logoHome from "../Multimedia/LogoHomereformado.png";
import s from './navBar.module.css';


export default function NavBar() {
    return (
      <div className={s.nav}>
        <Link to="/">
          <img src={logo} alt="Start" width="65px" className={s.landing} />
        </Link>
        <Link to="/home">
          <img src={logoHome} alt="Home" width="55px" className={s.home} />
        </Link>
      </div>
    );
  }