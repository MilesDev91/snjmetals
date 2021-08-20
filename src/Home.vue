<template>
  <div class="justify-content-around d-flex flex-wrap flex-sm-row" id="app">
    <div class="verification-container">
      <b-alert
        class="verification"
        variant="success"
        :show="verification != null"
        >{{ verification }}</b-alert
      >
    </div>
    <!-- This will be where all the Categories with images go -->
    <u-item-card
      v-for="item in items"
      :imagePath="item.imagePath"
      :key="item.id"
      :itemName="item.name"
      :size="item.size"
      :price="item.price"
      v-on:verifyAdded="addedToCartAlert()"
    ></u-item-card>
    <!-- End of categories -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      items: [],
      verification: null,
      dismissTimer: null,
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
    ...mapActions(["getAllShopProducts"]),
    addedToCartAlert() {
      // This sets up a timer for the alert. If another item is added, the timer is reset.
      this.verification = "Item added to cart";
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(() => {
        this.verification = null;
      }, 10);
    },
  },
};
</script>

<style scoped>
.verification-container {
  margin: 0 auto;
  position: absolute;
  top: 1rem;
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.verification {
  animation: fade-out 2s;
}
</style>
