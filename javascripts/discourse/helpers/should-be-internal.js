export default function (navItem) {
  const externalNavItems = settings.nav_items_to_exclude.split("|");
  return !externalNavItems.includes(navItem.name);
}
