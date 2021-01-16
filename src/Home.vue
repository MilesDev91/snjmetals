<template>
  <div id="app">
    <!-- This will be where all the Categories with images go -->
    <categorized-item>
      <img
        src="https://agmetalminer.com/mmwp/wp-content/uploads/2019/03/Maksym_Yemelyanov_Adobe_Stock_stainless_030819.jpg"
        alt=""
      />
      <p>Example Image</p>
    </categorized-item>
    <!-- End of categories -->
  </div>
</template>

<script>
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 99px;
  min-height: 100vh;
  color: #2c3e50;
  background-color: rgb(240, 240, 240);
  display: flex;
}

body {
  margin: 0;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
