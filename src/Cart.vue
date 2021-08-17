<template>
  <b-container
    class="d-flex w-50 bg-white border border-dark"
    style="margin: 4rem auto"
  >
    <h3 v-if="cart.length == 0">You have no items in your cart.</h3>
    <div class="w-100" v-else>
      <h3 class="m-2">Total: ${{ totalCost }}</h3>
      <div
        class="d-flex my-4 justify-content-between mx-2"
        v-for="item in this.cart"
        :key="item.id"
      >
        <div>
          <p>{{ item.name }}</p>
          <p>
            {{ item.quantity }} X ${{ item.price }} = ${{
              item.quantity * item.price
            }}
          </p>
          <b-button @click="removeItemFromCart(item.name)">Remove</b-button>
        </div>
        <div class="justify-content-end">
          <b-img style="max-width: 20vw" :src="item.imagePath" alt="" />
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      totalCost: (state) => state.cart.totalCost,
    }),
  },
  methods: {
    ...mapMutations(["removeFromCart"]),
    removeItemFromCart(name) {
      this.removeFromCart(name);
    },
  },
};
</script>

<style scoped>
/* .cart {
  margin: 10rem 0 2rem 7rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: 30rem;
}

.cartItem {
  padding: 1rem;
}

button {
  margin-bottom: 0.4rem;
}

img {
  max-width: 100%;
} */
</style>