<template>
  <div id="app">
    <!-- TODO: This will be where all the Categories with images go -->
    <div class="card" v-for="item in products" :key="item.id">
      <img :src="item.imagePath" alt="" />
      <button class="edit"><font-awesome-icon icon="edit" /> Edit</button>
      <p>{{ item.name }}</p>
      <p>Price: ${{ item.price }}</p>
      <button><font-awesome-icon icon="plus" /> Add to cart</button>
    </div>
    <!-- End of categories -->

    <!-- Add items button -->
    <button class="add"><font-awesome-icon icon="plus" /> Add new item</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
      authenticated: (state) => state.authenticated.authenticated,
    }),
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      if (!this.authenticated) {
        this.$router.replace({ path: "/login" });
        return;
      }
    }

    this.getAllShopProducts().then(() => {
      this.items = this.products;
    });
  },
  methods: {
    ...mapActions(["getAllShopProducts"]),
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

img {
  max-width: 100%;
}

.add {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
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
  position: relative;
}

.card > p {
  text-align: center;
  padding: 0rem 0.6rem;
  margin: 0.4rem;
}

.edit {
  position: absolute;
  bottom: 0;
  right: 0.1rem;
}
</style>
