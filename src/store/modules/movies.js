import axios from '@/plugins/axios';
import IDs from '@/store/mock/imdb250';
import mutations from '@/store/mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
  },
  getters: {
    slicedIDs: ({ top250 }) => (from, to) => top250.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch('fetchMovies');
      },
      root: true,
    },
    async fetchMovies({ getters, commit }) {
      try {
        const { currentPage, moviesPerPage, slicedIDs } = getters;
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicedIDs(from, to);
        const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
        const response = await Promise.all(requests);
        const movies = serializeResponse(response);
        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
  },
};

export default moviesStore;
