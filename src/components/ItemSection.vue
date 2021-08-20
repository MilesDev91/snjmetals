<template>
  <div class="item-section-container">
    <img :src="imagePath" alt="" class="item-section-image" />
    <div class="item-section-info">
      <h4>{{ name }}</h4>
      <p>Price: ${{ price }}</p>
      <p>Size: {{ size }}</p>
    </div>
    <div class="item-section-description">
      <h5>Description:</h5>
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagePath: String,
    name: String,
    description: {
      default: "This item has no description.",
      type: String,
    },
    price: String,
    size: String,
  },
};
</script>

<style scoped>
.item-section-container {
  position: relative;
  height: 100vh;
  min-height: 20vh;
  max-height: 50vh;
  background-color: rgb(243 248 249);
}

.item-section-image {
  position: absolute;
  right: 0;
  top: 0;
  max-height: inherit;
  padding: 0.5rem;
}

.item-section-info {
  position: absolute;
  left: 0;
  top: 0;
  padding: 1rem;
}

.item-section-description {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 1rem;
}
</style>