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
    withPluginApi("1.37.2", (api) => {
      const mobileView = api.container.lookup("service:site").mobileView;
      const router = api.container.lookup("service:router");
      api.registerValueTransformer("navigation-bar-dropdown-mode", () => {
        return showDropdownNavMode(mobileView, router);
      });

      if (!mobileView) {
        api.registerValueTransformer("navigation-bar-dropdown-icon", () => {
          return settings.dropdown_icon;
        });
      }
    });
  },
};
