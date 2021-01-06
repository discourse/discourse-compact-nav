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

      console.log(currentURL);

      let showOnHome = settings.on_home_page;
      let showOnTag = settings.on_tag_pages;
      let showOnCategory = settings.on_category_pages;

      let isTagPage = routeName.split(".")[0] === "tag" || 
        routeName.split(".")[0] === "tags";

      let isHomePage = currentURL === "/";

      let isCategoryPage = routeName === "discovery.category" ||
        routeName === "discovery.latestCategory" ||
        routeName === "discovery.categories";
        routeName === "discovery.topCategory" ||
        routeName === "discovery.topAllCategory" ||
        routeName === "discovery.topYearlyCategory" ||
        routeName === "discovery.topQuarterlyCategory" ||
        routeName === "discovery.topMonthlyCategory" ||
        routeName === "discovery.topWeeklyCategory" ||
        routeName === "discovery.topDailyCategory" ||
        routeName === "discovery.categoryAll" ||
        routeName === "discovery.categoryNone";

      let renderOnTagePage = showOnTag === true && isTagPage === true;
      let renderOnHomePage = showOnHome === true && isHomePage === true;
      let renderOnCategoryPage = showOnCategory === true && isCategoryPage === true;
            
      return isMobile || renderOnTagePage || renderOnHomePage || renderOnCategoryPage;
    }
  });
});
