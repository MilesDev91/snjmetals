<template>
  <div class="mw-40 mx-auto" style="margin-top: 4rem" v-if="item.name != null">
    <h1>Edit here!</h1>
    <div v-for="(error, index) in errors" :key="index">
      <b-alert :show="errors[index] != null">{{ errors[index] }}</b-alert>
    </div>
    <b-form @submit.prevent="submit">
      <b-form-group
        id="input-group-1"
        label="Name"
        label-for="input-1"
        description="Name must be unique to all other items"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model="item.name"
          placeholder="Enter item name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Size"
        description="Example: 20x20"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          type="text"
          v-model="item.size"
          placeholder="Enter item size"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Price"
        label-for="input-3"
        description="No $ symbols"
      >
        <b-form-input
          id="input-3"
          type="text"
          v-model="item.price"
          placeholder="Enter item price"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Image file for item"
        label-for="input-4"
      >
        <b-form-file
          id="input-4"
          single
          v-model="itemFile"
          accept=".jpg, .png, .jpeg"
          placeholder="Optional"
        ></b-form-file
      ></b-form-group>
      <b-button type="submit">Submit</b-button>
    </b-form>

    <b-button class="back" @click="backToEditItems()"
      ><font-awesome-icon icon="arrow-left" /> Go back</b-button
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import AWS S3 instance
import { S3Client } from "./main";

export default {
  data() {
    return {
      itemFile: null,
      errors: [],
    };
  },
  computed: {
    ...mapState({
      authenticated: (state) => state.authentication.authenticated,
      item: (state) => state.products.currentItem,
    }),
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      if (!this.authenticated) {
        this.$router.replace({ path: "/login" });
      }
    }
    if (this.item == null) {
      this.$router.replace("/edititems");
    }
  },
  methods: {
    ...mapActions(["getAllShopProducts"]),

    async submit() {
      // Clear errors
      this.errors = [];
      const isValid = await this.validate();
      if (!isValid) {
        return;
      }

      // This section uploads the file to AWS-S3 image bucket for jnsmetals, then returns an image url
      this.uploadToS3(this.itemFile).then(() => {
        console.log(this.item);

        this.$http.patch("items.json", this.item);
        this.getAllShopProducts();
        this.$router.push("/edititems");
      });
    },
    // Returns the URL of uploaded image
    uploadToS3(file) {
      return new Promise((resolve) => {
        console.log(file);

        // Since this process adds the file extension, we need to remove the extension before we send in the name
        var fileName =
          file.name.substr(0, file.name.lastIndexOf(".")) || file.name;
        console.log(fileName);

        S3Client.uploadFile(file, fileName)
          .then((data) => {
            console.log(data.location);
            this.item.imagePath = data.location;
            resolve();
          })
          .catch((err) => console.log(err));
      });
    },
    // Goes back to edititems
    backToEditItems() {
      this.$router.push("/edititems");
    },
    validate() {
      return true;
    },
  },
};
</script>

<style scoped>
button,
input {
  overflow: visible;
}

.back {
  position: fixed;
  top: 5rem;
  left: 1rem;
}
</style>