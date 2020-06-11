import { LJK, ExportData, HGXData } from "./export-data";
import { UiData } from "./ui-data";

export class JsonDataService {
  stateZXJJL = 0; // ZXJJL属性来自两张表，设置标记防止写冲突
  valueQB = 11800;
  amoutGZL = 2;

  uiJSON: UiData = {
    isEmpty: "true",
    valueL: "40000",
    zdhlform: "0,0,0",
    dfbData: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
    dfbOption: "0,0",
    sllxData: {
      "I-1-0": "0,0,0,0,0,0,0",
      "I-1-1": "0,0,0,0,0,0,0",
      "I-1-2": "0,0,0,0,0,0,0",
      "I-1-3": "0,0,0,0,0,0,0",
      "I-1-4": "0,0,0,0,0,0,0",
      "I-2-0": "0,0,0,0,0,0,0",
      "I-2-1": "0,0,0,0,0,0,0",
      "I-2-2": "0,0,0,0,0,0,0",
      "I-2-3": "0,0,0,0,0,0,0",
      "I-2-4": "0,0,0,0,0,0,0",
    },
    sllxOption: {
      "I-1-0": "0",
      "I-1-1": "0",
      "I-1-2": "0",
      "I-1-3": "0",
      "I-1-4": "0",
      "I-2-0": "",
      "I-2-1": "",
      "I-2-2": "",
      "I-2-3": "",
      "I-2-4": "",
    },
    hglxData: {
      "SF-1-0": "0,0,0,0,0,0,0,0,0,0,0,0,0",
      "SF-1-1": "0,0,0,0,0,0,0,0,0,0,0,0,0",
      "SF-1-2": "0,0,0,0,0,0,0,0,0,0,0,0,0",
      "SF-1-3": "0,0,0,0,0,0,0,0,0,0,0,0,0",
      "SF-1-4": "0,0,0,0,0,0,0,0,0,0,0,0,0",
    },
    hglxOption: {
      "SF-1-0": "0",
      "SF-1-1": "0",
      "SF-1-2": "0",
      "SF-1-3": "0",
      "SF-1-4": "0",
    },
    rklxData: {
      A型: "0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      B型: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      C型: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      D型: "0,0,0,0,0,0",
      E型: "0,0,0,0,0,0,0",
      F型: "0,0,0,0,0,0",
      G型: "0,0,0,0,0,0,0",
    },
    rklxOption: {
      A型: "0,0",
      B型: "0,0,0",
      C型: "0,0,0",
      D型: "",
      E型: "0",
      F型: "",
      G型: "",
    },
    hllxData: {
      单梁式: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      // '桁架式': '',
    },
    hllxOption: {
      单梁式: "0,0,0,0",
      // '桁架式': '',
    },
    zzgsData: {
      单支座: "0",
      双支座: "0,0",
    },
    zcjjllxData: {
      ZC2: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      ZC3: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      // ZC2W: '',
      // ZC3W: '',
    },
    zcjjllxOption: {
      ZC2: "0,0,0,0,0,0,0,0,0",
      ZC3: "0,0,0,0,0,0,0,0,0,0",
      // ZC2W: '',
      // ZC3W: '',
    },
    zdhllxData: {
      单梁式: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      // '桁架式': '',
    },
    zdhllxOption: {
      单梁式: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      // '桁架式': '',
    }
  };

  // eventEmitSerializedJSON = new EventEmitter();
  // eventEmitDataL = new EventEmitter();
  // eventEmitDataQB = new EventEmitter();
  // eventEmitRefreshLM = new EventEmitter();
  // eventEmitAdjustQB = new EventEmitter(); // 修改 标准横断面-护栏-外包、内缩 时修正valueQB
  // eventEmitSaveComponent = new EventEmitter();
  // //eventEmitAmoutGZL = new EventEmitter(); // 在界面上修改钢主梁片数时，修改其他表的下拉选项，相关表有：翼缘板厚度、腹板厚度、底板厚度、检修孔、泄水孔

  // //eventEmitAmoutGZL = new EventEmitter(); // 在界面上修改钢主梁片数时，修改其他表的下拉选项，相关表有：翼缘板厚度、腹板厚度、底板厚度、检修孔、泄水孔
  ljkJSON!: LJK;

  exportJSON: ExportData = {
    // table-hgxbjxbsj
    BJ: [
      {
        aaaid: "1",
        bj: "HGB",
        d: "10",
        dw1: "YYB-212+A0",
        dw2: "%FB1+r,%FB2+l",
        ghk: "R35;R35;R35;R35",
        jm: "",
        kk: "ZXKK1,,",
        l: "",
        lj: "HGB1",
        mat: "Q355C",
        name: "横隔板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "2",
        bj: "HGB",
        d: "10",
        dw1: "YYB-212+A0",
        dw2: "%FB3+r,%FB4+l",
        ghk: "R35;R35;R35;R35",
        jm: "",
        kk: "ZXKK1,,",
        l: "",
        lj: "HGB1",
        mat: "Q355C",
        name: "横隔板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "3",
        bj: "TB",
        d: "12",
        dw1: "%1+u",
        dw2: "FB1+410,FB2-410",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "200"
      },
      {
        aaaid: "4",
        bj: "TB",
        d: "12",
        dw1: "%2+u",
        dw2: "FB3+410,FB4-410",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "200"
      },
      {
        aaaid: "5",
        bj: "RK",
        d: "",
        dw1: "DB+850",
        dw2: "XLCen1+0",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeG",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "6",
        bj: "HLF",
        d: "8",
        dw1: "YYB-915+A0",
        dw2: "%FB2+r,%FB3+l",
        ghk: "R35;R35;R35;R35",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横梁腹板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "530"
      },
      {
        aaaid: "7",
        bj: "HLT",
        d: "10",
        dw1: "%6+u",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横梁顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "250"
      },
      {
        aaaid: "8",
        bj: "HLB",
        d: "10",
        dw1: "%6+d",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横梁底板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "250"
      },
      {
        aaaid: "9",
        bj: "SL",
        d: "8",
        dw1: "HLCen1-500",
        dw2: "%7+d,%8+u",
        ghk: "L20;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "竖肋",
        note: "",
        reserve: "1",
        splitedBy: "%6",
        w: "90"
      },
      {
        aaaid: "10",
        bj: "SL",
        d: "8",
        dw1: "HLCen1+500",
        dw2: "%7+d,%8+u",
        ghk: "L20;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "竖肋",
        note: "",
        reserve: "1",
        splitedBy: "%6",
        w: "90"
      },
      {
        aaaid: "11",
        bj: "JJB",
        d: "10",
        dw1: "%7+u",
        dw2: "%FB2+l,300",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%1",
        w: "120"
      },
      {
        aaaid: "12",
        bj: "JJB",
        d: "10",
        dw1: "%8+u",
        dw2: "%FB2+l,300",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%1",
        w: "120"
      },
      {
        aaaid: "13",
        bj: "JJB",
        d: "10",
        dw1: "%7+u",
        dw2: "%FB3+r,300",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%2",
        w: "120"
      },
      {
        aaaid: "14",
        bj: "JJB",
        d: "10",
        dw1: "%8+u",
        dw2: "%FB3+r,300",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%2",
        w: "120"
      },
      {
        aaaid: "15",
        bj: "SXJJL",
        d: "16",
        dw1: "%FB1+r",
        dw2: "%YYB+d,DB+80",
        ghk: "R30",
        jm: "",
        kk: "",
        l: "",
        lj: "SXJJL1",
        mat: "Q355C",
        name: "腹板竖肋",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "190"
      },
      {
        aaaid: "16",
        bj: "SXJJL",
        d: "16",
        dw1: "%FB2+l",
        dw2: "%YYB+d,DB+80",
        ghk: "R30",
        jm: "",
        kk: "",
        l: "",
        lj: "SXJJL1",
        mat: "Q355C",
        name: "腹板竖肋",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "190"
      },
      {
        aaaid: "17",
        bj: "SXJJL",
        d: "16",
        dw1: "%FB3+r",
        dw2: "%YYB+d,DB+80",
        ghk: "R30",
        jm: "",
        kk: "",
        l: "",
        lj: "SXJJL1",
        mat: "Q355C",
        name: "腹板竖肋",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "190"
      },
      {
        aaaid: "18",
        bj: "SXJJL",
        d: "16",
        dw1: "%FB4+l",
        dw2: "%YYB+d,DB+80",
        ghk: "R30",
        jm: "",
        kk: "",
        l: "",
        lj: "SXJJL1",
        mat: "Q355C",
        name: "腹板竖肋",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "190"
      },
      {
        aaaid: "19",
        bj: "LJJ",
        d: "",
        dw1: "HLCen1-1350",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ZJHLFB1;ZJHLDB1",
        mat: "Q355C",
        name: "连接件",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "10"
      },
      {
        aaaid: "20",
        bj: "RK",
        d: "",
        dw1: "DB+850",
        dw2: "XLCen2+0",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeG",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "21",
        bj: "LJJ",
        d: "",
        dw1: "HLCen1+1350",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ZJHLFB1;ZJHLDB1",
        mat: "Q355C",
        name: "连接件",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "10"
      },
      {
        aaaid: "22",
        bj: "HGB",
        d: "20",
        dw1: "YYB+0",
        dw2: "%FB1+r,%FB2+l",
        ghk: "R35;R35;L20;L20",
        jm: "",
        kk: "ZXKK3,,",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "23",
        bj: "HGB",
        d: "20",
        dw1: "YYB+0",
        dw2: "%FB3+r,%FB4+l",
        ghk: "R35;R35;L20;L20",
        jm: "",
        kk: "ZXKK3,,",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "24",
        bj: "TB",
        d: "28",
        dw1: "%22+u",
        dw2: "",
        ghk: "R35;R35;",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "450"
      },
      {
        aaaid: "25",
        bj: "TB",
        d: "28",
        dw1: "%23+u",
        dw2: "",
        ghk: "R35;R35;",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "450"
      },
      {
        aaaid: "26",
        bj: "RK",
        d: "",
        dw1: "DB+1100",
        dw2: "XLCen1-630",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeB",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "27",
        bj: "SL",
        d: "28",
        dw1: "XLCen1-200",
        dw2: "%24+d,DB+0",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%22",
        w: "240"
      },
      {
        aaaid: "28",
        bj: "SL",
        d: "28",
        dw1: "XLCen2-200",
        dw2: "%25+d,DB+0",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%23",
        w: "240"
      },
      {
        aaaid: "29",
        bj: "SL",
        d: "28",
        dw1: "XLCen1+200",
        dw2: "%24+d,DB+0",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%22",
        w: "240"
      },
      {
        aaaid: "30",
        bj: "SL",
        d: "28",
        dw1: "XLCen2+200",
        dw2: "%25+d,DB+0",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%23",
        w: "240"
      },
      {
        aaaid: "31",
        bj: "ZDHLF",
        d: "18",
        dw1: "YYB-1380+A0",
        dw2: "%FB2+r,%FB3+l",
        ghk: "R35;R35;R35;R35",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横梁腹板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "32",
        bj: "HLT",
        d: "28",
        dw1: "%31+u",
        dw2: "",
        ghk: "R35;R35",
        jm: "",
        kk: "",
        l: "",
        lj: "SPJJBJC",
        mat: "Q355C",
        name: "横梁顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "450"
      },
      {
        aaaid: "33",
        bj: "HLB",
        d: "20",
        dw1: "%31+d",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "SPJJBJB",
        mat: "Q355C",
        name: "横梁底板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "450"
      },
      {
        aaaid: "34",
        bj: "SL",
        d: "14",
        dw1: "HLCen1-700",
        dw2: "%32+d,%33+u",
        ghk: "R35;R35;",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "竖肋",
        note: "",
        reserve: "",
        splitedBy: "%31",
        w: "180"
      },
      {
        aaaid: "44",
        bj: "SL",
        d: "14",
        dw1: "HLCen1+700",
        dw2: "%32+d,%33+u",
        ghk: "R35;R35;",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "竖肋",
        note: "",
        reserve: "",
        splitedBy: "%31",
        w: "180"
      },
      {
        aaaid: "35",
        bj: "HL",
        d: "14",
        dw1: "YYB-280+A0",
        dw2: "HLCen1-1130,HLCen1+1130",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横肋",
        note: "",
        reserve: "",
        splitedBy: "%31;%34;%44",
        w: "160"
      },
      {
        aaaid: "36",
        bj: "HL",
        d: "14",
        dw1: "%33+260",
        dw2: "HLCen1-1130,HLCen1+1130",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横肋",
        note: "",
        reserve: "",
        splitedBy: "%31;%34;%44",
        w: "160"
      },
      {
        aaaid: "37",
        bj: "SL",
        d: "28",
        dw1: "XLCen1+600",
        dw2: "DB+0,DB+1200",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "临时",
        reserve: "1",
        splitedBy: "%22",
        w: "240"
      },
      {
        aaaid: "38",
        bj: "SL",
        d: "28",
        dw1: "XLCen2-600",
        dw2: "DB+0,DB+1200",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "临时",
        reserve: "1",
        splitedBy: "%23",
        w: "240"
      },
      {
        aaaid: "39",
        bj: "JJB",
        d: "16",
        dw1: "%33+d",
        dw2: "%FB1+r,%FB2+l",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%22;%27;%29;%37",
        w: "200"
      },
      {
        aaaid: "40",
        bj: "JJB",
        d: "16",
        dw1: "%33+d",
        dw2: "%FB3+r,%FB4+l",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%23;%28;%30;%38",
        w: "200"
      },
      {
        aaaid: "41",
        bj: "RK",
        d: "",
        dw1: "DB+1100",
        dw2: "XLCen2+630",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeB",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "42",
        bj: "LJJ",
        d: "",
        dw1: "HLCen1-1350",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ZDHGBFB1;ZDHGBDB1",
        mat: "Q355C",
        name: "连接件",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "10"
      },
      {
        aaaid: "43",
        bj: "LJJ",
        d: "",
        dw1: "HLCen1+1350",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ZDHGBFB1;ZDHGBDB1",
        mat: "Q355C",
        name: "连接件",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "10"
      },
      {
        aaaid: "45",
        bj: "RK",
        d: "",
        dw1: "%33+680",
        dw2: "HLCen1+0",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeJ",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
    ],
    // table-gj
    GJ: [
      {
        aaaid: "横筋顶",
        d: "16",
        djl: "44.2",
        djr: "44.2",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "44.2",
        type: "3",
        wg: "0",
        锚固长度: "500"
      },
      {
        aaaid: "横筋底",
        d: "16",
        djl: "62.6",
        djr: "62.6",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "54.2",
        type: "3",
        wg: "0",
        锚固长度: "500"
      },
      {
        aaaid: "横筋底边支",
        d: "16",
        djl: "62.6",
        djr: "62.6",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "54.2",
        type: "3",
        wg: "300",
        锚固长度: "500"
      },
      {
        aaaid: "纵筋顶",
        d: "20",
        djl: "49.2",
        djr: "49.2",
        s: "100",
        sb: "125",
        sm: "0",
        sz: "67.6",
        type: "3",
        wg: "200",
        锚固长度: "500"
      },
      {
        aaaid: "纵筋顶墩顶",
        d: "25",
        djl: "49.2",
        djr: "49.2",
        s: "100",
        sb: "125",
        sm: "0",
        sz: "67.6",
        type: "3",
        wg: "250",
        锚固长度: "500"
      },
      {
        aaaid: "纵筋底",
        d: "20",
        djl: "77.6",
        djr: "77.6",
        s: "100",
        sb: "125",
        sm: "0",
        sz: "77.6",
        type: "3",
        wg: "200",
        锚固长度: "500"
      },
      {
        aaaid: "纵筋底墩顶",
        d: "25",
        djl: "77.6",
        djr: "77.6",
        s: "100",
        sb: "125",
        sm: "0",
        sz: "77.6",
        type: "3",
        wg: "250",
        锚固长度: "500"
      },
      {
        aaaid: "勾筋",
        d: "12",
        djl: "0",
        djr: "0",
        s: "100",
        sb: "1",
        sm: "0",
        sz: "0",
        type: "3",
        wg: "120",
        锚固长度: "500"
      },
      {
        aaaid: "槽口顶横向",
        d: "16",
        djl: "44.2",
        djr: "44.2",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "44.2",
        type: "3",
        wg: "160",
        锚固长度: "500"
      },
      {
        aaaid: "槽口顶纵向",
        d: "16",
        djl: "44.2",
        djr: "0",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "62.6",
        type: "3",
        wg: "160",
        锚固长度: "500"
      },
    ],
    // table-hgxsj
    HGX: [
      {
        aaaid: "hgx1",
        allBJ: "22;23;24;25;26;27;28;29;30;31;32;33;34;44;35;36;37;38;39;40;41;42;43;45",
        oriDH: "HGB1"
      },
      {
        aaaid: "hgx2",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB2"
      },
      {
        aaaid: "hgx3",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB3"
      },
      {
        aaaid: "hgx4",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB4"
      },
      {
        aaaid: "hgx5",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB5"
      },
      {
        aaaid: "hgx6",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB6"
      },
      {
        aaaid: "hgx7",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB7"
      },
      {
        aaaid: "hgx8",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB8"
      },
      {
        aaaid: "hgx9",
        allBJ: "22;23;24;25;26;27;28;29;30;31;32;33;34;44;35;36;37;38;39;40;41;42;43;45",
        oriDH: "HGB9"
      },
      {
        aaaid: "hgx10",
        allBJ: "15;16;17;18",
        oriDH: "SL1-2-1"
      },
      {
        aaaid: "hgx11",
        allBJ: "15;16;17;18",
        oriDH: "SL1-2-2"
      },
      {
        aaaid: "hgx12",
        allBJ: "15;16;17;18",
        oriDH: "SL1-2-3"
      },
      {
        aaaid: "hgx13",
        allBJ: "15;16;17;18",
        oriDH: "SL2-3-1"
      },
      {
        aaaid: "hgx14",
        allBJ: "15;16;17;18",
        oriDH: "SL2-3-2"
      },
      {
        aaaid: "hgx15",
        allBJ: "15;16;17;18",
        oriDH: "SL2-3-3"
      },
      {
        aaaid: "hgx16",
        allBJ: "15;16;17;18",
        oriDH: "SL3-4-1"
      },
      {
        aaaid: "hgx17",
        allBJ: "15;16;17;18",
        oriDH: "SL3-4-2"
      },
      {
        aaaid: "hgx18",
        allBJ: "15;16;17;18",
        oriDH: "SL3-4-3"
      },
      {
        aaaid: "hgx19",
        allBJ: "15;16;17;18",
        oriDH: "SL4-5-1"
      },
      {
        aaaid: "hgx20",
        allBJ: "15;16;17;18",
        oriDH: "SL4-5-2"
      },
      {
        aaaid: "hgx21",
        allBJ: "15;16;17;18",
        oriDH: "SL4-5-3"
      },
      {
        aaaid: "hgx22",
        allBJ: "15;16;17;18",
        oriDH: "SL5-6-1"
      },
      {
        aaaid: "hgx23",
        allBJ: "15;16;17;18",
        oriDH: "SL5-6-2"
      },
      {
        aaaid: "hgx24",
        allBJ: "15;16;17;18",
        oriDH: "SL5-6-3"
      },
      {
        aaaid: "hgx25",
        allBJ: "15;16;17;18",
        oriDH: "SL6-7-1"
      },
      {
        aaaid: "hgx26",
        allBJ: "15;16;17;18",
        oriDH: "SL6-7-2"
      },
      {
        aaaid: "hgx27",
        allBJ: "15;16;17;18",
        oriDH: "SL6-7-3"
      },
      {
        aaaid: "hgx28",
        allBJ: "15;16;17;18",
        oriDH: "SL7-8-1"
      },
      {
        aaaid: "hgx29",
        allBJ: "15;16;17;18",
        oriDH: "SL7-8-2"
      },
      {
        aaaid: "hgx30",
        allBJ: "15;16;17;18",
        oriDH: "SL7-8-3"
      },
      {
        aaaid: "hgx31",
        allBJ: "15;16;17;18",
        oriDH: "SL8-9-1"
      },
      {
        aaaid: "hgx32",
        allBJ: "15;16;17;18",
        oriDH: "SL8-9-2"
      },
      {
        aaaid: "hgx33",
        allBJ: "15;16;17;18",
        oriDH: "SL8-9-3"
      },
    ],
    // table-jxk
    JXK: [
      {
        aaaid: "jxk1",
        hxCKX: "FB1",
        hxPos: "900",
        matIndex: "JXK2",
        type: "1",
        zxCKX: "BK0",
        zxPos: "40"
      },
      {
        aaaid: "jxk2",
        hxCKX: "FB1",
        hxPos: "900",
        matIndex: "JXK2",
        type: "1",
        zxCKX: "BK1",
        zxPos: "-40"
      },
      {
        aaaid: "jxk3",
        hxCKX: "FB4",
        hxPos: "900",
        matIndex: "JXK2",
        type: "1",
        zxCKX: "BK0",
        zxPos: "40"
      },
      {
        aaaid: "jxk4",
        hxCKX: "FB4",
        hxPos: "900",
        matIndex: "JXK2",
        type: "1",
        zxCKX: "BK1",
        zxPos: "-40"
      },
    ],
    MAIN: [
      {
        aaak: "name",
        v: "测试数据1",
      },
      {
        aaak: "type",
        v: "钢混组合槽形梁",
      },
      {
        aaak: "note1",
        v: "",
      },
      {
        aaak: "note2",
        v: "",
      },
      {
        aaak: "extraGzl", // widget-gzl，表格序列化时中间一列数据未参与计算，存到此处
        v: "0",
      },
      {
        aaak: "bk", // table-bk，后改为route-page
        v: "1010", // 'BK1,1010,90,ssftest1;BK2,1050,90,ssftest1',
      },
      {
        aaak: "es", // table-ldj，后改为widget-qltz
        v: "40,40",
      },
      {
        aaak: "qmCS", // pages/route-page
        v: "970,2,-2;1090,2,-2",
      },
      {
        aaak: "hulan", // form-qmys，后改为widget-hl
        v: "HL200×1000,100;HL200×1000,100",
      },
      {
        aaak: "pz", // table-qmpz
        v: "沥青砼铺装,沥青,100;防水层,防水涂料,",
      },
      {
        aaak: "importFiles", // pages/route-page
        v: "A.pm,A道路边线.dxf,A.ZDM,A.sup",
      },
      {
        aaak: "fbLay", // 默认为空
        v: "",
      },
      {
        aaak: "xfK", // form-bzdmsj
        v: "",
      },
      {
        aaak: "dbL", // form-bzdmsj
        v: "850,850;850,850",
      },
      {
        aaak: "ckW", // table-ldj
        v: "700,700",
      },
      {
        aaak: "ckH", // table-ldj
        v: "100,100",
      },
      {
        aaak: "ckLS", // table-ldj
        v: "400,400",
      },
      {
        aaak: "ckRS", // table-ldj
        v: "400,400",
      },
      {
        aaak: "tt", // form-bzdmsj，后改为widget-qmb
        v: "350",
      },
      {
        aaak: "dt", // form-qmbgzzxsj，后改为widget-qmb
        v: "350",
      },
      {
        aaak: "bt", // 默认
        v: "600",
      },
      {
        aaak: "dunTopD", // form-qmbgzzxsj，后改为默认值
        v: "1500,1000;1500,1000",
      },
      {
        aaak: "sybTopD", // form-bzdmsj，后改为widget-qmb
        v: "400",
      },
      {
        aaak: "xbLenS", // form-bzdmsj，后改为默认值
        v: "-1,0,-1",
      },
      {
        aaak: "xbLenE", // form-bzdmsj，后改为默认值
        v: "-1,0,-1",
      },
      {
        aaak: "xbDS", // form-bzdmsj，后改为widget-qmb
        v: "250,0",
      },
      {
        aaak: "xbDE", // form-bzdmsj，后改为widget-qmb
        v: "250,0",
      },
      {
        aaak: "glH", // form-bzdmsj，后改为widget-gzl
        v: "1830",
      },
      {
        aaak: "dbDirect", // 默认为1，后改为widget-gzl
        v: "1",
      },
      {
        aaak: "fbt", // form-bzdmsj，后改为widget-qmb
        v: "600",
      },
      {
        aaak: "yybB", // form-bzdmsj，后改为widget-qmb
        v: "600",
      },
      {
        aaak: "dbCSType", // form-bzdmsj，后改为widget-gzl
        v: "2",
      },
      {
        aaak: "yybD", // table-yybhd
        v: "DLX,0,9560,28;DLX,9560,30360,46;DLX,30360,39920,28",
      },
      {
        aaak: "fbD", // table-fbbhd
        v: "DLX,0,9560,16;DLX,9560,30360,16;DLX,30360,39920,16",
      },
      {
        aaak: "dbD", // table-dbhd
        v: "DLX,0,9260,28;DLX,9260,30660,44;DLX,30660,39920,28",
      },
      {
        aaak: "hgbLay", // form-zqxhgxbz
        v: "BK0+550,M1-15000,6*5000,BK1-550",
      },
      {
        aaak: "sxjjLLay", // form-zqxhgxbz
        v: "R1115,6*L1250,L1115",
      },
      {
        aaak: "dbExtendfb", // form-bzdmsj，后改为widget-gzl
        v: "60",
      },
      {
        aaak: "hgxBJ", // 默认为空
        v: "",
      },
      {
        aaak: "ygd", // table-ygd
        v: "1950,23;2500,48;2500,70;2500,88;2500,101;2500,111;2500,117;2500,119;2500,117;2500,111;2500,101;2500,88;2500,70;2500,48;2500,23;1950,0",
      },
      {
        aaak: "zxjtw", // table-gljdbz
        v: "10",
      },
      {
        aaak: "qmbMat", // form-bzdmsj
        v: "C35",
      },
      {
        aaak: "gbMat", // form-bzdmsj，后改为widget-gzl
        v: "Q355C",
      },
      {
        aaak: "jldYYBZLay", // table-jld
        v: "160,198*201",
      },
      {
        aaak: "jldYYBH", // table-jld
        v: "2,150",
      },
      {
        aaak: "jldTBH", // table-jld
        v: "150,150,200",
      },
      {
        aaak: "jldTBZ", // table-jld
        v: "3,150",
      },
      {
        aaak: "jldMat", // table-jld
        v: "D22x200",
      },
      {
        aaak: "zs", // widget-qltz
        v: "550,550",
      },
      {
        aaak: "bHulanWaiBaoInLx", // widget-hl
        v: "1",
      },
      {
        aaak: "dsc", // widget-qmb
        v: "150,10",
      },
      {
        aaak: "fbDirect", // widget-gzl
        v: "3",
      },
      {
        aaak: "yybDirect", // widget-gzl
        v: "3",
      },
    ],
    // table-xsk
    XSK: [
      {
        aaaid: "xsk1",
        ckFB: "FB1",
        ckHGX: "HGB1",
        hpos: "50",
        matIndex: "XSK1",
        ysbPos: "200,650",
        zpos: "280"
      },
      {
        aaaid: "xsk2",
        ckFB: "FB2",
        ckHGX: "HGB1",
        hpos: "-50",
        matIndex: "XSK1",
        ysbPos: "200,650",
        zpos: "280"
      },
      {
        aaaid: "xsk3",
        ckFB: "FB3",
        ckHGX: "HGB1",
        hpos: "50",
        matIndex: "XSK1",
        ysbPos: "200,650",
        zpos: "280"
      },
      {
        aaaid: "xsk4",
        ckFB: "FB4",
        ckHGX: "HGB1",
        hpos: "-50",
        matIndex: "XSK1",
        ysbPos: "200,650",
        zpos: "280"
      },
      {
        aaaid: "xsk5",
        ckFB: "FB1",
        ckHGX: "HGB9",
        hpos: "50",
        matIndex: "XSK1",
        ysbPos: "-200,-650",
        zpos: "-280"
      },
      {
        aaaid: "xsk6",
        ckFB: "FB2",
        ckHGX: "HGB9",
        hpos: "-50",
        matIndex: "XSK1",
        ysbPos: "-200,-650",
        zpos: "-280"
      },
      {
        aaaid: "xsk7",
        ckFB: "FB3",
        ckHGX: "HGB9",
        hpos: "50",
        matIndex: "XSK1",
        ysbPos: "-200,-650",
        zpos: "-280"
      },
      {
        aaaid: "xsk8",
        ckFB: "FB4",
        ckHGX: "HGB9",
        hpos: "-50",
        matIndex: "XSK1",
        ysbPos: "-200,-650",
        zpos: "-280"
      },
    ],
    // table-dbzxjjlbz、table-fbzxjjlbz
    ZXJJL: [
      {
        aaaid: "",
        ckx: "XLCen1",
        lay: "0",
        matIndex: "ZXJJL1",
        region: "20,39900",
        type: "2",
        hd: "10",
        lh: "200",
      },
      {
        aaaid: "",
        ckx: "XLCen2",
        lay: "0",
        matIndex: "ZXJJL1",
        region: "20,39900",
        type: "2",
        hd: "10",
        lh: "200",
      },
    ],
    // table-gljdbz
    ZXJT: [
      {
        aaaid: "",
        dblj: "DB401",
        dbzllj: "ZXJJL40",
        dist: "6835",
        fblj: "FB401;FB402;FB401;FB402",
        name: "接头1",
        zxckx: "DLX"
      },
      {
        aaaid: "",
        dblj: "DB402",
        dbzllj: "ZXJJL40",
        dist: "15585",
        fblj: "FB401;FB402;FB401;FB402",
        name: "接头2",
        zxckx: "DLX"
      },
      {
        aaaid: "",
        dblj: "DB402",
        dbzllj: "ZXJJL40",
        dist: "24355",
        fblj: "FB401;FB402;FB401;FB402",
        name: "接头3",
        zxckx: "DLX"
      },
      {
        aaaid: "",
        dblj: "DB401",
        dbzllj: "ZXJJL40",
        dist: "33085",
        fblj: "FB401;FB402;FB401;FB402",
        name: "接头4",
        zxckx: "DLX"
      },
    ],
    // table-zz
    ZZ: [
      {
        aaaid: "zz1",
        hxpos: "-3245",
        name: "",
        type: "GPZ(2009)4GD",
        xxk: "50,30,30",
        zxckx: "BK0",
        zxpos: "550"
      },
      {
        aaaid: "zz2",
        hxpos: "3245",
        name: "",
        type: "GPZ(2009)4DX-100",
        xxk: "50,30,30",
        zxckx: "BK0",
        zxpos: "550"
      },
      {
        aaaid: "zz3",
        hxpos: "-3245",
        name: "",
        type: "GPZ(2009)4DX-100",
        xxk: "50,30,30",
        zxckx: "BK1",
        zxpos: "-550"
      },
      {
        aaaid: "zz4",
        hxpos: "3245",
        name: "",
        type: "GPZ(2009)4SX-100",
        xxk: "50,30,30",
        zxckx: "BK1",
        zxpos: "-550"
      }
    ],
  }; // exportJSON ending

  htszJSON = {
    HTBL: [
      {
        aaaid: "z",
        mean: "主要材料汇总表",
        note: "",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "zhlzpm",
        mean: "组合梁总体布置图",
        note: "平面",
        scale: "120",
        draw: "true",
      },
      {
        aaaid: "zhlzlm",
        mean: "组合梁总体布置图",
        note: "立面",
        scale: "120",
        draw: "true",
      },
      {
        aaaid: "zhlzdm",
        mean: "组合梁总体布置图",
        note: "断面",
        scale: "40",
        draw: "true",
      },
      {
        aaaid: "zhlzdy",
        mean: "组合梁总体布置图",
        note: "大样",
        scale: "20",
        draw: "true",
      },
      {
        aaaid: "xlzpm",
        mean: "箱梁总体布置图",
        note: "平面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "xlzlm",
        mean: "箱梁总体布置图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "hgxdm",
        mean: "钢梁横膈系构造图",
        note: "断面",
        scale: "30",
        draw: "false",
      },
      {
        aaaid: "hgxdy",
        mean: "钢梁横膈系构造图",
        note: "大样",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "hgxdy1",
        mean: "钢梁横膈系构造图",
        note: "局部大样",
        scale: "10",
        draw: "false",
      },
      {
        aaaid: "gdljdm",
        mean: "箱梁工地连接构造图",
        note: "断面",
        scale: "30",
        draw: "false",
      },
      {
        aaaid: "gdljdy",
        mean: "箱梁工地连接构造图",
        note: "大样",
        scale: "15",
        draw: "false",
      },
      {
        aaaid: "gcljdm",
        mean: "箱梁工厂连接构造图",
        note: "断面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "gcljsty",
        mean: "箱梁工厂连接构造图",
        note: "示意图",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "zdhldm",
        mean: "支点横梁构造图",
        note: "断面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "zdhldy",
        mean: "支点横梁构造图",
        note: "大样",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "zjhldm",
        mean: "中间横梁构造图",
        note: "断面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "zjhldy",
        mean: "中间横梁构造图",
        note: "大样",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "x",
        mean: "箱梁板件焊接连接构造图",
        note: "",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "tjgblm",
        mean: "钢主梁支座调节钢板构造图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "tjgbdy",
        mean: "钢主梁支座调节钢板构造图",
        note: "大样",
        scale: "25",
        draw: "false",
      },
      {
        aaaid: "ygdlm",
        mean: "箱梁预拱度示意图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "pspm",
        mean: "箱梁排水构造图",
        note: "平面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "psdm",
        mean: "箱梁排水构造图",
        note: "断面",
        scale: "10",
        draw: "false",
      },
      {
        aaaid: "psdy",
        mean: "箱梁排水构造图",
        note: "大样",
        scale: "5",
        draw: "false",
      },
      {
        aaaid: "jxmlm",
        mean: "箱梁检修门构造图",
        note: "立面",
        scale: "10",
        draw: "false",
      },
      {
        aaaid: "jxmxt",
        mean: "箱梁检修门构造图",
        note: "详图",
        scale: "5",
        draw: "false",
      },
      {
        aaaid: "jxmdy",
        mean: "箱梁检修门构造图",
        note: "大样",
        scale: "5",
        draw: "false",
      },
      {
        aaaid: "zzbzpm",
        mean: "箱梁支座布置图",
        note: "平面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jldpm",
        mean: "钢梁剪力钉布置图",
        note: "平面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jldlm",
        mean: "钢梁剪力钉布置图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jlddm",
        mean: "钢梁剪力钉布置图",
        note: "断面",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "jldpm",
        mean: "钢梁剪力钉布置图",
        note: "平面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jldlm",
        mean: "钢梁剪力钉布置图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jlddm",
        mean: "钢梁剪力钉布置图",
        note: "断面",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "qmbgjlm",
        mean: "桥面板钢筋构造图",
        note: "立面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "qmbgjdm",
        mean: "桥面板钢筋构造图",
        note: "断面",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "qmbgjdy",
        mean: "桥面板钢筋构造图",
        note: "大样",
        scale: "20",
        draw: "false",
      }
    ]
  }; // htszJSON ending

  hgxgzJSON: HGXData = {
    HGX1: [],
    LM: [],
  }; // hgxgzJSON ending

  defaultExportJSON: ExportData = {
    // table-hgxbjxbsj
    BJ: [
      {
        aaaid: "1",
        bj: "HGB",
        d: "10",
        dw1: "YYB-212+A0",
        dw2: "%FB1+r,%FB2+l",
        ghk: "R35;R35;R35;R35",
        jm: "",
        kk: "ZXKK1,,",
        l: "",
        lj: "HGB1",
        mat: "Q355C",
        name: "横隔板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "2",
        bj: "HGB",
        d: "10",
        dw1: "YYB-212+A0",
        dw2: "%FB3+r,%FB4+l",
        ghk: "R35;R35;R35;R35",
        jm: "",
        kk: "ZXKK1,,",
        l: "",
        lj: "HGB1",
        mat: "Q355C",
        name: "横隔板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "3",
        bj: "TB",
        d: "12",
        dw1: "%1+u",
        dw2: "FB1+410,FB2-410",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "200"
      },
      {
        aaaid: "4",
        bj: "TB",
        d: "12",
        dw1: "%2+u",
        dw2: "FB3+410,FB4-410",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "200"
      },
      {
        aaaid: "5",
        bj: "RK",
        d: "",
        dw1: "DB+850",
        dw2: "XLCen1+0",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeG",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "6",
        bj: "HLF",
        d: "8",
        dw1: "YYB-915+A0",
        dw2: "%FB2+r,%FB3+l",
        ghk: "R35;R35;R35;R35",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横梁腹板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "530"
      },
      {
        aaaid: "7",
        bj: "HLT",
        d: "10",
        dw1: "%6+u",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横梁顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "250"
      },
      {
        aaaid: "8",
        bj: "HLB",
        d: "10",
        dw1: "%6+d",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横梁底板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "250"
      },
      {
        aaaid: "9",
        bj: "SL",
        d: "8",
        dw1: "HLCen1-500",
        dw2: "%7+d,%8+u",
        ghk: "L20;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "竖肋",
        note: "",
        reserve: "1",
        splitedBy: "%6",
        w: "90"
      },
      {
        aaaid: "10",
        bj: "SL",
        d: "8",
        dw1: "HLCen1+500",
        dw2: "%7+d,%8+u",
        ghk: "L20;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "竖肋",
        note: "",
        reserve: "1",
        splitedBy: "%6",
        w: "90"
      },
      {
        aaaid: "11",
        bj: "JJB",
        d: "10",
        dw1: "%7+u",
        dw2: "%FB2+l,300",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%1",
        w: "120"
      },
      {
        aaaid: "12",
        bj: "JJB",
        d: "10",
        dw1: "%8+u",
        dw2: "%FB2+l,300",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%1",
        w: "120"
      },
      {
        aaaid: "13",
        bj: "JJB",
        d: "10",
        dw1: "%7+u",
        dw2: "%FB3+r,300",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%2",
        w: "120"
      },
      {
        aaaid: "14",
        bj: "JJB",
        d: "10",
        dw1: "%8+u",
        dw2: "%FB3+r,300",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%2",
        w: "120"
      },
      {
        aaaid: "15",
        bj: "SXJJL",
        d: "16",
        dw1: "%FB1+r",
        dw2: "%YYB+d,DB+80",
        ghk: "R30",
        jm: "",
        kk: "",
        l: "",
        lj: "SXJJL1",
        mat: "Q355C",
        name: "腹板竖肋",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "190"
      },
      {
        aaaid: "16",
        bj: "SXJJL",
        d: "16",
        dw1: "%FB2+l",
        dw2: "%YYB+d,DB+80",
        ghk: "R30",
        jm: "",
        kk: "",
        l: "",
        lj: "SXJJL1",
        mat: "Q355C",
        name: "腹板竖肋",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "190"
      },
      {
        aaaid: "17",
        bj: "SXJJL",
        d: "16",
        dw1: "%FB3+r",
        dw2: "%YYB+d,DB+80",
        ghk: "R30",
        jm: "",
        kk: "",
        l: "",
        lj: "SXJJL1",
        mat: "Q355C",
        name: "腹板竖肋",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "190"
      },
      {
        aaaid: "18",
        bj: "SXJJL",
        d: "16",
        dw1: "%FB4+l",
        dw2: "%YYB+d,DB+80",
        ghk: "R30",
        jm: "",
        kk: "",
        l: "",
        lj: "SXJJL1",
        mat: "Q355C",
        name: "腹板竖肋",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "190"
      },
      {
        aaaid: "19",
        bj: "LJJ",
        d: "",
        dw1: "HLCen1-1350",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ZJHLFB1;ZJHLDB1",
        mat: "Q355C",
        name: "连接件",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "10"
      },
      {
        aaaid: "20",
        bj: "RK",
        d: "",
        dw1: "DB+850",
        dw2: "XLCen2+0",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeG",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "21",
        bj: "LJJ",
        d: "",
        dw1: "HLCen1+1350",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ZJHLFB1;ZJHLDB1",
        mat: "Q355C",
        name: "连接件",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "10"
      },
      {
        aaaid: "22",
        bj: "HGB",
        d: "20",
        dw1: "YYB+0",
        dw2: "%FB1+r,%FB2+l",
        ghk: "R35;R35;L20;L20",
        jm: "",
        kk: "ZXKK3,,",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "23",
        bj: "HGB",
        d: "20",
        dw1: "YYB+0",
        dw2: "%FB3+r,%FB4+l",
        ghk: "R35;R35;L20;L20",
        jm: "",
        kk: "ZXKK3,,",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "24",
        bj: "TB",
        d: "28",
        dw1: "%22+u",
        dw2: "",
        ghk: "R35;R35;",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "450"
      },
      {
        aaaid: "25",
        bj: "TB",
        d: "28",
        dw1: "%23+u",
        dw2: "",
        ghk: "R35;R35;",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横隔板顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "450"
      },
      {
        aaaid: "26",
        bj: "RK",
        d: "",
        dw1: "DB+1100",
        dw2: "XLCen1-630",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeB",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "27",
        bj: "SL",
        d: "28",
        dw1: "XLCen1-200",
        dw2: "%24+d,DB+0",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%22",
        w: "240"
      },
      {
        aaaid: "28",
        bj: "SL",
        d: "28",
        dw1: "XLCen2-200",
        dw2: "%25+d,DB+0",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%23",
        w: "240"
      },
      {
        aaaid: "29",
        bj: "SL",
        d: "28",
        dw1: "XLCen1+200",
        dw2: "%24+d,DB+0",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%22",
        w: "240"
      },
      {
        aaaid: "30",
        bj: "SL",
        d: "28",
        dw1: "XLCen2+200",
        dw2: "%25+d,DB+0",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%23",
        w: "240"
      },
      {
        aaaid: "31",
        bj: "ZDHLF",
        d: "18",
        dw1: "YYB-1380+A0",
        dw2: "%FB2+r,%FB3+l",
        ghk: "R35;R35;R35;R35",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横梁腹板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "32",
        bj: "HLT",
        d: "28",
        dw1: "%31+u",
        dw2: "",
        ghk: "R35;R35",
        jm: "",
        kk: "",
        l: "",
        lj: "SPJJBJC",
        mat: "Q355C",
        name: "横梁顶板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "450"
      },
      {
        aaaid: "33",
        bj: "HLB",
        d: "20",
        dw1: "%31+d",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "SPJJBJB",
        mat: "Q355C",
        name: "横梁底板",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "450"
      },
      {
        aaaid: "34",
        bj: "SL",
        d: "14",
        dw1: "HLCen1-700",
        dw2: "%32+d,%33+u",
        ghk: "R35;R35;",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "竖肋",
        note: "",
        reserve: "",
        splitedBy: "%31",
        w: "180"
      },
      {
        aaaid: "44",
        bj: "SL",
        d: "14",
        dw1: "HLCen1+700",
        dw2: "%32+d,%33+u",
        ghk: "R35;R35;",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "竖肋",
        note: "",
        reserve: "",
        splitedBy: "%31",
        w: "180"
      },
      {
        aaaid: "35",
        bj: "HL",
        d: "14",
        dw1: "YYB-280+A0",
        dw2: "HLCen1-1130,HLCen1+1130",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横肋",
        note: "",
        reserve: "",
        splitedBy: "%31;%34;%44",
        w: "160"
      },
      {
        aaaid: "36",
        bj: "HL",
        d: "14",
        dw1: "%33+260",
        dw2: "HLCen1-1130,HLCen1+1130",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "横肋",
        note: "",
        reserve: "",
        splitedBy: "%31;%34;%44",
        w: "160"
      },
      {
        aaaid: "37",
        bj: "SL",
        d: "28",
        dw1: "XLCen1+600",
        dw2: "DB+0,DB+1200",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "临时",
        reserve: "1",
        splitedBy: "%22",
        w: "240"
      },
      {
        aaaid: "38",
        bj: "SL",
        d: "28",
        dw1: "XLCen2-600",
        dw2: "DB+0,DB+1200",
        ghk: "R35;L20",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "支承加劲板",
        note: "临时",
        reserve: "1",
        splitedBy: "%23",
        w: "240"
      },
      {
        aaaid: "39",
        bj: "JJB",
        d: "16",
        dw1: "%33+d",
        dw2: "%FB1+r,%FB2+l",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%22;%27;%29;%37",
        w: "200"
      },
      {
        aaaid: "40",
        bj: "JJB",
        d: "16",
        dw1: "%33+d",
        dw2: "%FB3+r,%FB4+l",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "",
        mat: "Q355C",
        name: "加劲板",
        note: "",
        reserve: "1",
        splitedBy: "%23;%28;%30;%38",
        w: "200"
      },
      {
        aaaid: "41",
        bj: "RK",
        d: "",
        dw1: "DB+1100",
        dw2: "XLCen2+630",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeB",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
      {
        aaaid: "42",
        bj: "LJJ",
        d: "",
        dw1: "HLCen1-1350",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ZDHGBFB1;ZDHGBDB1",
        mat: "Q355C",
        name: "连接件",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "10"
      },
      {
        aaaid: "43",
        bj: "LJJ",
        d: "",
        dw1: "HLCen1+1350",
        dw2: "",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ZDHGBFB1;ZDHGBDB1",
        mat: "Q355C",
        name: "连接件",
        note: "",
        reserve: "",
        splitedBy: "",
        w: "10"
      },
      {
        aaaid: "45",
        bj: "RK",
        d: "",
        dw1: "%33+680",
        dw2: "HLCen1+0",
        ghk: "",
        jm: "",
        kk: "",
        l: "",
        lj: "ManholeJ",
        mat: "Q355C",
        name: "人孔",
        note: "",
        reserve: "",
        splitedBy: "",
        w: ""
      },
    ],
    // table-gj
    GJ: [
      {
        aaaid: "横筋顶",
        d: "16",
        djl: "44.2",
        djr: "44.2",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "44.2",
        type: "3",
        wg: "0",
        锚固长度: "500"
      },
      {
        aaaid: "横筋底",
        d: "16",
        djl: "62.6",
        djr: "62.6",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "54.2",
        type: "3",
        wg: "0",
        锚固长度: "500"
      },
      {
        aaaid: "横筋底边支",
        d: "16",
        djl: "62.6",
        djr: "62.6",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "54.2",
        type: "3",
        wg: "300",
        锚固长度: "500"
      },
      {
        aaaid: "纵筋顶",
        d: "20",
        djl: "49.2",
        djr: "49.2",
        s: "100",
        sb: "125",
        sm: "0",
        sz: "67.6",
        type: "3",
        wg: "200",
        锚固长度: "500"
      },
      {
        aaaid: "纵筋顶墩顶",
        d: "25",
        djl: "49.2",
        djr: "49.2",
        s: "100",
        sb: "125",
        sm: "0",
        sz: "67.6",
        type: "3",
        wg: "250",
        锚固长度: "500"
      },
      {
        aaaid: "纵筋底",
        d: "20",
        djl: "77.6",
        djr: "77.6",
        s: "100",
        sb: "125",
        sm: "0",
        sz: "77.6",
        type: "3",
        wg: "200",
        锚固长度: "500"
      },
      {
        aaaid: "纵筋底墩顶",
        d: "25",
        djl: "77.6",
        djr: "77.6",
        s: "100",
        sb: "125",
        sm: "0",
        sz: "77.6",
        type: "3",
        wg: "250",
        锚固长度: "500"
      },
      {
        aaaid: "勾筋",
        d: "12",
        djl: "0",
        djr: "0",
        s: "100",
        sb: "1",
        sm: "0",
        sz: "0",
        type: "3",
        wg: "120",
        锚固长度: "500"
      },
      {
        aaaid: "槽口顶横向",
        d: "16",
        djl: "44.2",
        djr: "44.2",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "44.2",
        type: "3",
        wg: "160",
        锚固长度: "500"
      },
      {
        aaaid: "槽口顶纵向",
        d: "16",
        djl: "44.2",
        djr: "0",
        s: "100",
        sb: "125",
        sm: "125",
        sz: "62.6",
        type: "3",
        wg: "160",
        锚固长度: "500"
      },
    ],
    // table-hgxsj
    HGX: [
      {
        aaaid: "hgx1",
        allBJ: "22;23;24;25;26;27;28;29;30;31;32;33;34;44;35;36;37;38;39;40;41;42;43;45",
        oriDH: "HGB1"
      },
      {
        aaaid: "hgx2",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB2"
      },
      {
        aaaid: "hgx3",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB3"
      },
      {
        aaaid: "hgx4",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB4"
      },
      {
        aaaid: "hgx5",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB5"
      },
      {
        aaaid: "hgx6",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB6"
      },
      {
        aaaid: "hgx7",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB7"
      },
      {
        aaaid: "hgx8",
        allBJ: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;20;19;21",
        oriDH: "HGB8"
      },
      {
        aaaid: "hgx9",
        allBJ: "22;23;24;25;26;27;28;29;30;31;32;33;34;44;35;36;37;38;39;40;41;42;43;45",
        oriDH: "HGB9"
      },
      {
        aaaid: "hgx10",
        allBJ: "15;16;17;18",
        oriDH: "SL1-2-1"
      },
      {
        aaaid: "hgx11",
        allBJ: "15;16;17;18",
        oriDH: "SL1-2-2"
      },
      {
        aaaid: "hgx12",
        allBJ: "15;16;17;18",
        oriDH: "SL1-2-3"
      },
      {
        aaaid: "hgx13",
        allBJ: "15;16;17;18",
        oriDH: "SL2-3-1"
      },
      {
        aaaid: "hgx14",
        allBJ: "15;16;17;18",
        oriDH: "SL2-3-2"
      },
      {
        aaaid: "hgx15",
        allBJ: "15;16;17;18",
        oriDH: "SL2-3-3"
      },
      {
        aaaid: "hgx16",
        allBJ: "15;16;17;18",
        oriDH: "SL3-4-1"
      },
      {
        aaaid: "hgx17",
        allBJ: "15;16;17;18",
        oriDH: "SL3-4-2"
      },
      {
        aaaid: "hgx18",
        allBJ: "15;16;17;18",
        oriDH: "SL3-4-3"
      },
      {
        aaaid: "hgx19",
        allBJ: "15;16;17;18",
        oriDH: "SL4-5-1"
      },
      {
        aaaid: "hgx20",
        allBJ: "15;16;17;18",
        oriDH: "SL4-5-2"
      },
      {
        aaaid: "hgx21",
        allBJ: "15;16;17;18",
        oriDH: "SL4-5-3"
      },
      {
        aaaid: "hgx22",
        allBJ: "15;16;17;18",
        oriDH: "SL5-6-1"
      },
      {
        aaaid: "hgx23",
        allBJ: "15;16;17;18",
        oriDH: "SL5-6-2"
      },
      {
        aaaid: "hgx24",
        allBJ: "15;16;17;18",
        oriDH: "SL5-6-3"
      },
      {
        aaaid: "hgx25",
        allBJ: "15;16;17;18",
        oriDH: "SL6-7-1"
      },
      {
        aaaid: "hgx26",
        allBJ: "15;16;17;18",
        oriDH: "SL6-7-2"
      },
      {
        aaaid: "hgx27",
        allBJ: "15;16;17;18",
        oriDH: "SL6-7-3"
      },
      {
        aaaid: "hgx28",
        allBJ: "15;16;17;18",
        oriDH: "SL7-8-1"
      },
      {
        aaaid: "hgx29",
        allBJ: "15;16;17;18",
        oriDH: "SL7-8-2"
      },
      {
        aaaid: "hgx30",
        allBJ: "15;16;17;18",
        oriDH: "SL7-8-3"
      },
      {
        aaaid: "hgx31",
        allBJ: "15;16;17;18",
        oriDH: "SL8-9-1"
      },
      {
        aaaid: "hgx32",
        allBJ: "15;16;17;18",
        oriDH: "SL8-9-2"
      },
      {
        aaaid: "hgx33",
        allBJ: "15;16;17;18",
        oriDH: "SL8-9-3"
      },
    ],
    // table-jxk
    JXK: [
      {
        aaaid: "jxk1",
        hxCKX: "FB1",
        hxPos: "900",
        matIndex: "JXK2",
        type: "1",
        zxCKX: "BK0",
        zxPos: "40"
      },
      {
        aaaid: "jxk2",
        hxCKX: "FB1",
        hxPos: "900",
        matIndex: "JXK2",
        type: "1",
        zxCKX: "BK1",
        zxPos: "-40"
      },
      {
        aaaid: "jxk3",
        hxCKX: "FB4",
        hxPos: "900",
        matIndex: "JXK2",
        type: "1",
        zxCKX: "BK0",
        zxPos: "40"
      },
      {
        aaaid: "jxk4",
        hxCKX: "FB4",
        hxPos: "900",
        matIndex: "JXK2",
        type: "1",
        zxCKX: "BK1",
        zxPos: "-40"
      },
    ],
    MAIN: [
      {
        aaak: "name",
        v: "测试数据1",
      },
      {
        aaak: "type",
        v: "钢混组合槽形梁",
      },
      {
        aaak: "note1",
        v: "",
      },
      {
        aaak: "note2",
        v: "",
      },
      {
        aaak: "extraGzl", // widget-gzl，表格序列化时中间一列数据未参与计算，存到此处
        v: "3800",
      },
      {
        aaak: "bk", // table-bk，后改为route-page
        v: "1010", // 'BK1,1010,90,ssftest1;BK2,1050,90,ssftest1',
      },
      {
        aaak: "es", // table-ldj，后改为widget-qltz
        v: "40,40",
      },
      {
        aaak: "qmCS", // pages/route-page
        v: "970,2,-2;1090,2,-2",
      },
      {
        aaak: "hulan", // form-qmys，后改为widget-hl
        v: "HL200×1000,100;HL200×1000,100",
      },
      {
        aaak: "pz", // table-qmpz
        v: "沥青砼铺装,沥青,100;防水层,防水涂料,",
      },
      {
        aaak: "importFiles", // pages/route-page
        v: "A.pm,A道路边线.dxf,A.ZDM,A.sup",
      },
      {
        aaak: "fbLay", // 默认为空
        v: "",
      },
      {
        aaak: "xfK", // form-bzdmsj
        v: "",
      },
      {
        aaak: "dbL", // form-bzdmsj
        v: "850,850;850,850",
      },
      {
        aaak: "ckW", // table-ldj
        v: "700,700",
      },
      {
        aaak: "ckH", // table-ldj
        v: "100,100",
      },
      {
        aaak: "ckLS", // table-ldj
        v: "400,400",
      },
      {
        aaak: "ckRS", // table-ldj
        v: "400,400",
      },
      {
        aaak: "tt", // form-bzdmsj，后改为widget-qmb
        v: "250",
      },
      {
        aaak: "dt", // form-qmbgzzxsj，后改为widget-qmb
        v: "350",
      },
      {
        aaak: "bt", // 默认
        v: "600",
      },
      {
        aaak: "dunTopD", // form-qmbgzzxsj，后改为默认值
        v: "1500,1000;1500,1000",
      },
      {
        aaak: "sybTopD", // form-bzdmsj，后改为widget-qmb
        v: "500",
      },
      {
        aaak: "xbLenS", // form-bzdmsj，后改为默认值
        v: "-1,0,-1",
      },
      {
        aaak: "xbLenE", // form-bzdmsj，后改为默认值
        v: "-1,0,-1",
      },
      {
        aaak: "xbDS", // form-bzdmsj，后改为widget-qmb
        v: "160,0",
      },
      {
        aaak: "xbDE", // form-bzdmsj，后改为widget-qmb
        v: "160,0",
      },
      {
        aaak: "glH", // form-bzdmsj，后改为widget-gzl
        v: "1830",
      },
      {
        aaak: "dbDirect", // 默认为1，后改为widget-gzl
        v: "1",
      },
      {
        aaak: "fbt", // form-bzdmsj，后改为widget-qmb
        v: "700",
      },
      {
        aaak: "yybB", // form-bzdmsj，后改为widget-qmb
        v: "600",
      },
      {
        aaak: "dbCSType", // form-bzdmsj，后改为widget-gzl
        v: "2",
      },
      {
        aaak: "yybD", // table-yybhd
        v: "DLX,0,9560,28;DLX,9560,30360,46;DLX,30360,39920,28",
      },
      {
        aaak: "fbD", // table-fbbhd
        v: "DLX,0,9560,16;DLX,9560,30360,16;DLX,30360,39920,16",
      },
      {
        aaak: "dbD", // table-dbhd
        v: "DLX,0,9260,28;DLX,9260,30660,44;DLX,30660,39920,28",
      },
      {
        aaak: "hgbLay", // form-zqxhgxbz
        v: "BK0+550,M1-15000,6*5000,BK1-550",
      },
      {
        aaak: "sxjjLLay", // form-zqxhgxbz
        v: "R1115,6*L1250,L1115",
      },
      {
        aaak: "dbExtendfb", // form-bzdmsj，后改为widget-gzl
        v: "60",
      },
      {
        aaak: "hgxBJ", // 默认为空
        v: "",
      },
      {
        aaak: "ygd", // table-ygd
        v: "1950,23;2500,48;2500,70;2500,88;2500,101;2500,111;2500,117;2500,129;2500,117;2500,111;2500,101;2500,88;2500,70;2500,48;2500,23;1950,0",
      },
      {
        aaak: "zxjtw", // table-gljdbz
        v: "10",
      },
      {
        aaak: "qmbMat", // form-bzdmsj
        v: "C35",
      },
      {
        aaak: "gbMat", // form-bzdmsj，后改为widget-gzl
        v: "Q355C",
      },
      {
        aaak: "jldYYBZLay", // table-jld
        v: "160,198*200",
      },
      {
        aaak: "jldYYBH", // table-jld
        v: "3,150",
      },
      {
        aaak: "jldTBH", // table-jld
        v: "150,150,200",
      },
      {
        aaak: "jldTBZ", // table-jld
        v: "2,150",
      },
      {
        aaak: "jldMat", // table-jld
        v: "D22x200",
      },
      {
        aaak: "zs", // widget-qltz
        v: "550,550",
      },
      {
        aaak: "bHulanWaiBaoInLx", // widget-hl
        v: "1",
      },
      {
        aaak: "dsc", // widget-qmb
        v: "150,10",
      },
      {
        aaak: "fbDirect", // widget-gzl
        v: "3",
      },
      {
        aaak: "yybDirect", // widget-gzl
        v: "3",
      },
    ],
    // table-xsk
    XSK: [
      {
        aaaid: "xsk1",
        ckFB: "FB1",
        ckHGX: "HGB1",
        hpos: "50",
        matIndex: "XSK1",
        ysbPos: "200,650",
        zpos: "280"
      },
      {
        aaaid: "xsk2",
        ckFB: "FB2",
        ckHGX: "HGB1",
        hpos: "-50",
        matIndex: "XSK1",
        ysbPos: "200,650",
        zpos: "280"
      },
      {
        aaaid: "xsk3",
        ckFB: "FB3",
        ckHGX: "HGB1",
        hpos: "50",
        matIndex: "XSK1",
        ysbPos: "200,650",
        zpos: "280"
      },
      {
        aaaid: "xsk4",
        ckFB: "FB4",
        ckHGX: "HGB1",
        hpos: "-50",
        matIndex: "XSK1",
        ysbPos: "200,650",
        zpos: "280"
      },
      {
        aaaid: "xsk5",
        ckFB: "FB1",
        ckHGX: "HGB9",
        hpos: "50",
        matIndex: "XSK1",
        ysbPos: "-200,-650",
        zpos: "-280"
      },
      {
        aaaid: "xsk6",
        ckFB: "FB2",
        ckHGX: "HGB9",
        hpos: "-50",
        matIndex: "XSK1",
        ysbPos: "-200,-650",
        zpos: "-280"
      },
      {
        aaaid: "xsk7",
        ckFB: "FB3",
        ckHGX: "HGB9",
        hpos: "50",
        matIndex: "XSK1",
        ysbPos: "-200,-650",
        zpos: "-280"
      },
      {
        aaaid: "xsk8",
        ckFB: "FB4",
        ckHGX: "HGB9",
        hpos: "-50",
        matIndex: "XSK1",
        ysbPos: "-200,-650",
        zpos: "-280"
      },
    ],
    // table-dbzxjjlbz、table-fbzxjjlbz
    ZXJJL: [
      {
        aaaid: "",
        ckx: "XLCen1",
        lay: "0",
        matIndex: "ZXJJL1",
        region: "20,39900",
        type: "2",
        hd: "10",
        lh: "200",
      },
      {
        aaaid: "",
        ckx: "XLCen2",
        lay: "0",
        matIndex: "ZXJJL1",
        region: "20,39900",
        type: "2",
        hd: "10",
        lh: "200",
      },
    ],
    // table-gljdbz
    ZXJT: [
      {
        aaaid: "",
        dblj: "DB401",
        dbzllj: "ZXJJL40",
        dist: "6835",
        fblj: "FB401;FB402;FB401;FB402",
        name: "接头1",
        zxckx: "DLX"
      },
      {
        aaaid: "",
        dblj: "DB402",
        dbzllj: "ZXJJL40",
        dist: "15585",
        fblj: "FB401;FB402;FB401;FB402",
        name: "接头2",
        zxckx: "DLX"
      },
      {
        aaaid: "",
        dblj: "DB402",
        dbzllj: "ZXJJL40",
        dist: "24355",
        fblj: "FB401;FB402;FB401;FB402",
        name: "接头3",
        zxckx: "DLX"
      },
      {
        aaaid: "",
        dblj: "DB401",
        dbzllj: "ZXJJL40",
        dist: "33085",
        fblj: "FB401;FB402;FB401;FB402",
        name: "接头4",
        zxckx: "DLX"
      },
    ],
    // table-zz
    ZZ: [
      {
        aaaid: "zz1",
        hxpos: "-3245",
        name: "",
        type: "GPZ(2009)4GD",
        xxk: "50,30,30",
        zxckx: "BK0",
        zxpos: "550"
      },
      {
        aaaid: "zz2",
        hxpos: "3245",
        name: "",
        type: "GPZ(2009)4DX-100",
        xxk: "50,30,30",
        zxckx: "BK0",
        zxpos: "550"
      },
      {
        aaaid: "zz3",
        hxpos: "-3245",
        name: "",
        type: "GPZ(2009)4DX-100",
        xxk: "50,30,30",
        zxckx: "BK1",
        zxpos: "-550"
      },
      {
        aaaid: "zz4",
        hxpos: "3245",
        name: "",
        type: "GPZ(2009)4SX-100",
        xxk: "50,30,30",
        zxckx: "BK1",
        zxpos: "-550"
      }
    ],
  }; // defaultExportJSON ending

  defaultHtszJSON = {
    HTBL: [
      {
        aaaid: "z",
        mean: "主要材料汇总表",
        note: "",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "zhlzpm",
        mean: "组合梁总体布置图",
        note: "平面",
        scale: "120",
        draw: "true",
      },
      {
        aaaid: "zhlzlm",
        mean: "组合梁总体布置图",
        note: "立面",
        scale: "120",
        draw: "true",
      },
      {
        aaaid: "zhlzdm",
        mean: "组合梁总体布置图",
        note: "断面",
        scale: "40",
        draw: "true",
      },
      {
        aaaid: "zhlzdy",
        mean: "组合梁总体布置图",
        note: "大样",
        scale: "20",
        draw: "true",
      },
      {
        aaaid: "xlzpm",
        mean: "箱梁总体布置图",
        note: "平面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "xlzlm",
        mean: "箱梁总体布置图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "hgxdm",
        mean: "钢梁横膈系构造图",
        note: "断面",
        scale: "30",
        draw: "false",
      },
      {
        aaaid: "hgxdy",
        mean: "钢梁横膈系构造图",
        note: "大样",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "hgxdy1",
        mean: "钢梁横膈系构造图",
        note: "局部大样",
        scale: "10",
        draw: "false",
      },
      {
        aaaid: "gdljdm",
        mean: "箱梁工地连接构造图",
        note: "断面",
        scale: "30",
        draw: "false",
      },
      {
        aaaid: "gdljdy",
        mean: "箱梁工地连接构造图",
        note: "大样",
        scale: "15",
        draw: "false",
      },
      {
        aaaid: "gcljdm",
        mean: "箱梁工厂连接构造图",
        note: "断面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "gcljsty",
        mean: "箱梁工厂连接构造图",
        note: "示意图",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "zdhldm",
        mean: "支点横梁构造图",
        note: "断面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "zdhldy",
        mean: "支点横梁构造图",
        note: "大样",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "zjhldm",
        mean: "中间横梁构造图",
        note: "断面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "zjhldy",
        mean: "中间横梁构造图",
        note: "大样",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "x",
        mean: "箱梁板件焊接连接构造图",
        note: "",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "tjgblm",
        mean: "钢主梁支座调节钢板构造图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "tjgbdy",
        mean: "钢主梁支座调节钢板构造图",
        note: "大样",
        scale: "25",
        draw: "false",
      },
      {
        aaaid: "ygdlm",
        mean: "箱梁预拱度示意图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "pspm",
        mean: "箱梁排水构造图",
        note: "平面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "psdm",
        mean: "箱梁排水构造图",
        note: "断面",
        scale: "10",
        draw: "false",
      },
      {
        aaaid: "psdy",
        mean: "箱梁排水构造图",
        note: "大样",
        scale: "5",
        draw: "false",
      },
      {
        aaaid: "jxmlm",
        mean: "箱梁检修门构造图",
        note: "立面",
        scale: "10",
        draw: "false",
      },
      {
        aaaid: "jxmxt",
        mean: "箱梁检修门构造图",
        note: "详图",
        scale: "5",
        draw: "false",
      },
      {
        aaaid: "jxmdy",
        mean: "箱梁检修门构造图",
        note: "大样",
        scale: "5",
        draw: "false",
      },
      {
        aaaid: "zzbzpm",
        mean: "箱梁支座布置图",
        note: "平面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jldpm",
        mean: "钢梁剪力钉布置图",
        note: "平面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jldlm",
        mean: "钢梁剪力钉布置图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jlddm",
        mean: "钢梁剪力钉布置图",
        note: "断面",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "jldpm",
        mean: "钢梁剪力钉布置图",
        note: "平面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jldlm",
        mean: "钢梁剪力钉布置图",
        note: "立面",
        scale: "120",
        draw: "false",
      },
      {
        aaaid: "jlddm",
        mean: "钢梁剪力钉布置图",
        note: "断面",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "qmbgjlm",
        mean: "桥面板钢筋构造图",
        note: "立面",
        scale: "20",
        draw: "false",
      },
      {
        aaaid: "qmbgjdm",
        mean: "桥面板钢筋构造图",
        note: "断面",
        scale: "40",
        draw: "false",
      },
      {
        aaaid: "qmbgjdy",
        mean: "桥面板钢筋构造图",
        note: "大样",
        scale: "20",
        draw: "false",
      }
    ]
  }; // defaultHtszJSON ending
}
