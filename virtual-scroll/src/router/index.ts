import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/index.vue'
import article from '../views/article.vue'
const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/article/:title/:reads/:from/:date/:image',
      name: 'article',
      component: article,
    },
  ],
  history: createWebHashHistory(),
})
export default router
