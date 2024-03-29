import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import VueResource from 'vue-resource'
import store from './vuex_store'

// Async/Await
import babelPolyfill from 'babel-polyfill'
Vue.use(babelPolyfill)

// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//Specific icon imports
import { faEdit, faPlus, faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// Add fa icons to library
library.add(faEdit, faPlus, faArrowLeft, faTrashAlt)
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

//Components
import Header from './components/shared/header.vue'
import Footer from './components/shared/footer.vue'
import ItemCard from './components/ItemCard.vue'
import ItemSection from './components/ItemSection.vue'
//Beginning of component registration
Vue.component('u-item-section', ItemSection)
Vue.component('u-item-card', ItemCard)
Vue.component('u-header', Header);
Vue.component('u-footer', Footer);
//End component registration

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
