import React, { useState } from 'react'

import { HEADER_LIST } from "./utils";
import './Header.css';

const Header = () => {

  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);

  const toggleMenu = () => {
    navClass = !navClass;
    menuClass = !menuClass;
    setNavClass(navClass);
    setMenuClass(menuClass);
    if(navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  }

  return (
    <div className="header-nav-wrapper">
      <div className="header-bar"></div>
      <div className="header-navbar">
        <div className="header-image">
          <img src="https://image.flaticon.com/icons/png/128/2991/2991485.png" alt="" />
        </div>
        <div 
          className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`}
          id="header-mobile-menu"
          onClick={() => toggleMenu()}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
          { HEADER_LIST.map(navItem => (
            <li className="header-nav-item" key={navItem.id}>
              <span className="header-list-item">
                <i className={navItem.iconCass}></i>
              </span>
              <span className="header-list-item text">{navItem.name}</span>
            </li>
          )) }
        </ul>
        <input 
          className="search-input"
          type="text"
          placeholder="Search for a movie"
        />
      </div>
    </div>
  )
}

export default Header;
