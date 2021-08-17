// Main section of the store
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// Import and initialize Firebase
import firebase from 'firebase'
import firebaseConfig from '../../config/firebase_config'
firebase.initializeApp(firebaseConfig);

// Export database reference
export var itemsDatabase = firebase.database().ref('items')

// Import modules
import authentication from './modules/authentication'
import cart from './modules/cart'
import products from './modules/products'

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  modules: {
    authentication,
    cart,
    products
  }
})
