<template>
  <header class="header">
    <b-navbar type="dark" variant="dark" class="navbar">
      <b-container>
        <b-navbar-brand href="#">MoviesDB</b-navbar-brand>
        <b-nav-form>
          <b-form-input
            class="mr-sm-2 search-input"
            placeholder="Search"
            debounce="500"
            v-model="searchValue"
          ></b-form-input>
        </b-nav-form>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    searchValue: '',
  }),
  methods: {
    ...mapActions('movies', ['searchMovies', 'fetchMovies', 'toggleSearch']),
    onSearchValue(value) {
      if (value) {
        this.toggleSearch(true);
        this.searchMovies(value);
      } else {
        this.toggleSearch(false);
        this.fetchMovies();
      }
    },
  },
  watch: {
    searchValue: 'onSearchValue',
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}

.search-input:focus {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
}
</style>
