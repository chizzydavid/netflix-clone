import { API_KEY } from './constants';

const randomPage = (min = 5) => Math.floor(Math.random() * (min) + 1);
const requests = {
    fetchTrending: `/trending/movie/week?api_key=${API_KEY}&language=en-US&primary_release_date.gte=2010-01-01`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&page=${randomPage(3)}`,
    fetchNetflixMovie: (id) => `/tv/${id}?api_key=${API_KEY}`,
    fetchNetflixTrailer: (id) => `/tv/${id}/videos?api_key=${API_KEY}`,
    fetchTopRated: `/trending/all/week?api_key=${API_KEY}&language=en-US&primary_release_date.gte=2010-01-01&page=${randomPage(3)}`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&page=${randomPage()}`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&page=${randomPage()}`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&page=${randomPage()}`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&page=${randomPage()}`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&page=${randomPage()}`,
    fetchMovieById: (id) => `/movie/${id}?api_key=${API_KEY}`,
    fetchMovieTrailer: (id) => `/movie/${id}/videos?api_key=${API_KEY}`,
    // searchMovie: (query) => `search/movie?query=${query}&api_key=${API_KEY}`,
    searchMovie: (query) => `search/multi?query=${query}&api_key=${API_KEY}`,
}

export default requests;

