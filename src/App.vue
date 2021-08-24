<template>
  <div class="body">
    <u-header></u-header>
    <h1 class="admin" v-if="authenticatedUser != null">Admin mode</h1>
    <router-view class="content"></router-view>
    <b-button
      variant="info"
      class="logout"
      v-if="authenticatedUser != null"
      @click="logoutUser()"
      >Logout</b-button
    >
    <u-footer></u-footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      authenticatedUser: null,
    };
  },
  mounted() {
    this.authenticatedUser = this.$store.state.authentication.authenticatedUser;
  },
  beforeUpdate() {
    this.authenticatedUser = this.$store.state.authentication.authenticatedUser;
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<!-- CSS Styling -->
<style>
@import "./assets/stylesheets/app.css";
</style>
