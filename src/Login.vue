<template>
  <div class="login-form">
    <input type="text" name="email" v-model="input.email" placeholder="Email" />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />
    <button type="button" v-on:click="userLogin()">Login</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login", "getS3Config"]),
    userLogin() {
      var email = this.input.email;
      var password = this.input.password;
      this.login({ email, password });
    },
  },
};
</script>

<style scoped>
.login-form {
  margin: 10rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

input {
  margin: 0.3rem;
}

button {
  align-self: auto;
}
</style>