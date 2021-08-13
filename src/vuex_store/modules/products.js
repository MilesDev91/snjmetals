// This module of the vuex store handles retrieving and storing the entire list of products to choose from. This will generally only hold information relevant to the viewer, and will change depending on what information the viewer needs

//import, initialize, and reference firebase database
import { database } from '../index'


const state = () => ({
  products: []
})

const getters = {

}

const mutations = {
  // Receives information from getAllShopProducts action to populate our products list
  setProducts (state, products) {
    state.products = products
  }
}

const actions = {
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
}

export default {
  state,
  getters,
  mutations,
  actions
}