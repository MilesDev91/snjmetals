import Vue from 'vue'
import App from './App.vue'
import Header from './components/shared/header.vue'
import Footer from './components/shared/footer.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import VueResource from 'vue-resource'
import store from './vuex_store'

// Font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//Specific icon imports
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
// Add fa icons to library
library.add(faEdit, faPlus)
// Setup Font Awesome
Vue.component('font-awesome-icon', FontAwesomeIcon)

//Setup resources
Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.root = 'https://jns-metals-default-rtdb.firebaseio.com/'

export const router = new VueRouter({
  mode: 'history',
  routes: routes
});

//Beginning of component registration
Vue.component('u-header', Header);
Vue.component('u-footer', Footer);
//End component registration

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
