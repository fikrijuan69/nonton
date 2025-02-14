import React, { useEffect, useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";

import "./genre.css";
import MovieCard from "../movie-card/MovieCard";

import tmdbApi, { category } from "./../../api/tmdbApi";

import GenreButton from "../genrebutton/GenreButton";

const Genre = (props) => {
  //   console.log(props.category);
  const [gen, setgen] = useState([]);

  useEffect(() => {
    const getListgenre = async () => {
      let response = null;
      const params = {};

      response = await tmdbApi.genrelist(props.category, { params });

      setgen(response.genres);
      //   console.log(response.genres);
    };
    getListgenre();
  }, [props.category]);
  //   console.log(gen);
  return (
    <div className="genre">
      {gen.map((genre, index) => (
        <div key={index} className="genre_item">
          <GenreButton genre={genre} category={props.category} />
        </div>
      ))}
    </div>
  );
};

export default Genre;
