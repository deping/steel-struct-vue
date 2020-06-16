
export function amountBeamByfbLay(fbLay: string): number { // 根据fbLay计算梁片数
  let cnt = 0; // fbLay中分号的数目
  let pos = -1;
  while (true) {
    pos = fbLay.indexOf(";", pos + 1);
    if (pos === -1) break;
    ++cnt;
  }
  return cnt === 0 ? 0 : (cnt + 1) / 2;
}

export function amountBeamByQB(valueQB: string | number): number { // 根据QB计算梁片数
  const n: number = typeof (valueQB) === "string" ? parseInt(valueQB) : valueQB;
  if (n <= 14000) {
    return 2;
  } else if (n <= 22000) {
    return 3;
  } else if (n <= 32000) {
    return 4;
  } else if (n <= 40000) {
    return 5;
  } else if (n <= 50000) {
    return 6;
  }
  return 0;
}
