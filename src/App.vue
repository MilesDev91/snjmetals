<template>
  <div>
    <u-header></u-header>
    <router-view
      :cart="cart"
      :cartCount="cartCount"
      @addCartObject="addToCart($event)"
    ></router-view>
    <u-footer></u-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      cartCount: 0,
    };
  },
  methods: {
    addToCart(cartObject) {
      this.cart.push(cartObject);
      this.cartCount += 1;
      console.log("Cart added" + cartObject + "");
      console.log(this.cart);
      console.log(this.cartCount);
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 99px;
  min-height: 100vh;
  color: #2c3e50;
  display: flex;
}

body {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-color: rgb(240, 240, 240);
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
