import axios from '@/plugins/axios';
import IDs from '@/store/mock/imdb250';
import mutations from '@/store/mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

// eslint-disable-next-line object-curly-newline
const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, SEARCH_TOGGLE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slicedIDs: ({ top250 }) => (from, to) => top250.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesTotal: ({ top250 }) => Object.keys(top250).length,
    top250Movie: ({ top250 }) => top250,
    isSearch: ({ isSearch }) => isSearch,
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch('fetchMovies');
      },
      root: true,
    },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
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
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch('fetchMovies');
    },
    removeMovie({ commit, dispatch, getters }, id) {
      const index = getters.top250Movie.findIndex((item) => item === id);

      if (index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch('fetchMovies');
      }
    },
    async searchMovies({ commit, dispatch }, searchValue) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const response = await axios.get(`/?s=${searchValue}`);
        console.log(response);
        if (response.Error) {
          throw Error(response.Error);
        }

        const movies = serializeResponse(response.Search);
        commit(MOVIES, movies);
      } catch (err) {
        dispatch(
          'showNotify',
          { msg: err.message, title: 'Error', variant: 'danger' },
          { root: true },
        );
        commit(MOVIES, {});
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
      // commit('SEARCH_TOGGLE', serchValue);
    },
    toggleSearch({ commit }, bool) {
      commit(SEARCH_TOGGLE, bool);
    },
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250.splice(index, 1);
    },
    [SEARCH_TOGGLE](state, bool) {
      state.isSearch = bool;
    },
  },
};

export default moviesStore;
