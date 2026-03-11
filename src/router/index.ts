import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth.store'
import UserLayout from '@/layout/UserLayout.vue'

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

    // -------------------------------------------------------------
    // test login user
    // -------------------------------------------------------------
    {
      path: '/user/login',
      name: 'user-login',
      component: () => {
        return import('../views/UserLoginView.vue')
      },
    },
    {
      path: '/user/dashboard',
      name: 'user-dashboard',
      component: () => import('../views/UserDashBoardView.vue'),
      // meta: { requiresUserAuth: true, requiresUser: true },
      meta: { requiresUserAuth: true },
    },
    {
      path: '/user/:user_id/confirm-change-email/:confirmation_id',
      name: 'user-confirm-change-email',
      component: () => import('../views/ConfirmChangeEmailView.vue'),
    },
    // -------------------------------------------------------------
    // users route mới
    // -------------------------------------------------------------
    {
      path: '/users',
      component: UserLayout,
      children: [
        {
          path: '',
          name: 'users',
          component: () => import('../views/UserView.vue'),
        },
        {
          path: 'new',
          name: 'users-new',
          component: () => import('../views/UserView.vue'),
        },
        {
          path: ':user_id/edit',
          name: 'users-edit',
          component: () => import('../views/UserView.vue'),
        },
      ],
    },
    // -------------------------------------------------------------
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isAuthenticated
  const userRole = localStorage.getItem('role')
  const isUserLoggedIn = localStorage.getItem('user_token') !== null
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresUserAuth && !isUserLoggedIn) {
    next('/user/login')
  } else if (to.meta.requiresAdmin && userRole !== 'admin') {
    next({ name: 'user-dashboard' })
  } else if (to.meta.requiresUser && userRole !== 'user') {
    next({ name: 'user-login' })
  } else {
    next()
  }
})

export default router
