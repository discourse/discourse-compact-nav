import { registerUnbound } from "discourse-common/lib/helpers";

registerUnbound("shouldBeExternal", (navItem, selectedItem) => {
  let externalNavItems = settings.nav_items_to_exclude.split("|");

  if (
    // check to see if nav item is in excluded list, and that it does 
    // not equal the currently selected item
    externalNavItems.indexOf(navItem.name) !== -1 &&
    navItem.name !== selectedItem.toLowerCase()
  ) {
    return true;
  }
});

registerUnbound("shouldBeInternal", (navItem, selectedItem) => {
  let externalNavItems = settings.nav_items_to_exclude.split("|");
  if (externalNavItems.indexOf(navItem.name) !== -1) {
    return false;
  } else {
    return true;
  }
});
