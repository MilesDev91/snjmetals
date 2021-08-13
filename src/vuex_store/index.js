// If this application grows in size, consider separating store into
// other files to maintain organization of the codebase.
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// Import and initialize Firebase
import firebase from 'firebase'
import firebaseConfig from '../config/firebase_config'
firebase.initializeApp(firebaseConfig);

// Export database reference
export var database = firebase.database()

// Import modules
import authentication from './modules/authentication'
import cart from './modules/cart'
import products from './modules/products'

export default new Vuex.Store({
  modules: {
    authentication,
    cart,
    products
  }
})
