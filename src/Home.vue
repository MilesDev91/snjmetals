<template>
  <div class="justify-content-around d-flex flex-wrap flex-sm-row" id="app">
    <!-- This will be where all the Categories with images go -->
    <u-item-card
      v-for="item in items"
      :imagePath="item.imagePath"
      :key="item.id"
      :itemName="item.name"
      :size="item.size"
      :price="item.price"
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
  },
};
</script>

<style scoped>
</style>
