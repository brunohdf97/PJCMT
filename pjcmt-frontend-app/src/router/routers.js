import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/pessoas',
    name: 'Pessoas',
    component: () => import(/* webpackChunkName: "about" */ '../views/pessoas/List.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


export default router;
