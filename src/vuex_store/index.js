// This store was created to primarily handle authentication sta,te
// product information,and the shopping cart.
//
// If this application grows in size, consider separating store into
// other files to maintain organization of the codebase.
import Vue from 'vue'
import Vuex from 'vuex'
import * as constants from './mutation_types'
import firebase from 'firebase'
import firebaseConfig from './../config/firebase_config'

Vue.use(Vuex)
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database reference
var database = firebase.database();

export default new Vuex.Store({
  // State for:
  // Cart
  // Authentication
  // Products
  state: {
    // TODO: Cart
    // Cart object is structured as [cartObject { price: 0, count: 0 }, ...]
    cart: [],
    cartCount: 0,
    totalCost: 0,

    // TODO: Authentication
    authenticated: false,

    // Products
    products: []
  },
  //
  // Getters
  //
  getters: {
    // Cart getters
    getCart: state => {
      return state.cart
    },
    getCartCount: state => {
      return state.cartCount
    },
    getTotalCost: state => {
      return state.totalCost
    },
    // Authentication getters
    getAuthenticated: state => {
      return state.authenticated
    },
    // Products getters
    getProducts: state => {
      return state.products
    }
  },
  //
  // Mutations
  //
  mutations: {
    // Cart mutations
    [constants.ADD_TO_CART] (state, cartItem) {
      state.cart.push(cartItem)
    },
    [constants.REMOVE_FROM_CART] (state, cartItem) {
      state.cart = state.cart.filter(item => item !== cartItem)
    },
    // Authentication mutations

    // Shop Items mutations
    setProducts (state, products) {
      state.products = products
    }
  },
  actions: {
    // Used to get all products from database through api and set the state
    getAllShopProducts ({ commit }) {
      return new Promise((resolve) => {
        database.ref().child("items").get()
          .then((response) => {
            return response.toJSON();
          }).then((data) => {
            const resultArray = [];
            for (let key in data) {
              resultArray.push(data[key]);
            }
            return resultArray;
          }).then((data) => {
            commit('setProducts', data)
            resolve()
          })
      })
    }
  }
})
