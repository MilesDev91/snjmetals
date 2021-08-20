import { checkDuplicate } from "../../helpers/helpers"

const state = () => ({
  // Cart object is structured as [cartObject { price: 0, count: 0 }, ...]
  cart: [],
  cartCount: 0,
  totalCost: 0,
})

const getters = {

}

const mutations = {
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
  // Reset the cart
  removeAllFromCart (state) {
    state.cart = []
    state.cartCount = 0
  }
}

const actions = {
  // Received cart item and commits it based on if it already exists in cart
  addToCart ({ state, commit }, cartItem) {
    //These lines check for an already existing cart item of the same name
    if (state.cartCount > 0 && checkDuplicate(cartItem, state.cart)) {
      cartItem.isDuplicateItem = true
      commit('addToCart', cartItem)
      return
    }
    // If the code reaches this point, then it didn't find a copy, so it commits with a fresh object.
    cartItem.isDuplicateItem = false
    commit('addToCart', cartItem)
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}