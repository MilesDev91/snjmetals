// If this application grows in size, consider separating store into
// other files to maintain organization of the codebase.
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import firebaseConfig from './../config/firebase_config'

// Import helpers
import { checkDuplicate } from '../helpers/helpers'

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
    // Authentication getters
    // Products getters
  },
  //
  // Mutations
  //
  mutations: {
    // Cart mutations
    addToCart (state, cartItem) {
      if (cartItem.isDuplicateItem) {
        // Add to cart item's quantity, the cartCount, and totalCost
        state.cart.filter(item => item.name == cartItem.name)[0].quantity += 1
        state.cartCount += 1
        state.totalCost += parseInt(cartItem.price)
        return
      }
      // Doesn't exist already, so add new object, then add to cartCount and totalCost
      cartItem.id = state.cartCount
      state.cart.push(cartItem)
      state.cartCount += 1
      state.totalCost += parseInt(cartItem.price)
    },
    removeFromCart (state, itemName) {
      var item = state.cart.filter(item => item.name == itemName)[0]
      if (item.quantity <= 1) {
        // Completely removes item if it the last one
        state.cart = state.cart.filter(item => item.name !== itemName)
      } else {
        // If it isn't the last one, reduce quantity by one
        item.quantity -= 1
      }
      state.cartCount -= 1
      state.totalCost -= parseInt(item.price)
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
    },
    // Received cart item and commits it based on if it already exists in cart
    addToCart ({ commit }, cartItem) {
      //These lines check for an already existing cart item of the same name
      if (this.state.cart.length > 0 && checkDuplicate(cartItem, this.state.cart)) {
        cartItem.isDuplicateItem = true
        commit('addToCart', cartItem)
        return
      }
      // If the code reaches this point, then it didn't find a copy, so it commits with a fresh object.
      cartItem.isDuplicateItem = false
      commit('addToCart', cartItem)
    },
  }
})
