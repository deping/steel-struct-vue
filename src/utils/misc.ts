export function isDevMode(): boolean {
  // 在构建过程中，process.env.NODE_ENV 将会被相应的值所取代。
  return process.env.NODE_ENV === "development";
}

declare function isNaN(number: string | number): boolean;

export function isNumber(txt: string): boolean {
  return !isNaN(txt) as boolean;
}

export function isPoint(txt: string): boolean {
  const a = txt.split(",");
  if (a.length !== 2) {
    return false;
  }
  return isNumber(a[0]) && isNumber(a[1]);
}

export function isSize(txt: string): boolean {
  const a = txt.split("*");
  if (a.length !== 2) {
    return false;
  }
  return isNumber(a[0]) && isNumber(a[1]);
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

export function makeLabelValueArray(
  label: string,
  value: string,
  start: number,
  end: number,
  init: {
    label: string;
    value: string;
  }[] = []
): {
  label: string;
  value: string;
}[] {
  const res = init;
  for (let i = start; i <= end; ++i) {
    res.push({ label: `${label}${i}`, value: `${value}${i}` });
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

export function getClientPosition(evt: MouseEvent) {
  const el: HTMLElement | undefined = evt.target as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;
  return { x, y };
}

export function getWsUrl(url: string) {
  let host: string;
  if (isDevMode()) {
    host = "192.168.6.54:9994";
  } else {
    host = document.location.origin.replace(/(http|https):\/\//, "");
  }
  return "ws://" + host + "/ws/" + url;
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

// Element Table.setCurrentRow(node) doesn't work
export function setCurrentRow(e: Element | undefined, rowClassName: string, index: number) {
  if (!e) return;
  const trs = e.querySelectorAll("tr." + rowClassName);
  for (let i = 0; i < trs.length; ++i) {
    const tr = trs[i];
    if (i === index) {
      tr.classList.add("current-row");
    } else {
      tr.classList.remove("current-row");
    }
  }
}

export function headerCellStyle(indicator: any) {
  if (indicator.rowIndex === 0) {
    return "background-color: rgb(84, 92, 100);color: white;font-weight: 700;";
  }
}
