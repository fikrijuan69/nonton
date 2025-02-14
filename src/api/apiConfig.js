const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "e3fa8bf7e067cea74ae03c3575fe7562",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
