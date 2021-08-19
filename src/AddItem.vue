<template>
  <div class="mw-40 mx-auto" style="margin-top: 4rem">
    <h1>Add items here!</h1>
    <div v-for="(error, index) in errors" :key="index">
      <b-alert dismissible :show="errors[index] != null">{{
        errors[index]
      }}</b-alert>
    </div>
    <b-form @submit.prevent="submit" @reset="formReset">
      <b-form-group
        id="input-group-1"
        label="Name"
        label-for="input-1"
        description="Name must be unique to all other items"
      >
        <b-form-input
          id="input-1"
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
          v-model="item.itemFile"
          accept=".jpg, .png, .jpeg"
          placeholder="Choose file or drop here..."
          required
        ></b-form-file>
      </b-form-group>
      <b-button type="submit">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-button class="back" @click="backToEditItems()"
      ><font-awesome-icon icon="arrow-left" /> Go back</b-button
    >
  </div>
</template>

<script>
import { checkDuplicateInDatabase, validatePrice } from "./helpers/helpers";
import { mapState, mapActions } from "vuex";

// import AWS S3
import S3 from "aws-s3-pro";

export default {
  data() {
    return {
      item: {
        name: "",
        size: "",
        price: "",
        imagePath: "",
        itemFile: null,
      },
      // Errors go in order for each input item
      errors: [],
      s3Client: null,
    };
  },
  computed: {
    ...mapState({
      authenticated: (state) => state.authentication.authenticated,
      s3Config: (state) => state.authentication.s3Config,
    }),
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      if (!this.authenticated) {
        this.$router.replace({ path: "/login" });
      }
    }
    // Initialize s3 Client
    this.s3Client = new S3(this.s3Config);
    this.reset();
  },
  methods: {
    ...mapActions(["getAllShopProducts", "addNewItemToDatabase"]),

    async submit() {
      // Clear errors if any
      this.errors = [];
      // Validate form
      const isValid = await this.validate();
      if (!isValid) {
        return;
      }

      // This section uploads the file to AWS-S3 image bucket for jnsmetals, then changes the image url
      this.uploadToS3(this.item.itemFile).then(() => {
        //Our item has to match our database, so we need to copy everything but the file itself
        var postItem = {
          name: this.item.name,
          size: this.item.size,
          imagePath: this.item.imagePath,
          price: this.item.price,
        };
        this.addNewItemToDatabase(postItem);
        this.getAllShopProducts();
        this.$router.push("/edititems");
      });
    },
    // Returns the URL of uploaded image
    uploadToS3(file) {
      return new Promise((resolve) => {
        // Since this process adds the file extension, we need to remove the extension before we send in the name
        var fileName =
          file.name.substr(0, file.name.lastIndexOf(".")) || file.name;

        this.s3Client
          .uploadFile(file, fileName)
          .then((data) => {
            this.item.imagePath = data.location;
            resolve();
          })
          .catch((err) => console.log(err));
      });
    },
    formReset(event) {
      event.preventDefault();
      // Reset data with event handling
      this.item.name = "";
      this.item.price = "";
      this.item.size = "";
      this.item.imagePath = "";
      this.item.file = null;
    },
    reset() {
      // Reset data
      this.item.name = "";
      this.item.price = "";
      this.item.size = "";
      this.item.imagePath = "";
      this.item.file = null;
    },
    backToEditItems() {
      this.$router.push("/edititems");
    },
    // Validates form
    async validate() {
      // Item name, then File name
      var valid = await checkDuplicateInDatabase(
        this.item.name,
        this.item.itemFile.name
      )
        .then((response) => {
          var validCheck = true;
          if (response[0] == true) {
            this.errors.push(
              "Name has been used before. Please use new name or delete item with old name."
            );
            validCheck = false;
          }
          if (response[1] == true) {
            this.errors.push(
              "File name (and likely image) has been used before. Please use new name or delete item with old file name."
            );
            validCheck = false;
          }
          // If no duplicates, then we proceed to price validation
          // We do this by setting up a decimal count, then we only allow one decimal and no letters.
          var isPriceValid = validatePrice(this.item.price);
          if (!isPriceValid) {
            this.errors.push(
              "Please enter a valid price. No symbols except '.'"
            );
            validCheck = false;
          }
          if (!validCheck) {
            return false;
          }
          return true;
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
      return valid;
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