<template>
  <div class="body">
    <u-header></u-header>
    <h1 v-if="authenticated">Admin mode</h1>
    <router-view
      class="content"
      :authenticated="authenticated"
      @authenticated="setAuthenticated"
    ></router-view>
    <button class="logout" v-if="authenticated">Logout</button>
    <u-footer></u-footer>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      // TODO: handle data in vuex store
      authenticated: false,
    };
  },
  // Check user status on update
  beforeUpdate() {
    console.log(this.authenticated);
    console.log(firebase.auth().currentUser);
    // Observes authentication change and changes status if no user
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user == null) {
        // Set authenticated to false
        this.setAuthenticated(false);
      }
    });
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
  },
};
</script>

<!-- CSS Styling -->
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 99px;
  min-height: 100vh;
  color: #2c3e50;
  display: flex;
}

body {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-color: rgb(240, 240, 240);
}

button {
  border-radius: 0.6rem;
  padding: 0.3rem;
  background-color: rgb(255, 181, 21);
  align-self: center;
  margin-bottom: 0.4rem;
}

button:focus {
  outline: none;
}

button:hover {
  cursor: pointer;
}

.body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content {
  flex: 1;
}

.logout {
  position: fixed;
  bottom: 4rem;
  left: 2rem;
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
