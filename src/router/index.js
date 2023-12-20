import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

import mainpage from '../views/mainpage.vue'
import Customer_mainpage from '../views/Customer_mainpage.vue'
import operator_mainpage from '../views/operator_mainpage.vue'



Vue.use(VueRouter)

const routes = [
  
  { path: '/login',
  name: 'login',
  component: login
  },
  { path: '/mainpage',
  name: 'mainpage',
  component: mainpage
  }
  ,
  { path: '/Customer_mainpage',
  name: 'Customer_mainpage',
  component: Customer_mainpage
  },
  { path: '/operator_mainpage',
  name: 'operator_mainpage',
  component: operator_mainpage
  },
  


  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
