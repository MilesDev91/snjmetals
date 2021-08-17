<template>
  <div class="justify-content-around d-flex flex-wrap flex-sm-row" id="app">
    <!-- This will be where all the Categories with images go -->
    <b-card
      :img-src="item.imagePath"
      :title="item.name"
      v-for="item in items"
      :key="item.id"
      class="my-2"
      style="max-width: 20vw"
    >
      <b-card-text> Price: ${{ item.price }} </b-card-text>
      <b-button
        variant="secondary"
        @click="addItemToCart(item.name, item.imagePath, item.price)"
      >
        <font-awesome-icon icon="plus" /> Add to cart
      </b-button>
    </b-card>
    <!-- End of categories -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
      cartCount: (state) => state.cart.cartCount,
    }),
  },
  created() {
    this.getAllShopProducts().then(() => {
      this.items = this.products;
    });
  },
  methods: {
    ...mapActions(["getAllShopProducts", "addToCart"]),
    addItemToCart(name, imagePath, price) {
      var cartItem = {
        name: name,
        imagePath: imagePath,
        price: price,
        quantity: 1,
      };
      this.addToCart(cartItem);
    },
  },
};
</script>

<style scoped>
/* #app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 10rem;
  min-height: 100vh;
  color: #2c3e50;
  background-color: rgb(240, 240, 240);
  display: flex;
  flex-wrap: wrap;
}

body {
  margin: 0;
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
  margin: 0 1rem;
}

a {
  color: #42b983;
}

.card {
  max-height: 400px;
  max-width: 400px;
  box-shadow: 2px 2px 6px 0px rgb(88, 88, 88);
  border: 1px solid black;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  background-color: white;
}

.card > p {
  text-align: center;
  padding: 0rem 0.6rem;
  margin: 0.4rem;
}

img {
  max-width: 100%;
} */
</style>
