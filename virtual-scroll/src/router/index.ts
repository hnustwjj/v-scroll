import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
  ],
  history: createWebHashHistory(),
})
export default router
