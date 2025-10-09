import { withPluginApi } from "discourse/lib/plugin-api";
import { defaultHomepage } from "discourse/lib/utilities";

const NAME = "navigation-bar-overrides";

function showDropdownNavMode(isMobile, router) {
  if (settings.everywhere) {
    return true;
  }

  const routeName = router.currentRouteName;

  const isTagPage = routeName === "tag.show";
  const isCategoryPage =
    routeName === "discovery.category" || routeName === "discovery.categories";
  const isHomePage = routeName === `discovery.${defaultHomepage()}`;

  const showDropdownOnTagPage = settings.on_tag_pages && isTagPage;
  const showDropdownOnHomePage = settings.on_home_page && isHomePage;
  const showDropdownOnCategoryPage =
    settings.on_category_pages && isCategoryPage;

  return (
    isMobile ||
    showDropdownOnTagPage ||
    showDropdownOnHomePage ||
    showDropdownOnCategoryPage
  );
}

export default {
  name: NAME,
  initialize() {
    withPluginApi((api) => {
      api.registerValueTransformer("navigation-bar-dropdown-mode", () => {
        const mobileView = api.container.lookup("service:site").mobileView;
        const router = api.container.lookup("service:router");

        return showDropdownNavMode(mobileView, router);
      });

      api.registerValueTransformer(
        "navigation-bar-dropdown-icon",
        ({ value }) => {
          const desktopView = api.container.lookup("service:site").desktopView;
          if (desktopView) {
            return settings.dropdown_icon;
          } else {
            return value;
          }
        }
      );
    });
  },
};
