import App from 'vue';
import Router from 'vue-router';

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      component: App,
    },
  ],
});

export default router;
