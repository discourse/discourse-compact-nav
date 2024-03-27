import { registerUnbound } from "discourse-common/lib/helpers";

registerUnbound("shouldBeExternal", (navItem, selectedItem) => {
  let externalNavItems = settings.nav_items_to_exclude.split("|");

  // check to see if nav item is in excluded list, and that it does
  // not equal the currently selected item
  return (
    externalNavItems.includes(navItem.name) &&
    navItem.name !== selectedItem.toLowerCase()
  );
});

registerUnbound("shouldBeInternal", (navItem) => {
  let externalNavItems = settings.nav_items_to_exclude.split("|");
  return !externalNavItems.includes(navItem.name);
});
