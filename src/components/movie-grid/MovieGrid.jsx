import React, { useCallback, useEffect, useState } from "react";

import ReactDropdown from "react-dropdown";
import "./moviegrid.css";

import { useNavigate, useParams } from "react-router";

import MovieCard from "./../movie-card/MovieCard";

import tmdbApi, {
  category,
  movieType,
  tvType,
  search,
} from "../../api/tmdbApi";
import Button from "../button/Button";
import { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import Genre from "../genre/Genre";
// import * as Config from "./../../constants/Config";

const MovieGrid = (props) => {
  // console.log(props.category);
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sort, setSort] = useState();

  const { namegenre, idgenre, keyword } = useParams();
  // console.log(idgenre);
  // console.log(keyword);

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined && idgenre === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.popular, {
              params,
            });
            setSort("Movie");
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
            setSort("Tv");
        }
      } else if (idgenre === undefined && keyword != undefined) {
        const params = {
          page: page,
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
        setSort("Search Keyword " + keyword);
      } else {
        const params = {
          page: page,
          with_genres: idgenre,
        };
        response = await tmdbApi.genre(props.category, { params });
        setSort("Genre " + namegenre);
      }
      setItems(response.results);
      // console.log(response.results);
      setTotalPage(response.total_pages);
      // const genre = response.results;
      // genre.map((genrelist, index) => (
      //   console.log(genrelist);
      // ))
    };
    getList();
  }, [keyword, props.category, idgenre]);

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      // console.log("masuk");
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-2 search-awal">
        <h1>Search</h1>
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="section mb-2">
        <h1>Genre</h1>
        <Genre category={props.category} />
      </div>
      <div className="section__header mb-2">
        <h2>{sort}</h2>
      </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard key={index} category={props.category} item={item} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/kategori/${props.category}/search/${keyword}`);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [goToSearch]);

  return (
    <div className="search-bar">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={goToSearch}>Search</Button>
    </div>
  );
};

export default MovieGrid;
