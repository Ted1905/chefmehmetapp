import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/pages/dashboard'),
    meta: { guest: true },
  },
  {
    path: '/menu-list',
    name: 'menuList',
    component: () => import('../views/pages/menuList'),
    meta: { guest: true },
  },
  {
    path: '/add-dish',
    name: 'addDish',
    component: () => import('../views/pages/addDish'),
    meta: { guest: true },
  },
  {
    path: '/edit-dish/:id',
    name: 'editDish',
    component: () => import('../views/pages/editDish'),
    meta: { guest: true },
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/pages/menu'),
    meta: { guest: true },
  },

];

const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});





export default router;