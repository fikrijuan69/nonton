import MovieList from "../components/movie-list/MovieList";
import HeroSlide from "../components/hero-slide/HeroSlide";

import { category, movieType } from "../api/tmdbApi";

const Home = () => {
  return (
    <div className="App">
      <HeroSlide />
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending Movies</h2>
          {/* <Link to={`/movie`}>
          <OutlineButton className="small">View more</OutlineButton>
        </Link> */}
        </div>
        <MovieList category={category.movie} type={movieType.popular} />
      </div>
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending TV</h2>
          {/* <Link to={`/movie`}>
          <OutlineButton className="small">View more</OutlineButton>
        </Link> */}
        </div>
        <MovieList category={category.tv} type={movieType.popular} />
      </div>
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Movie Top Rated</h2>
          {/* <Link to={`/movie`}>
          <OutlineButton className="small">View more</OutlineButton>
        </Link> */}
        </div>
        <MovieList category={category.movie} type={movieType.top_rated} />
      </div>
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>TV Top Rated</h2>
          {/* <Link to={`/movie`}>
          <OutlineButton className="small">View more</OutlineButton>
        </Link> */}
        </div>
        <MovieList category={category.tv} type={movieType.top_rated} />
      </div>
    </div>
  );
};

export default Home;
