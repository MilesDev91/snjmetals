import Home from './Home.vue';
import Checkout from './Checkout.vue';
import Cart from './Cart.vue'

export const routes = [
  { path: '', component: Home },
  { path: '/checkout', component: Checkout },
  { path: '/cart', component: Cart },

  //Catch-all route
  { path: '*', redirect: '/' }
];