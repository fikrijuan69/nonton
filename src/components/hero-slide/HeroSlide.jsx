import "swiper/css";
import "./heroslide.css";
import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 4));
        // console.log(response);
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
              //   <div>Slide 1</div>
            )}
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
      {/* {movieItems.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))} */}
    </div>
  );
};

const HeroSlideItem = (props) => {
  //   let history = useHistory();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div className="hero-slide-pisah">
      <div
        className={`hero-slide__item ${props.className}`}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="hero-slide__item__content container">
          <div className="hero-slide__item__content__info">
            <h2 className="title">{item.title}</h2>
            <div className="overview">{item.overview}</div>
            {/* <div className="btns">Watch now Watch trailer</div> */}
          </div>

          {/* <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div> */}
        </div>
      </div>
    </div>
  );
};
export default HeroSlide;
