import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/pages/index.vue'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Homepage,
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true, requiresAdmin: true },
      component: () => import('@/pages/admin/index.vue'),
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/pages/admin/dashboard/index.vue'),
        },
        {
          path: 'subjects',
          name: 'admin-subjects',
          component: () => import('@/pages/admin/subjects/index.vue'),
        },
        {
          path: 'students',
          name: 'admin-students',
          component: () => import('@/pages/admin/students/index.vue'),
        },
        {
          path: 'courses',
          name: 'admin-courses',
          component: () => import('@/pages/admin/courses/index.vue'),
        },
        {
          path: 'account',
          name: 'admin-account',
          component: () => import('@/pages/admin/account/index.vue'),
        },
        {
          path: 'curriculum',
          name: 'admin-curriculum',
          component: () => import('@/pages/admin/curriculum/index.vue'),
        },
        {
          path: 'approval-queue',
          name: 'admin-approval-queue',
          component: () => import('@/pages/admin/approval-queue/index.vue'),
        },
        {
          path: 'setting',
          name: 'admin-setting',
          component: () => import('@/pages/admin/setting/index.vue'),
        },
      ],
    },
    {
      path: '/student',
      name: 'student-page',
      meta: { requiresAuth: true, requiresStudent: true },
      component: () => import('@/pages/student/index.vue'),
    },
    {
      path: '/student/info',
      name: 'student-info',
      meta: { requiresAuth: true, requiresStudent: true },
      component: () => import('@/pages/student/info.vue'),
    },
  ],
})

const ADMIN_USER_ID = 'GHh3aoG1qadCtG6Ey2cWQMTZy173'

router.beforeEach(async (to, _unused, next) => {
  const user = await getCurrentUser()
  const isAuthenticated = !!user
  const isAdmin = user?.uid === ADMIN_USER_ID

  if (isAuthenticated && to.meta.requiresStudent) {
    const target = isAdmin ? 'admin-dashboard' : 'student-page'
    if (to.name !== target) {
      return next({ name: target })
    }
    return next()
  }

  if (!isAuthenticated && to.meta.requiresAuth) {
    if (to.name !== 'auth') {
      return next({ name: 'auth' })
    }
    return next()
  }

  if (to.meta.requiresAdmin && isAuthenticated && !isAdmin) {
    if (to.name !== 'student-page') {
      return next({ name: 'student-page' })
    }
    return next()
  }

  next()
})

export default router
