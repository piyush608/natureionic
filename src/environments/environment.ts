// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const URL = " https://dev.ntrhub.com/api/v3";

export const environment = {
  production: false,
  BASE_URL: URL + "/user",
  CATEGORY_URL: URL + "/category",
  BUSINESS_URL: URL + "/business",
  RECIPE_URL: URL + "/recipe",
  HUNTEDPRODUCT_URL: URL + "/product",
  ARTICLE_URL: URL + "/article",
  GUIDE_URL: URL + "/guide",
  LEVEL_URL: URL + "/level",
  POINTS_URL: URL + "/point",
  PHOTO_URL: URL + "/photo",
  PREFERENCE_URL: URL + "/preference",
  SETTINGS_URL: URL + "/setting",
  CARDS_URL: URL + "/card",
  apiKey: "AIzaSyDgsEC3C4fI6Otn-LJLs2SzySnYp91hHQU",
  host: "https://naturehub-bucket.sfo2.digitaloceanspaces.com",
  endPoint: "sfo2.digitaloceanspaces.com",
  bucket: "naturehub-bucket",
  accessKeyId: "FDVCDLKZWZSSPH7E2BSN",
  secretAccessKey: "g+xwGFvLfwALBCB8v+N9Ag2BWQ8n1W+MD2YsVffS9u8"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
