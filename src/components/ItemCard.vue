<template>
  <b-card no-body img-top class="my-2" style="max-width: 20vw">
    <router-link :to="'/viewitem/' + itemName">
      <b-card-img :src="imagePath" />
    </router-link>
    <b-card-body>
      <b-card-title>{{ itemName }}</b-card-title>
      <b-card-text>
        Price: ${{ price }}
        <br />
        Size: {{ size }}
      </b-card-text>
      <b-button
        @click="addItemToCart(itemName, imagePath, price)"
        variant="secondary"
      >
        <font-awesome-icon icon="plus" /> Add to cart
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    imagePath: String,
    price: String,
    size: String,
    itemName: String,
    editing: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(["addToCart"]),
    addItemToCart(name, imagePath, price) {
      var cartItem = {
        name: name,
        imagePath: imagePath,
        price: price,
        quantity: 1,
      };
      // Tell parent item was added
      this.$emit("verifyAdded");
      this.addToCart(cartItem);
    },
  },
};
</script>