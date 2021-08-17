import Home from './Home.vue'
import Checkout from './Checkout.vue'
import Cart from './Cart.vue'
import EditItems from './EditItems.vue'
import Login from './Login.vue'
import AddItem from './AddItem.vue'
import EditItem from './EditItem.vue'

export const routes = [
  { path: '', component: Home },
  { path: '/checkout', component: Checkout },
  { path: '/cart', component: Cart },
  { path: '/edititems', component: EditItems },
  { path: '/additem', component: AddItem },
  { path: '/edititem/:name', component: EditItem },
  { path: '/login', component: Login },

  //Catch-all route
  { path: '*', redirect: '/' }
];