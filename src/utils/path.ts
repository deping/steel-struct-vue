import {
  isDevMode
} from "./misc";

export function getAjaxUrl(url: string): string {
  if (!url) {
    return "";
  }
  if (url.startsWith("http://") || url.startsWith("https://")) { return url; }
  let baseUrl: string;
  if (isDevMode()) {
    baseUrl = "http://192.168.6.54:9000";
  } else {
    baseUrl = document.location.origin;
  }
  return baseUrl + url;
}
