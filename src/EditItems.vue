<template>
  <div class="edititems">
    <h1>Add, Edit, and Remove items here!</h1>
    <div class="form-group">
      <label>Name</label>
      <br />
      <input type="text" v-model="item.name" />
    </div>
    <div class="form-group">
      <label>Size</label>
      <br />
      <input type="text" v-model="item.size" />
    </div>
    <div class="form-group">
      <label>Price</label>
      <br />
      <input type="text" v-model="item.price" />
    </div>
    <div class="form-group">
      <label>Image Path (leave this at default)</label>
      <br />
      <input type="text" v-model="item.imagePath" />
    </div>
    <button @click="submit">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        name: "",
        size: "20in by 20in",
        price: "",
        imagePath: "static/",
      },
    };
  },
  methods: {
    submit() {
      this.$http.post("items.json", this.item);
    },
  },
};
</script>

<style scoped>
.edititems {
  margin: 7rem 0 2rem 7rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: 40rem;
  padding: 10px;
}

.form-group {
  margin: 0.5rem;
}
</style>