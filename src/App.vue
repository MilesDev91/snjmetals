<template>
  <div class="body">
    <u-header :cartCount="cartCount"></u-header>
    <router-view
      class="content"
      :total="total"
      :cart="cart"
      :cartCount="cartCount"
      @addCartObject="addToCart($event)"
      @removeFromCart="removeFromCart($event)"
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
      total: 0,
    };
  },
  methods: {
    addToCart(cartObject) {
      //These lines check for an already existing cart item of the same name
      if (this.cart.length > 0) {
        for (var i = 0; i < this.cart.length; i++) {
          if (cartObject.name == this.cart[i].name) {
            this.cart[i].quantity += 1;
            this.cartCount += 1;
            this.total += cartObject.price;
            console.log(this.cart);
            return;
          }
        }
      }
      this.cart.push(cartObject);
      this.cartCount += 1;
      this.total += cartObject.price;
    },
    removeFromCart(itemName) {
      for (var i = 0; i < this.cart.length; i++) {
        if (itemName == this.cart[i].name) {
          this.cart[i].quantity -= 1;
          this.cartCount -= 1;
          this.total -= this.cart[i].price;
          if (this.cart[i].quantity == 0) {
            this.cart.splice(i, 1);
          }
          return;
        }
      }
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

.body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content {
  flex: 1;
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
