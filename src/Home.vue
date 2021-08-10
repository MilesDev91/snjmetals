<template>
  <div id="app">
    <!-- This will be where all the Categories with images go -->
    <div class="card" v-for="item in items" :key="item.id">
      <img :src="item.imagePath" alt="" />
      <p>{{ item.name }}</p>
      <p>Price: ${{ item.price }}</p>
      <button @click="addToCart(item.name, item.imagePath, item.price)">
        <font-awesome-icon icon="plus" /> Add to cart
      </button>
    </div>
    <!-- End of categories -->
  </div>
</template>

<script>
export default {
  props: ["cartCount"],
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.$store.dispatch("getAllShopProducts").then(() => {
      this.items = this.$store.getters.getProducts;
    });
  },
  methods: {
    addToCart(x, y, z) {
      var cartObject = {
        id: this.cartCount,
        name: x,
        imagePath: y,
        price: z,
        quantity: 1,
      };
      this.$emit("addCartObject", cartObject);
    },
  },
};
</script>

<style scoped>
#app {
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
}
</style>
