// This file holds all of our helper functions.
//
// Functions:
// checkDuplicate (object, object array)
// checkDuplicateInDatabase (string, string)
const s3ImagesUrl = "https://jnsmetals.s3.us-east-2.amazonaws.com/images"
import { itemsDatabase } from "../vuex_store/index";

// This functions compares an item to an array to find a duplicate.
export function checkDuplicate (item, itemGroup) {
  for (var i = 0; i < itemGroup.length; i++) {
    if (item.name == itemGroup[i].name) {
      // This means code found an item of this name, so it returns true
      return true;
    }
  }
  // didn't find a duplicate
  return false;
}
// This functions calls two promises that check our firebase database for a copy of the image path and name. This is to avoid overwriting images in our s3 bucket AND enforce unique names in our firebase database. If either promise rejects, this promise will also reject, which states that a duplicate was found.
export function checkDuplicateInDatabase (itemName, fileName) {
  return Promise.all([
    checkDuplicateNameInDatabase(itemName),
    checkDuplicateImagePathInDatabase(fileName)
  ])
}
// This function receives the item name and checks for it in the firebase database. Names must be unique for a multitude of reasons. Resolves true if it finds one and false if it doesn't.
export function checkDuplicateNameInDatabase (itemName) {
  return new Promise((resolve) => {
    // Returns snapshot of item name
    itemsDatabase.orderByChild('name').equalTo(itemName).once('value')
      .then((snapshot) => {
        // Turn snapshot into usable name string
        var item = snapshot.toJSON()
        for (var key in item) {
          var dupeItemName = item[key].name
        }
        // Checks item against one found in the database, which should be null or empty if it isn't a match.
        if (itemName == dupeItemName) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((error) => { console.log(error) })
  })
}
// This function receives a file name, appends it to a base URL, then searches the firebase database for a copy. This is to avoid overwriting images in the S3 database, as it might lead to other items referencing the wrong image. Resolves true if it finds one and false if it doesn't.
export function checkDuplicateImagePathInDatabase (fileName) {
  var imagePath = s3ImagesUrl + "/" + fileName
  return new Promise((resolve) => {
    // Returns snapshot or null
    itemsDatabase.orderByChild('imagePath').equalTo(imagePath).once('value')
      .then((snapshot) => {
        // Turn snapshot into usable item path string
        var item = snapshot.toJSON()
        for (var key in item) {
          var dupeItemPath = item[key].imagePath
        }
        // Checks image path against one found in database, which should be null or empty if it isn't a match.
        if (imagePath == dupeItemPath) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

// Validators

// This function validates price by setting up a decimal count, then we only allow one decimal and no letters. Returns false
export function validatePrice (price) {
  var decimalCount = 0;
  for (let i in price) {
    if (isNaN(parseInt(price[i]))) {
      if (price[i] == ".") {
        decimalCount += 1;
        if (decimalCount > 1) {
          return false
        }
      } else {
        return false
      }
    }
  }
  return true
}