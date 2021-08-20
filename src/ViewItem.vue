<template>
  <div class="view-item-container">
    <u-item-section
      :imagePath="item.imagePath"
      :name="item.name"
      :price="item.price"
      :size="item.size"
    ></u-item-section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({ item: (state) => state.products.currentItem }),
  },
  created() {
    this.setItem(this.$route.params.name);
    console.log(this.$route.params.name);
  },
  methods: {
    ...mapActions(["setCurrentItem"]),
    async setItem(name) {
      await this.setCurrentItem(name);
    },
  },
};
</script>

<style scoped>
.view-item-container {
  width: 50%;
  margin: 5rem auto;
}
</style>