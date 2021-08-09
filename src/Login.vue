<template>
  <div class="login-form">
    <input type="text" name="email" v-model="input.email" placeholder="Email" />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
import firebase from "firebase";
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
    login() {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase
            .auth()
            .signInWithEmailAndPassword(this.input.email, this.input.password)
            .then(() => {
              // Signed in
              console.log("Logged in");
              this.$emit("authenticated", true);
              this.$router.replace({ path: "/edititems" });
            })
            .catch((error) => {
              // Handle errors
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log("Error Code: " + errorCode);
              console.log(errorMessage);
            });
        })
        .catch((error) => {
          // Handle errors
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Error code: " + errorCode);
          console.log(errorMessage);
        });
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