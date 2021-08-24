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
// originalItem is optional and used for editing
export function checkDuplicateInDatabase (itemName, fileName, originalItem = null) {
  return Promise.all([
    checkDuplicateNameInDatabase(itemName, originalItem),
    checkDuplicateImagePathInDatabase(fileName, originalItem)
  ])
}
// This function receives the item name and checks for it in the firebase database. Names must be unique for a multitude of reasons. Resolves true if it finds one and false if it doesn't.
export function checkDuplicateNameInDatabase (itemName, originalItem = null) {
  return new Promise((resolve) => {
    // Returns snapshot of item name
    itemsDatabase.orderByChild('name').equalTo(itemName).once('value')
      .then((snapshot) => {
        // Turn snapshot into usable name string
        var item = snapshot.toJSON()
        for (var key in item) {
          var dupeItemName = item[key].name
        }
        // Checks for original item to see if it is edit comparison.
        if (originalItem != null) {
          if (itemName == dupeItemName && itemName != originalItem.name) {
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          // Reaching here means it is a regular comparison
          if (itemName == dupeItemName) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
      .catch((error) => { console.log(error) })
  })
}
// This function receives a file name, appends it to a base URL, then searches the firebase database for a copy. This is to avoid overwriting images in the S3 database, as it might lead to other items referencing the wrong image. Resolves true if it finds one and false if it doesn't.
export function checkDuplicateImagePathInDatabase (fileName, originalItem) {
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
        // Checks to see if it is an edit comparison
        if (originalItem != null) {
          if (imagePath == dupeItemPath && imagePath != originalItem.imagePath) {
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          // Regular comparison
          if (imagePath == dupeItemPath) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

// Validators

// This function validates price by checking decimal count, then iterating through and only accepting numbers or decimals. Returns false. Also checks length. 10 characters total allowed, which will allow for any useful price.
export function validatePrice (price) {
  console.log(price)
  // Check length, decimal count, trailing numbers past 2, and character validity
  if (price.length > 10 ||
    // This checks number of decimals
    (price.split(".").length - 1) > 1 ||
    // This expression checks for more than two trailing numbers and non digit characters
    (price.match(/\.[0-9]{3}|[^0-9.]/g) || []).length > 0
  ) {
    return false
  }
  return true
}
// Checks for length. Size is open to be mostly anything.
export function validateSize (size) {
  // Check for length
  if (size.length > 10) {
    return false
  }
  return true
}