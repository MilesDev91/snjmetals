<template>
  <b-navbar
    class="px-4 border-bottom border-dark"
    toggleable="lg"
    fixed="top"
    type="light"
    variant="info"
  >
    <b-navbar-brand href="/">J&S Metal Works and Engravings</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ms-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="#" disabled>
          <!--<router-link to="/checkout"></router-link>-->Checkout
        </b-nav-item>

        <b-nav-item v-if="cartCount == 0" to="/cart">Cart</b-nav-item>
        <b-nav-item v-else to="/cart"
          >Cart
          <span style="font-weight: bold">({{ cartCount }})</span></b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      cartCount: (state) => state.cart.cartCount,
    }),
  },
};
</script>

<style scoped>
/* .header {
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
} */
</style>