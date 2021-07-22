import Home from './Home.vue'
import Checkout from './Checkout.vue'
import Cart from './Cart.vue'
import EditItems from './EditItems.vue'

export const routes = [
  { path: '', component: Home },
  { path: '/checkout', component: Checkout },
  { path: '/cart', component: Cart },
  /*{ path: '/edititems', component: EditItems },*/

  //Catch-all route
  { path: '*', redirect: '/' }
];