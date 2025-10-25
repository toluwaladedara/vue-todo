// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue' // Import the renamed list
import Todo from '../components/Todo.vue'        // Import the detail view
import Auth from "../components/Auth.vue"
import Cookies from 'js-cookie'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
routes : [
  {
    path: '/',
    name: 'Home',
    component: TodoList,
    meta: { requiresAuth: true } // 👈 Mark as protected
  },
  {
    path: '/:id',
    name: 'TodoDetail',
    component: Todo,
    meta: { requiresAuth: true } // 👈 Mark as protected
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth, // The login page
    meta: { requiresAuth: false } // Not protected
  }
]
// ... router setup,
})

router.beforeEach(async (to, from, next) => {
  
  if (to.meta.requiresAuth) {
    
    const token = Cookies.get('auth_token'); 

    if (token) {
     
      next(); 

    } else {
      // 4. No token found, redirect to login page
      console.log("No token found, redirecting to /auth");
      next('/auth');
    }
  } else {
    // 5. Route does not require auth (like '/auth'), allow navigation
    next();
  }
});


export default router