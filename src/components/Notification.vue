<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapGetters(['messages']),
  },
  watch: {
    messages: 'showNotifications',
  },
  methods: {
    showNotifications({ variant, title, msg }) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true,
      });
    },
  },
};
</script>
