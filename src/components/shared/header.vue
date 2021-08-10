<template>
  <div class="header">
    <h2 class="logo">J&S Metal Works and Engravings</h2>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li class="disabled">
        <!--<router-link to="/checkout"></router-link>-->Checkout
      </li>
      <li>
        <router-link v-if="cartCount == 0" to="/cart">Cart</router-link>
        <router-link v-else to="/cart"
          >Cart
          <span style="font-weight: bold">({{ cartCount }})</span></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["cartCount"],
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-color: rgb(221, 229, 230);
  padding: 60px 20px 1px 40px;
  border-bottom: 1px solid black;
  display: flex;
  z-index: 2;
}

.logo {
  font-weight: bold;
  cursor: pointer;
}

.disabled {
  color: gray;
}

ul {
  align-self: center;
  margin-left: auto;
}

a {
  color: black;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
}

li {
  font-size: 20px;
}
</style>