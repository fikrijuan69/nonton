import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./detail.css";
import CastList from "./CastList";
// import VideoList from "./VideoList";
import MovieList from "./../../components/movie-list/MovieList";
import bg from "../../assets/footer-bg.jpg";

const Cast = () => {
  const { person, id, category } = useParams();

  const [item, setItem] = useState(null);
  //   console.log(item);
  console.log(person);
  console.log(id);
  console.log(category);
  useEffect(() => {
    const getdetailcredit = async () => {
      const response = await tmdbApi.getdetailcredit(person, id, {
        params: {},
      });
      setItem(response);
      console.log(response);
      window.scrollTo(0, 0);
    };
    getdetailcredit();
  }, [person, category, id]);

  console.log(item);
  return (
    <>
      {item && (
        <>
          {/* <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
            </div> */}

          <div className="detailbio" style={{ backgroundImage: `url(${bg})` }}>
            {console.log(item)}
            <div
              className="castsimg"
              style={{
                backgroundImage: `url(${apiConfig.w500Image(
                  item.profile_path
                )})`,
              }}
            ></div>
            <div className="namadet">
              <h1 className="title">{item.title || item.name}</h1>
              <br />
              <h3>Place of birth</h3>
              <h3>{item.place_of_birth}</h3>
              <br />
              <h3>Birthday</h3>
              <h3>{item.birthday}</h3>
            </div>
            <div className="biodatadet">
              <h3>Biodata</h3>
              <h4 className="bio">{item.biography}</h4>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cast;
