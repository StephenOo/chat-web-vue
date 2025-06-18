import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeLayout.vue'),
      children: [
        /*{
          path: '',
          name: 'home',
          component: () => import('../views/layout/HomeIndex.vue')
        },*/
        {
          path: '/chat/:chatId',
          name: 'chat',
          component: () => import('../views/chat/ChatLayout.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginIndex.vue'),
    },
    {
      path: '/error',
      name: 'error',
      children: [
        {
          path: '404',
          name: 'notFound',
          component: () => import('@/views/error/404.vue'),
        },
      ],
    },
    {
      path: '/:path(.*)*',
      redirect: '/error/404', // 路径未找到，则重定向到404页面
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test/Test.vue'),
    },
  ],
})

export default router
