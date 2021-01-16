<template>
  <div id="app">
    <!-- This will be where all the Categories with images go -->
    <div class="card" v-for="item in items" :key="item.id">
      <img :src="item.imagePath" alt="" />
      <p>{{ item.name }}</p>
      <button>+Add to cart</button>
    </div>
    <!-- End of categories -->
  </div>
</template>

<script>
import { itemIDs } from "./item_ids";
export default {
  data: function () {
    return { items: itemIDs };
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 99px;
  min-height: 100vh;
  color: #2c3e50;
  background-color: rgb(240, 240, 240);
  display: flex;
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
  margin: 0 10px;
}

a {
  color: #42b983;
}

.card {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  max-height: 400px;
  max-width: 400px;
  box-shadow: 2px 2px 6px 0px rgb(88, 88, 88);
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  background-color: white;
}

.card > p {
  text-align: center;
  padding: 10px 10px;
}

img {
  max-width: 100%;
}

button {
  align-self: flex-end;
}
</style>
