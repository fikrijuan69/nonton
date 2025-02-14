import React from "react";

import "./moviecard.css";

import { Link } from "react-router-dom";

// import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
// import * as Config from "./../../constants/Config";

const MovieCard = (props) => {
  const item = props.item;
  let rate;
  if (props.type === "top_rated") {
    rate = (
      <div>
        <span>Rating</span>
        <h4>{item.vote_average}</h4>
      </div>
    );
  }
  const link = "/detail/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        {/* <Button>
          <i className="bx bx-play"></i>
        </Button> */}
      </div>
      <div className="title-card">
        {/* <h3>{item.title || item.name}</h3> */}
        {rate}
      </div>
      {/* {console.log(item)} */}
    </Link>
  );
};

export default MovieCard;
