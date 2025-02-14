import React from "react";

import { Link } from "react-router-dom";

// import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
// import * as Config from "./../../constants/Config";

const CastCard = (props) => {
  const cast = props.cast;
  console.log(props.category);
  console.log(cast);

  const link = "/cast/person/" + cast.id;
  console.log(link);

  return (
    <Link to={link}>
      <div
        className="casts__item__img"
        style={{
          backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})`,
        }}
      ></div>
      <p className="casts__item__name">{cast.name}</p>
    </Link>
  );
};

export default CastCard;
