import { alias } from "@ember/object/computed";
import { service } from "@ember/service";
import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";

export default apiInitializer("0.8", (api) => {
  api.modifyClass("component:navigation-bar", {
    router: service(),

    classNameBindings: ["showCompactNav:compact-version"],
    showCompactVersion: alias("showCompactNav"),
    isMobile: alias("showMobileVersion"),

    @discourseComputed("site.isMobileDevice")
    showMobileVersion(isMobile) {
      return isMobile;
    },

    @discourseComputed(
      "site.isMobileDevice",
      "router.currentRouteName",
      "router.currentURL"
    )
    showCompactNav(isMobile, routeName, currentURL) {
      if (settings.everywhere) {
        return true;
      }

      let showOnHome = settings.on_home_page;
      let showOnTag = settings.on_tag_pages;
      let showOnCategory = settings.on_category_pages;

      // check for presence of 'tag' in routeName
      let isTagPage = !!routeName.match(/tag/);

      // check for presence of 'categor' in routeName ie. categorIES, categorY will be matched
      let isCategoryPage = !!routeName.match(/categor/);

      let isHomePage = currentURL === "/";

      let renderOnTagPage = showOnTag === true && isTagPage === true;
      let renderOnHomePage = showOnHome === true && isHomePage === true;
      let renderOnCategoryPage =
        showOnCategory === true && isCategoryPage === true;

      return (
        isMobile || renderOnTagPage || renderOnHomePage || renderOnCategoryPage
      );
    },
  });
});
