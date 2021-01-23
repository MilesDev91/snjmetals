<template>
  <div class="cart">
    <p style="padding: 1rem" v-if="cart.length == 0">
      You have no items in your cart.
    </p>
    <div v-else>
      <div class="cartItem" v-for="item in this.cart" :key="item.id">
        <p>{{ item.name }}</p>
        <p>
          {{ item.quantity }} X ${{ item.price }} = ${{
            item.quantity * item.price
          }}
        </p>
        <button @click="$emit('removeFromCart', item.name)">Remove</button>
        <img :src="item.imagePath" alt="" />
      </div>
      <h3>Total: ${{ total }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart", "total"],
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

button {
  margin-bottom: 0.4rem;
}
</style>