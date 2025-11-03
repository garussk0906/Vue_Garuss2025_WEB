import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Checklist from '@/pages/Checklist.vue'
import Notebook from '@/pages/Notebook.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/checklist', name: 'checklist', component: Checklist },
  { path: '/notebook', name: 'notebook', component: Notebook },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router