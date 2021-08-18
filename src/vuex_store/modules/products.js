// This module of the vuex store handles retrieving and storing the entire list of products to choose from. This will generally only hold information relevant to the viewer, and will change depending on what information the viewer needs

//import, initialize, and reference firebase database
import { itemsDatabase } from '../index'


const state = () => ({
  products: [],
  currentItem: null
})

const getters = {

}

const mutations = {
  // Receives information from getAllShopProducts action to populate our products list
  setProducts (state, products) {
    state.products = products
  },
  // Populates current item with properties sent by action
  setCurrentEditItem (state, item) {
    state.currentItem = item
  },
  // Adds new item to product list
  addNewItemToProducts (state, item) {
    console.log(item)
  },
  // Removes item from product list
  deleteItemFromProducts (state, item) {
    console.log(item)
  },
  // Updates products
  updateProducts (state, item) {
    console.log(item)
  }
}

const actions = {
  // Used to get all products from database through api and set the state
  getAllShopProducts ({ commit }) {
    return new Promise((resolve) => {
      itemsDatabase.get()
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
  // Gets a specific item from the store and makes it the current edited item. Returns a promise for router
  setCurrentEditItem ({ commit }, name) {
    return new Promise((resolve) => {
      itemsDatabase.orderByChild('name').equalTo(name).once("value")
        .then((snapshot) => {
          var tempObject = JSON.parse(JSON.stringify(snapshot.toJSON()))
          for (var key in tempObject) {
            var itemObject = {
              ...tempObject[key],
            }
          }
          commit('setCurrentEditItem', itemObject)
          resolve()
        })
    })
  },
  // Adds new item to database
  addNewItemToDatabase ({ commit }, item) {
    itemsDatabase.child(item.name).set({
      ...item
    })
    commit("addNewItemToProducts", item)
  },
  // Deletes item from database, expects a name
  deleteItemFromDatabase ({ commit }, itemName) {
    itemsDatabase.child(itemName).remove()
    commit("deleteItemFromProducts", itemName)
  },
  // Receives an object with an item and original name to reference
  // TODO: see if we can update id as well as item
  updateItemInDatabase ({ commit }, { item, originalName }) {
    console.log(item, originalName)
    itemsDatabase.child(originalName).update({
      ...item
    })
    commit("updateProducts", item)
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}