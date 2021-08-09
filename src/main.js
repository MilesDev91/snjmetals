import Vue from 'vue'
import App from './App.vue'
import Header from './components/shared/header.vue'
import Footer from './components/shared/footer.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import VueResource from 'vue-resource'
import firebase from "firebase/app"

//Setup firebase
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyBjFSpUWiq9on8gbK8s5tXebT-HCQF6SzU",
  authDomain: "jns-metals.firebaseapp.com",
  databaseURL: "https://jns-metals-default-rtdb.firebaseio.com",
  projectId: "jns-metals",
  storageBucket: "jns-metals.appspot.com",
  messagingSenderId: "609999149110",
  appId: "1:609999149110:web:057b3297c575d60937e097",
  measurementId: "G-CPMLV4FTVQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Setup resources
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
