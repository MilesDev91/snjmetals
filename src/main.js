import Vue from 'vue'
import App from './App.vue'
import Header from './components/shared/header.vue'
import Footer from './components/shared/footer.vue'
import CategorizedItem from './components/CategorizedItem.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
});

//Beginning of component registration
Vue.component('categorized-item', CategorizedItem);
Vue.component('u-header', Header);
Vue.component('u-footer', Footer);
//End component registration

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
