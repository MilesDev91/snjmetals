<template>
  <div class="justify-content-around d-flex flex-wrap flex-sm-row" id="app">
    <!-- TODO: This will be where all the Categories with images go -->
    <b-card
      :img-src="item.imagePath"
      :title="item.name"
      v-for="item in products"
      :key="item.id"
      class="my-2"
      style="max-width: 20vw"
    >
      <b-button class="edit" @click="editItem(item.name)"
        ><font-awesome-icon icon="edit" /> Edit</b-button
      >
      <b-button
        class="delete"
        @click="setDeleteItemName(item.name)"
        v-b-modal.modal-delete
        ><font-awesome-icon icon="trash-alt"></font-awesome-icon>
        Delete</b-button
      >
      <b-card-text>Price: ${{ item.price }}</b-card-text>
      <b-button class="add-to-cart"
        ><font-awesome-icon icon="plus" /> Add to cart</b-button
      >
    </b-card>
    <!-- End of categories -->

    <!-- Add items button -->
    <b-button class="add" @click="addItem()"
      ><font-awesome-icon icon="plus" /> Add new item</b-button
    >

    <!-- Delete Modal Form -->
    <b-modal @hide="deleteError = null" id="modal-delete" title="Delete Item?">
      <b-alert :show="deleteError != null">{{ deleteError }}</b-alert>
      Are you sure you wish to delete {{ deleteItemName }}?
      <b-form @submit.prevent="deleteItem">
        <b-form-group
          description="Please enter item name and press delete to confirm"
        >
          <b-form-input
            v-model="matchName"
            :placeholder="deleteItemName"
            :label="deleteItemName"
          ></b-form-input>
        </b-form-group>
        <b-button variant="danger" type="submit">Delete</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      items: [],
      deleteItemName: "",
      matchName: "",
      deleteError: null,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
      authenticated: (state) => state.authentication.authenticated,
      s3Config: (state) => state.authentication.s3Config,
    }),
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      if (!this.authenticated) {
        this.$router.replace({ path: "/login" });
        return;
      }
    }
    this.getS3Config();

    this.getAllShopProducts().then(() => {
      this.items = this.products;
    });
  },
  methods: {
    ...mapActions([
      "getAllShopProducts",
      "setCurrentEditItem",
      "getS3Config",
      "deleteItemFromDatabase",
    ]),
    editItem(name) {
      this.setCurrentEditItem(name).then(() => {
        this.$router.push(`/edititem/${name}`);
      });
    },
    addItem() {
      this.$router.push("/additem");
    },
    setDeleteItemName(name) {
      this.deleteItemName = name;
    },
    deleteItem() {
      // Check for match confirmation
      if (this.matchName != this.deleteItemName) {
        this.deleteError = "Name does not match.";
        return;
      }
      // Proceed to delete item from firebase database
      this.deleteItemFromDatabase(this.deleteItemName);
    },
  },
};
</script>

<style scoped>
.add {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 5;
}

.delete {
  position: absolute;
  bottom: 4rem;
  right: 1rem;
}

.edit {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
/* #app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 10rem;
  min-height: 100vh;
  color: #2c3e50;
  background-color: rgb(240, 240, 240);
  display: flex;
  flex-wrap: wrap;
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
  margin: 0 1rem;
}

a {
  color: #42b983;
}

img {
  max-width: 100%;
}



.card {
  max-height: 400px;
  max-width: 400px;
  box-shadow: 2px 2px 6px 0px rgb(88, 88, 88);
  border: 1px solid black;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  background-color: white;
  position: relative;
}

.card > p {
  text-align: center;
  padding: 0rem 0.6rem;
  margin: 0.4rem;
}
 */
</style>
