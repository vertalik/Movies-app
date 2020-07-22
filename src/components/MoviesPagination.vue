<template>
  <div class="pagination__wrapper">
    <b-pagination v-show="!isSearch"
      v-model="currentPageModel"
      :per-page="perPage"
      :total-rows="total"
      prev-text="Prev"
      next-text="Next"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MoviesPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    ...mapGetters('movies', ['isSearch']),
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit('pageChanged', value);
      },
    },
  },
};
</script>

<style scoped>
.pagination__wrapper {
  display: flex;
  justify-content: center;
  padding: 30px 0px;
}

.pagination__wrapper >>> .pagination .page-item .page-link {
  background-color: transparent;
  color: #fff;
}

.pagination__wrapper >>> .pagination .page-item.active .page-link {
  border-color: #fff;
  background-color: #fff;
  color: #000;
}

.pagination__wrapper >>> .pagination .page-item.disabled .page-link {
  color: silver;
}
</style>
