<template>
  <div class="body">
    <u-header></u-header>
    <h1 class="admin" v-if="authenticated">Admin mode</h1>
    <router-view class="content"></router-view>
    <b-button
      variant="info"
      class="logout"
      v-if="authenticated"
      @click="logout()"
      >Logout</b-button
    >
    <u-footer></u-footer>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      // TODO: handle data in vuex store
      //...mapState(["authenticated"]),
    };
  },
  computed: {
    ...mapState({
      authenticated: (state) => state.authentication.authenticated,
    }),
  },
  // Check user status on update
  beforeUpdate() {
    if (process.env.NODE_ENV === "production") {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          this.setAuthenticated(true);
        } else {
          // Set authenticated to false
          this.setAuthenticated(false);
        }
      });
    }
    //console.log(this.authenticated);
    //console.log(firebase.auth().currentUser);
    // Observes authentication change and changes status if no user
  },
  methods: {
    ...mapMutations(["setAuthenticated"]),
    logout() {
      this.setAuthenticated(false);
      this.$router.push("/");
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
  /*display: flex;*/
}

body {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-color: rgb(240, 240, 240);
}

button:focus {
  outline: none;
}

button:hover {
  cursor: pointer;
}

.admin {
  position: fixed;
  top: 0;
  right: 50vw;
  z-index: 4;
  color: darkred;
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

/* Bootstrap vue styling isn't working right */
.form-group {
  margin-bottom: 1rem;
}
.custom-file-label,
.custom-file-label:after {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.5;
  padding: 0.25rem 0.5rem;
}
.custom-file-label:after {
  bottom: 0;
  z-index: 3;
  display: block;
  content: "Browse";
  background-color: lightskyblue;
  border-left: inherit;
  border-radius: 0 0.25rem 0.25rem 0;
}
.custom-file-label {
  left: 0;
  z-index: 1;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: white;
}
.custom-file,
.custom-file-input {
  position: relative;
  width: 100%;
}
.custom-file-input {
  margin: 0;
  opacity: 0;
}
</style>
