import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage,
    },
    {
      path: '/admin',
      name: 'admin',
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
      component: () => import('@/pages/student/index.vue'),
    },
    {
      path: '/student/info/:id',
      name: 'student-info',
      component: () => import('@/pages/student/info.vue'),
    },
  ],
})

export default router
