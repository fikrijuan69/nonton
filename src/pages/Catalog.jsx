import React from "react";

import { useParams } from "react-router";
import MovieGrid from "../components/movie-grid/MovieGrid";

import PageHeader from "../components/page-header/PageHeader";

import { category as cate } from "./../api/tmdbApi";
import bg from "../assets/footer-bg.jpg";

const Catalog = () => {
  const { category } = useParams();

  // console.log(category);

  return (
    <>
      <div style={{ backgroundImage: `url(${bg})` }}>
        {/* <PageHeader>
          {category === cate.movie ? "Movies" : "TV Series"}
        </PageHeader> */}

        <div className="container">
          <div className="section mb-3">
            <MovieGrid category={category} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
