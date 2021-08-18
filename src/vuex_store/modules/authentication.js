import firebase from 'firebase'
import { router } from '../../main'

const state = () => ({
  authenticated: false,
  s3Config: {}
})

const getters = {

}

const mutations = {
  setAuthenticated (state, authenticated) {
    state.authenticated = authenticated
  },
  setS3Config (state, config) {
    state.s3Config = {
      ...config
    }
  }
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
  },
  getS3Config ({ commit }) {
    firebase.database().ref("settings").child("s3").get().then((snapshot) => {
      var settings = snapshot.toJSON()
      commit("setS3Config", settings)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}