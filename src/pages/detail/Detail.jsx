import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./detail.css";
import CastList from "./CastList";
import VideoList from "./VideoList";
import GenreButton from "../../components/genrebutton/GenreButton";
import MovieList from "./../../components/movie-list/MovieList";

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  const [director, setDirector] = useState(null); 
  const [writer, setWriter] = useState(null); 
  const [runtime, setRuntime] = useState(null); 

  useEffect(() => {
    const getDetail = async () => {

      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      console.log(response);


      const credits = await tmdbApi.credits(category, id);
      

      const director = credits.crew.find(member => member.job === 'Director');
      const writer = credits.crew.filter(member => member.job === 'Writer');
      
      setDirector(director); 
      setWriter(writer); 

      
      if (category === "movie") {
        setRuntime(response.runtime); 
      }

      window.scrollTo(0, 0);
    };

    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title jarak">{item.title || item.name}</h1>
              {item.release_date || item.first_air_date ? (
                <p className="release-date">
                  Release Date :  {new Date(item.release_date || item.first_air_date).getFullYear()}
                </p>
              ) : null}
                  <h4 className="rating">Rating : {item.vote_average}</h4>
                
              <div className="genres jarak">
                {item.genres &&
                  item.genres.map((genre, index) => (
                    <span key={index} className="genres__item">
                      <GenreButton genre={genre} category={category} />
                    </span>
                  ))}
              </div>
              
              <p className="overview jarak">{item.overview}</p>


              <div className="row">
    {/* Director Section */}
    {director && (
                <div className="director jarak">
                  <h2>Director</h2>
                  <p>{director.name}</p>
                </div>
              )}

              {/* Writer Section */}
              {writer && writer.length > 0 && (
                <div className="writer jarak">
                  <h2>Writers</h2>
                  <ul>
                    {writer.map((w, index) => (
                      <li key={index}>{w.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Runtime Section */}
              {runtime && (
                <div className="runtime jarak">
                  <h2>Runtime</h2>
                  <p>{runtime} minutes</p>
                </div>
              )}
              </div>
                     

              <div className="cast">
                <div className="">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
