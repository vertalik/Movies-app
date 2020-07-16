<template>
  <div class="loader__wrapper" v-if="isShowLoader">
    <b-spinner label="Loading..." variant="light"></b-spinner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Loader',
  computed: {
    ...mapGetters(['isShowLoader']),
  },
};
</script>

<style scoped>
.loader__wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
}

</style>
