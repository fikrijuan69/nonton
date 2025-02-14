import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.css";

import logo from "./../../assets/logo.png";

// import * as Config from "./../../constants/Config";

const headerNav = [
  {
    display: "Home",
    path: `/`,
  },
  {
    display: "Movies",
    path: `/movie`,
  },
  {
    display: "TV Series",
    path: `/tv`,
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to={`/`}>Nonton</Link>
        </div>

        <ul className="header__nav">
          {/* {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={"/kategori" + e.path}>{e.display}</Link>
            </li>
          ))} */}
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/kategori/movie"}>Movies</Link>
          </li>
          <li>
            <Link to={"/kategori/tv"}>Tv Series</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
