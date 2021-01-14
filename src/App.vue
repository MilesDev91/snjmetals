<template>
  <div>
    <u-header></u-header>
    <div id="app">
      <categorized-item></categorized-item>
    </div>
    <u-footer></u-footer>
  </div>
</template>

<script>
</script>

<style>
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
