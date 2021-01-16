<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
</script>

<style scoped>
.card {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  max-height: 400px;
  max-width: 400px;
  box-shadow: 2px 2px 6px 0px rgb(88, 88, 88);
  border: 1px solid black;
  margin: 10px 10px;
  background-color: white;
}

.card > p {
  text-align: center;
  padding: 10px 10px;
}

img {
  max-width: 100%;
}
</style>