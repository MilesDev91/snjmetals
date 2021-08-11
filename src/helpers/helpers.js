// This file holds all of our helper functions.
//
// Functions:
// checkDuplicate (object, object array)

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