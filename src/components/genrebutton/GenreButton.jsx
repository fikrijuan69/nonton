import React from "react";

import { Link } from "react-router-dom";

// import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
// import * as Config from "./../../constants/Config";

const GenreButton = (props) => {
  const genre = props.genre;
  //   console.log(props.category);
  //   console.log(genre);

  const link =
    "/kategori/" + props.category + "/genre/" + genre.name + "/" + genre.id;
  //   console.log(link);

  return (
    <Link to={link}>
      {/* <div
        className="casts__item__img"
        style={{
          backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})`,
        }}
      ></div> */}
      {genre.name}
    </Link>
  );
};

export default GenreButton;
