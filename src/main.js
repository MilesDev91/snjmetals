import Vue from 'vue'
import App from './App.vue'
import Header from './components/shared/header.vue'
import Footer from './components/shared/footer.vue'

Vue.component('u-header', Header);
Vue.component('u-footer', Footer);

new Vue({
  el: '#app',
  render: h => h(App)
})
