import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (category, params) => {
    const url = "search/" + category;
    console.log(url, params);
    return axiosClient.get(url, params);
  },
  genre: (category, params) => {
    const url = "discover/" + category;
    console.log(url, params);
    return axiosClient.get(url, params);
  },
  genrelist: (category, params) => {
    const url = "genre/" + category + "/list";
    console.log(url, params);
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  getdetailcredit: (person, id, params) => {
    const url = "/" + person + "/" + id;
    console.log(url);
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    // console.log(url);
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
