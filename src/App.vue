<template>
  <div id="app">
    <PosterBg />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from './components/MoviesList.vue';
import PosterBg from './components/PosterBg.vue';

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
  },
  computed: {
    ...mapGetters('movies', ['moviesList']),
  },
  methods: {
    ...mapActions('movies', ['fetchMovies']),
    onChangePoster(poster) {
      console.log(poster);
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
