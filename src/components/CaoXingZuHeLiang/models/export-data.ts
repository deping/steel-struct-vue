export class BJ { // table-hgxbjxbsj
  aaaid!: string; // 编号
 // 编号
  bj!: string; // 类型
 // 类型
  d!: string; // 板厚
 // 板厚
  dw1!: string; // 定位一
 // 定位一
  dw2!: string; // 定位二
 // 定位二
  ghk!: string; // 过焊孔
 // 过焊孔
  jm!: string; // 空
 // 空
  kk!: string; // 开孔
 // 开孔
  l!: string; // 空
 // 空
  lj!: string; // 零件
 // 零件
  mat!: string; // 材料
 // 材料
  name!: string; // 名称
 // 名称
  note!: string; // 备注
 // 备注
  reserve!: string; // 空
 // 空
  splitedBy!: string; // 被某板件分割
 // 被某板件分割
  w!: string; // 板宽
 // 板宽
}

export class GJ { // table-GJ
  aaaid!: string; // 钢筋名称
 // 钢筋名称
  d!: string; // 钢筋直径
 // 钢筋直径
  djl!: string; // 边距（中心到边）
 // 边距（中心到边）
  djr!: string; // 边距（中心到边）
 // 边距（中心到边）
  s!: string; // 纵向间距
 // 纵向间距
  sb!: string; // 横向间距
 // 横向间距
  sm!: string; // 横向间距、间隔
 // 横向间距、间隔
  sz!: string; // 边距（中心到边）
 // 边距（中心到边）
  type!: string; // 钢种
 // 钢种
  wg!: string; // 弯钩长度
 // 弯钩长度
  '锚固长度': string; // 锚固长度
}

export class HGX { // table-hgxsj
  aaaid!: string; // 编号
 // 编号
  allBJ!: string; // 对应板件
 // 对应板件
  oriDH!: string; // 类型
 // 类型
}

export class JXK { // table-jxk
  aaaid!: string; // 'jxk' + 索引号
  // 'jxk' + 索引号
  hxCKX!: string; // 根据type（位置）决定，位置为底板则为'DB'，为腹板则为'XLCen' + 横向竖向布置参考线索引号
 // 根据type（位置）决定，位置为底板则为'DB'，为腹板则为'XLCen' + 横向竖向布置参考线索引号
  hxPos!: string; // 横向布置
 // 横向布置
  matIndex!: string; // 类型
 // 类型
  type!: string; // 位置
 // 位置
  zxCKX!: string; // 'BK' + 纵向布置参考线索引号
 // 'BK' + 纵向布置参考线索引号
  zxPos!: string; // 纵向布置
 // 纵向布置
}

export class MAIN {
  aaak!: string;
  v!: string;
}

export class XSK { // table-xsk
  aaaid!: string; // 'xsk' + 索引号
 // 'xsk' + 索引号
  ckFB!: string; // 'FB' + 横向索引腹板线索引号
 // 'FB' + 横向索引腹板线索引号
  ckHGX!: string; // 'HGB' + 纵向索引横隔系索引号
 // 'HGB' + 纵向索引横隔系索引号
  hpos!: string; // 横向布置
 // 横向布置
  matIndex!: string; // 'XSK' + 类型索引号
 // 'XSK' + 类型索引号
  ysbPos!: string; // 引水板定位
 // 引水板定位
  zpos!: string; // 纵向布置
 // 纵向布置
}

export class ZXJJL { // table-dbzxjjlbz、table-fbzxjjlbz
  aaaid!: string; // 空
 // 空
  ckx!: string; // 'XLCen' + 位置索引号（table-dbzxjjlbz）或 'FB' + 位置索引号（table-fbzxjjlbz）
 // 'XLCen' + 位置索引号（table-dbzxjjlbz）或 'FB' + 位置索引号（table-fbzxjjlbz）
  lay!: string; // 横桥向布置（table-dbzxjjlbz）或 竖向布置（table-fbzxjjlbz）
 // 横桥向布置（table-dbzxjjlbz）或 竖向布置（table-fbzxjjlbz）
  matIndex!: string; // 'ZXJJL' + 类型索引号
 // 'ZXJJL' + 类型索引号
  region!: string; // 纵桥向布置
 // 纵桥向布置
  type!: string; // 2（table-dbzxjjlbz）或1（table-fbzxjjlbz）
 // 2（table-dbzxjjlbz）或1（table-fbzxjjlbz）
  hd!: string;
  lh!: string;
}

export class ZXJT { // table-gljdbz
  aaaid!: string; // 空
 // 空
  dblj!: string; // 底板连接
 // 底板连接
  dbzllj!: string; // 底板纵肋连接
 // 底板纵肋连接
  dist!: string; // 钢梁阶段划分
 // 钢梁阶段划分
  fblj!: string; // 腹板连接
 // 腹板连接
  name!: string; // 接头名称
 // 接头名称
  zxckx!: string; // 纵向参考线（值为DLX）
 // 纵向参考线（值为DLX）
}

export class ZZ { // table-zz
  aaaid!: string; // 编号
 // 编号
  hxpos!: string; // 横向定位
 // 横向定位
  name!: string; // 空
 // 空
  type!: string; // 支座类型
 // 支座类型
  xxk!: string; // 楔形孔
 // 楔形孔
  zxckx!: string; // 定位参考线
 // 定位参考线
  zxpos!: string; // 纵向定位
 // 纵向定位
}

export class ExportData {
  BJ!: BJ[]; // table-hgxbjxbsj
 // table-hgxbjxbsj
  GJ!: GJ[]; // table-GJ
 // table-GJ
  HGX!: HGX[]; // table-hgxsj
 // table-hgxsj
  JXK!: JXK[]; // table-jxk
 // table-jxk
  MAIN!: MAIN[];
  XSK!: XSK[]; // table-xsk
 // table-xsk
  ZXJJL!: ZXJJL[]; // table-dbzxjjlbz、table-fbzxjjlbz
 // table-dbzxjjlbz、table-fbzxjjlbz
  ZXJT!: ZXJT[]; // table-gljdbz
 // table-gljdbz
  ZZ!: ZZ[]; // table-zz
 // table-zz
}

export class subHGX {
  aaaname!: string;
  color!: string;
  lineGap!: string;
  nameAngle!: string;
  nameX!: string;
  nameY!: string;
  showName!: string;
  x1!: string;
  x2!: string;
  y1!: string;
  y2!: string;
}

export class HGXData {
  [prop: string]: subHGX[];
}

export class HTBL {
  aaaid!: string;
  mean!: string;
  note!: string;
  scale!: string;
  draw!: string;
}

export class LJK {
  // 1表示已添加到deserialize()
  // 1表示已添加到deserialize()
  steelbarGj!: string[]; // 钢筋：暂时不用
 // 钢筋：暂时不用
  steelplateGb!: string[]; // 1钢板：form-bzdmsj-钢梁材质
 // 1钢板：form-bzdmsj-钢梁材质
  drainHoleXsk!: string[]; // 1泄水孔：table-xsk
 // 1泄水孔：table-xsk
  manholeJxk!: string[]; // 1检修孔：table-jxk
 // 1检修孔：table-jxk
  verticalStiffenerSxjjl!: string[]; // 竖向加劲肋：横隔系-类型为SXJJL
 // 竖向加劲肋：横隔系-类型为SXJJL
  stiffeningRibAZxjjlkk!: string[]; // 纵向加劲肋开孔：横隔系-开孔
 // 纵向加劲肋开孔：横隔系-开孔
  stiffeningRibBZxjjl!: string[]; // 1纵向加劲肋：table-dbzxjjlbz-类型
 // 1纵向加劲肋：table-dbzxjjlbz-类型
  transverseDiaphragmHgb!: string[]; // 横隔板：横隔系-类型为HGB
 // 横隔板：横隔系-类型为HGB
  spjbbjSpjbbj!: string[]; // 水平渐变板件：横隔系-类型为HLB
 // 水平渐变板件：横隔系-类型为HLB
  manholeRk!: string[]; // 人孔：横隔系-类型为RK
 // 人孔：横隔系-类型为RK
  connectorAZxljj!: string[]; // 1纵向连接件：table-gljdbz-腹板连接、底板连接、底板纵肋连接
 // 1纵向连接件：table-gljdbz-腹板连接、底板连接、底板纵肋连接
  connectorBHxljj!: string[]; // 横向连接件：横隔系-类型为LJJ
 // 横向连接件：横隔系-类型为LJJ
  boltLs!: string[]; // 螺栓：暂时不用
 // 螺栓：暂时不用
  shearStudsJld!: string[]; // 1剪力钉：table-jld-两张表 类型
 // 1剪力钉：table-jld-两张表 类型
  seatSeat!: string[]; // 1支座：table-zz-支座类型
 // 1支座：table-zz-支座类型
  expansionJointSsf!: string[]; // 1伸缩缝：table-bk-伸缩缝
 // 1伸缩缝：table-bk-伸缩缝
  concreteHnt!: string[]; // 1混凝土：form-bzdmsj-桥面板材质
 // 1混凝土：form-bzdmsj-桥面板材质
  guardrailhl!: string[]; // 护栏：form-qmys-改为2下拉框2输入框（宽度）
 // 护栏：form-qmys-改为2下拉框2输入框（宽度）
}