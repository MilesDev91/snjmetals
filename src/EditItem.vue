<template>
  <div class="mw-40 mx-auto" style="margin-top: 4rem" v-if="item.name != null">
    <h1>Edit here!</h1>
    <div v-for="(error, index) in errors" :key="index">
      <b-alert dismissible :show="errors[index] != null">{{
        errors[index]
      }}</b-alert>
    </div>
    <b-form @submit.prevent="submit">
      <b-form-group
        id="input-group-1"
        label="Name"
        label-for="input-1"
        description="Name must be unique to all items except the one you are editing"
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
// import AWS S3
import S3 from "aws-s3-pro";
import {
  checkDuplicateInDatabase,
  checkDuplicateNameInDatabase,
  validatePrice,
} from "./helpers/helpers";

export default {
  data() {
    return {
      itemFile: null,
      errors: [],
      originalItem: null,
    };
  },
  computed: {
    ...mapState({
      authenticated: (state) => state.authentication.authenticatedUser,
      item: (state) => state.products.currentItem,
      s3Config: (state) => state.authentication.s3Config,
    }),
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      if (this.authenticatedUser == null) {
        this.$router.replace({ path: "/login" });
      }
    }
    if (this.item == null) {
      this.$router.replace("/edititems");
    }
    // Set original item, used for certain validation and replacement
    this.originalItem = {
      ...this.item,
    };
  },
  methods: {
    ...mapActions([
      "updateItemInDatabase",
      "deleteItemFromDatabase",
      "addNewItemToDatabase",
    ]),

    async submit() {
      // Clear errors
      this.errors = [];

      // Validates differently based on if file is changing
      var isValid = null;
      if (this.itemFile == null) {
        isValid = await this.validateWithoutFile();
        if (!isValid) {
          return;
        }
      } else {
        isValid = await this.validate();
        if (!isValid) {
          return;
        }
      }

      // If everything is valid, then we want to update the old item with new values. For now, we are going to leave old image files in the database.

      // If we have a file this section uploads the file to AWS-S3 image bucket for jnsmetals, then returns an image url
      if (this.itemFile != null) {
        this.uploadToS3(this.itemFile).then(() => {
          // For now, we are going to delete the old item and add the new.
          this.deleteItemFromDatabase(this.originalItem.name);
          this.addNewItemToDatabase(this.item);
          // this.updateItemInDatabase({
          //   item: this.item,
          //   originalName: this.originalItem.name,
          // });
          this.$router.push("/edititems");
        });
      } else {
        // If we don't have file update, skip s3 process

        // For now, we are going to delete the old item and add the new.
        this.deleteItemFromDatabase(this.originalItem.name);
        this.addNewItemToDatabase(this.item);
        // this.updateItemInDatabase({
        //   item: this.item,
        //   originalName: this.originalItem.name,
        // });
        this.$router.push("/edititems");
      }
    },
    // Returns the URL of uploaded image
    uploadToS3(file) {
      return new Promise((resolve) => {
        // Since this process adds the file extension, we need to remove the extension before we send in the name
        var fileName =
          file.name.substr(0, file.name.lastIndexOf(".")) || file.name;
        // Initialize S3 client
        const S3Client = new S3(this.s3Config);

        S3Client.uploadFile(file, fileName)
          .then((data) => {
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
    async validate() {
      var valid = null;
      // This means there is a file, so we have to check both for the image and the file.
      valid = await checkDuplicateInDatabase(
        this.item.name,
        this.itemFile.name,
        this.originalItem
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
              "File name (and likely image) has been used before. Please use new name, delete item with old file name, or leave blank."
            );
            validCheck = false;
          }
          // Validate price
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
        .catch((error) => {
          console.log(error);
        });

      return valid;
    },
    async validateWithoutFile() {
      // If the file is not included (most cases), then we only check for a duplicate name, unless it is the same name as currently
      var valid;
      valid = await checkDuplicateNameInDatabase(
        this.item.name,
        this.originalItem
      )
        .then((response) => {
          // Set a check to determine what we return at end of chain
          var validCheck = true;
          // If true, match was found, so we need to set the error and check to false
          if (response == true) {
            validCheck = false;
            this.errors.push(
              "Different item has the same name. Please use previous name or new name."
            );
          }
          // Validate price
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