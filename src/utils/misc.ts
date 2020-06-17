declare const _: any;
export function isDevMode(): boolean {
  // 在构建过程中，process.env.NODE_ENV 将会被相应的值所取代。
  return process.env.NODE_ENV === "development";
}

export function isNumber(txt: string): boolean {
  return _.isFinite(txt) as boolean;
}

export function isPoint(txt: string): boolean {
  const a = txt.split(",");
  if (a.length !== 2) {
    return false;
  }
  return _.isFinite(a[0]) && _.isFinite(a[0]);
}

interface EnumType {
  [index: string]: number | string;
}

export function makeEnum(arr: string[]): EnumType {
  const retVal: EnumType = {};
  arr.forEach((val, index) => {
    // retVal[index] = val;
    // retVal[val] = index;
    Object.defineProperty(retVal, index, { value: val, enumerable: true });
    Object.defineProperty(retVal, val, { value: index, enumerable: false });
  });
  Object.freeze(retVal);
  return retVal;
}

// 创建一个序列 如 腹板0、腹板1、腹板2、腹板3
export function makeSequenceStringArray(
  s: string,
  start: number,
  end: number,
  init: string[] = []
): string[] {
  const res: string[] = init;
  for (let i = start; i <= end; ++i) {
    res.push(`${s}${i}`);
  }
  return res;
}

export function getPos(e: HTMLElement) {
  let x = 0;
  let y = 0;
  while (e !== null) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent as HTMLElement;
  }
  return { x, y };
}

export function getWsUrl(url: string) {
  let host: string;
  if (isDevMode()) {
    host = "192.168.6.54:9994";
  } else {
    host = document.location.origin.replace(/http|https:\/\//, "");
  }
  return "ws://" + host + "/ws/" + url;
}

export function findEnumIndex(s: string, e: EnumType) {
  const index = e[s];
  if (typeof index === "number") return index;
  return isNumber(index) ? parseInt(index) : 0;
}

export function generateUUID() {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
