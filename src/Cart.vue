<template>
  <div class="cart">
    <p v-if="cart.length == 0">You have no items in your cart.</p>
    <div v-else class="cartItem" v-for="item in this.cart" :key="item.id">
      <p>{{ item.name }}</p>
      <img :src="item.imagePath" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart"],
};
</script>

<style scoped>
.cart {
  margin: 7rem 0 2rem 7rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: 30rem;
}

.cartItem {
  padding: 1rem;
}
</style>