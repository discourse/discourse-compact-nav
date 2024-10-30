export default function (navItem, selectedItem) {
  const externalNavItems = settings.nav_items_to_exclude.split("|");

  // check to see if nav item is in excluded list, and that it does
  // not equal the currently selected item
  return (
    externalNavItems.includes(navItem.name) &&
    navItem.name !== selectedItem.toLowerCase()
  );
}
