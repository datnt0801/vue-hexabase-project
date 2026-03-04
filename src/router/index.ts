import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // component: () => import('../views/LoginView.vue'),
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: () => import('../views/AdminView.vue'),
    //   meta: { requiresAuth: true, requiresAdmin: true },
    // },
    {
      path: '/food',
      name: 'food',
      component: () => import('../views/FoodView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user',
      name: 'user',
      component: () => {
        return import('../views/UserView.vue')
      },
    },
    {
      path: '/react',
      name: 'react',
      component: () => {
        return import('../views/UserViewByReact.vue')
      },
    },
    {
      path: '/user/register',
      name: 'user-register',
      component: () => {
        return import('../views/RegisterView.vue')
      },
    },
    {
      path: '/user/edit/:user_id',
      name: 'user-edit',
      component: () => {
        return import('../views/EditView.vue')
      },
    },
    {
      path: '/user/login',
      name: 'user-login',
      component: () => {
        return import('../views/UserLoginView.vue')
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isAuthenticated
  const userRole = localStorage.getItem('role')

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresAdmin && userRole !== 'admin') {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
