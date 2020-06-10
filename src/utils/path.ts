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

// "file.name.with.dots.txt"   // "txt"
// "file.txt"                  // "txt"
// "file"                      // undefined
// ""                          // undefined
// null                        // undefined
// undefined                   // undefined
export function getFileExt(str: string): string {
  const re = /(?:\.([^.]+))?$/;
  const res = re.exec(str);
  if (res && res[1]) {
    return res[1];
  }
  return "";
}

export function getFilePath(str: string) {
  const pos = str.lastIndexOf("/");
  return str.substring(0, pos);
}

export function getRelativePath(str: string) {
  let pos = str.indexOf("//");
  if (pos !== -1) {
    pos = str.indexOf("/", pos + 2);
    return str.substring(pos);
  }
  return str;
}
