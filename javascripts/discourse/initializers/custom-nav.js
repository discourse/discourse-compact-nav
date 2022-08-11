import { apiInitializer } from "discourse/lib/api";
import { alias } from "@ember/object/computed";
import discourseComputed from "discourse-common/utils/decorators";
import { inject as service } from "@ember/service";

export default apiInitializer("0.8", api => {
  api.modifyClass("component:navigation-bar", {
    classNameBindings: ["showCompactNav:compact-version"],
    showCompactVersion: alias("showCompactNav"),
    router: service("router"),
    isMobile: alias("showMobileVersion"),

    @discourseComputed("site.isMobileDevice")
    showMobileVersion(isMobile) {
      return isMobile;
    },

    @discourseComputed("site.isMobileDevice", "router.currentRouteName", "router.currentURL")
    showCompactNav(isMobile, routeName, currentURL) {
      if(settings.everywhere){
        return true;
      }

      let showOnHome = settings.on_home_page;
      let showOnTag = settings.on_tag_pages;
      let showOnCategory = settings.on_category_pages;

      // check for presence of 'tag' in routeName
      let isTagPage = !!(routeName.match(/tag/));

      // check for presence of 'categor' in routeName ie. categorIES, categorY will be matched
      let isCategoryPage = !!(routeName.match(/categor/));

      let isHomePage = currentURL === "/";

      let renderOnTagePage = showOnTag === true && isTagPage === true;
      let renderOnHomePage = showOnHome === true && isHomePage === true;
      let renderOnCategoryPage = showOnCategory === true && isCategoryPage === true;
            
      return isMobile || renderOnTagePage || renderOnHomePage || renderOnCategoryPage;
    }
  });
});
