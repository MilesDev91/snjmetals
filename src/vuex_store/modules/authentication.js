import firebase from 'firebase'
import { router } from '../../main'

const state = () => ({
  authenticated: false,
})

const getters = {

}

const mutations = {
  setAuthenticated (state, authenticated) {
    state.authenticated = authenticated
  },
}

const actions = {
  login ({ commit }, { email, password }) {
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
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            // Signed in
            commit("setAuthenticated", true);
            router.replace({ path: "/edititems" });
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}