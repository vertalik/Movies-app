<template>
  <BContainer>
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeMovie="onRemoveMovie"
          />
        </BCol>
      </template>
      <template v-else>
        <div class="empty-movies-list">Empty List</div>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovieItem from './MovieItem.vue';

export default {
  name: 'MoviesList',
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    MovieItem,
  },
  computed: {
    ...mapGetters('movies', ['isSearch']),
    listTitle() {
      return this.isSearch ? 'Search resault' : 'IMDB Top 250';
    },
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
  },
  methods: {
    ...mapActions('movies', ['removeMovie']),
    ...mapActions(['showNotify']),
    onMouseOver(poster) {
      this.$emit('changePoster', poster);
    },
    async onRemoveMovie({ id, title }) {
      const isConfirm = await this.$bvModal.msgBoxConfirm(
        `Do you really want to delete "${title}"?`,
      );
      if (isConfirm) {
        this.removeMovie(id);
        this.showNotify({
          variant: 'success',
          title: 'Success',
          msg: 'Movie deleted succesful!',
        });
      }
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}

.empty-movies-list{
  color: #fff;
  font-size: 2rem;
  height: 100vh;
  width: 100%;
  text-align: center;
}

</style>
