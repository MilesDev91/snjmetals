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
@import "./assets/stylesheets/app.css";
</style>
