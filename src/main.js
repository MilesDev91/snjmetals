import Vue from 'vue'
import App from './App.vue'
import Header from './components/shared/header.vue'
import Footer from './components/shared/footer.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.root = 'https://jns-metals-default-rtdb.firebaseio.com/'

const router = new VueRouter({
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
  render: h => h(App)
})
