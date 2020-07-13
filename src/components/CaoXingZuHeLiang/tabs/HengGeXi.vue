<template>
  <div style="margin:20px 0 0 10px;overflow-x:hidden">
    <div style="width:calc(100% - 10px)">
      <!-- 腹板竖肋设计Table 只读-->
      <h3 align="left">腹板竖肋设计</h3>
      <el-table :data="entries" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-table border :data="fbslform[props.row.sllx]">
              <el-table-column label="腹板竖肋厚度FSt（mm）" prop="fbslhdFSt"></el-table-column>
              <el-table-column label="腹板竖肋宽度FSb（mm）" prop="fbslkdFSb"></el-table-column>
              <el-table-column label="R1（mm）" prop="R1"></el-table-column>
              <el-table-column label="b（mm）" prop="b" v-if="isI1"></el-table-column>
              <el-table-column label="R2（mm）" prop="R2" v-else></el-table-column>
              <el-table-column label="JL（mm）" prop="JL" v-if="isI1"></el-table-column>
              <el-table-column label="hf1（mm）" prop="hf1"></el-table-column>
              <el-table-column label="hf2（mm）" prop="hf2"></el-table-column>
              <el-table-column label="hf3（mm）" prop="hf3" v-if="!isI1"></el-table-column>
              <el-table-column label="下部倒角" v-if="isI1">
                <template v-slot="scope">
                  <el-select v-model="scope.row.xbdjselectvalue" disabled>
                    <el-option v-for="(item,index) in xbdjselect" :key="index" :label="item" :value="index"></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="钢梁名称" width="180">
          <template v-slot="glmc">
            <el-input v-model="glmc.row.glmc" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="翼缘板厚度（mm）" width="180">
          <template v-slot="yybhd">
            <el-input type="number" v-model="yybhd.row.yybhd" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="腹板厚度（mm）">
          <template v-slot="fbhd">
            <el-input type="number" v-model="fbhd.row.fbhd" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="底板厚度（mm）">
          <template v-slot="dbhd">
            <el-input type="number" v-model="dbhd.row.dbhd" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="竖肋编号" width="400px">
          <template v-slot="slbh">
            <el-input v-model="slbh.row.slbh" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="竖肋类型">
          <template v-slot="sllx">
            <el-select v-model="sllx.row.sllx">
              <el-option v-for="(item,index) in sllxList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <!-- 腹板竖肋类型Table 读写-->
      <div style="margin-top:20px; ">
        <div align="left" style="margin: 0 0 10px 10px; ">
          <label style="margin-right:10px">腹板竖肋类型</label>
          <el-select v-model="fbslselectvalue" @change="fbslchange">
            <el-option v-for="(item,index) in sllxList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div ref="shuLeiXingHaoForm" id="shuLeiXingHaoForm">
          <el-table border :data="fbslform[fbslselectvalue]" style="width:100%">
            <el-table-column label="腹板竖肋厚度FSt（mm）" prop="fbslhdFSt">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.fbslhdFSt"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="腹板竖肋宽度FSb（mm）" prop="fbslkdFSb">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.fbslkdFSb"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="R1（mm）" prop="R1">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.R1"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="b（mm）" prop="b" v-if="isI1">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.b"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="R2（mm）" prop="R2" v-else>
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.R2"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="JL（mm）" prop="JL" v-if="isI1">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.JL"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="hf1（mm）" prop="hf1">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.hf1"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="hf2（mm）" prop="hf2">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.hf2"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="hf3（mm）" prop="hf3" v-if="!isI1">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.hf3"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="下部倒角" v-if="isI1">
              <template v-slot="scope">
                <el-select v-model="scope.row.xbdjselectvalue">
                  <el-option v-for="(item,index) in xbdjselect" :key="index" :label="item" :value="index"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 中间横隔（HG）设计 -->
      <div>
        <!-- 中间横隔Table 只读-->
        <div>
          <h3 align="left">中间横隔（HG）设计</h3>
          <el-table :data="entry" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
            <el-table-column type="expand">
              <template v-slot="props">
                <el-table border :data="hglxform[props.row.hglx]">
                  <el-table-column label="HGt（mm）" prop="HGt"></el-table-column>
                  <el-table-column label="H1（mm）" prop="H1"></el-table-column>
                  <el-table-column label="b（mm）" prop="b"></el-table-column>
                  <el-table-column label="R（mm）" prop="R"></el-table-column>
                  <el-table-column label="DBZ（mm）" prop="DBZ"></el-table-column>
                  <el-table-column label="DBY（mm）" prop="DBY"></el-table-column>
                  <el-table-column label="DBb（mm）" prop="DBb"></el-table-column>
                  <el-table-column label="DBt（mm）" prop="DBt"></el-table-column>
                  <el-table-column label="人孔中心线位置" prop="rkzxxwz"></el-table-column>
                  <el-table-column label="顶板顶缘线" width="160px">
                    <template v-slot="scope">
                      <el-select v-model="scope.row.dbdyxselectvalue" disabled>
                        <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="翼缘板和腹板交角处的过焊孔R（mm）" prop="yyb_fb_R"></el-table-column>
                  <el-table-column label="翼缘板和腹板交角处的过焊孔D（mm）" prop="yyb_fb_D"></el-table-column>
                  <el-table-column label="底板和腹板交角处的过焊孔R（mm）" prop="db_fb_R"></el-table-column>
                  <el-table-column label="底板和腹板交角处的过焊孔D（mm）" prop="db_fb_D"></el-table-column>
                </el-table>
                <el-form :v-model="rklxform[props.row.rklx][0]">
                  <h4>人孔参数表</h4>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="H（mm）">
                        <span>{{rklxform[props.row.rklx][0].H}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"
                            v-if="props.row.rklx === 'C型' ||props.row.rklx === 'D型' ||props.row.rklx === 'F型' ||props.row.rklx === 'G型'">
                      <el-form-item label="RKD（mm）">
                        <span>{{rklxform[props.row.rklx][0].RKD}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'F型' ||props.row.rklx === 'G型'">
                      <el-form-item label="H1（mm）">
                        <span>{{rklxform[props.row.rklx][0].H1}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'D型' ">
                      <el-form-item label="B1（mm）">
                        <span>{{rklxform[props.row.rklx][0].B1}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"
                            v-if="props.row.rklx === 'A型' ||  props.row.rklx === 'B型' ||  props.row.rklx === 'E型'">
                      <el-form-item label="RKH（mm）">
                        <span>{{rklxform[props.row.rklx][0].RKH}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"
                            v-if="props.row.rklx === 'A型'||  props.row.rklx === 'B型' ||  props.row.rklx === 'E型'">
                      <el-form-item label="RKB（mm）">
                        <span>{{rklxform[props.row.rklx][0].RKB}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型' ||  props.row.rklx === 'B型' ">
                      <el-form-item label="RKR（mm）">
                        <span>{{rklxform[props.row.rklx][0].RKR}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型' ||  props.row.rklx === 'B型' ">
                      <el-form-item label="人孔上缘线丶下缘线">
                        <el-select v-model="rklxform[props.row.rklx][0].rksxyx" disabled>
                          <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div v-if="props.row.rklx === 'A型'">
                    <h4>W1丶W2围板参数表</h4>
                  </div>
                  <div v-else>
                    <h4>W1围板参数表</h4>
                  </div>
                  <el-row>
                    <el-col :span="6" v-if="props.row.rklx === 'A型' || props.row.rklx === 'B型' ">
                      <el-form-item label="H1（mm）">
                        <span>{{rklxform[props.row.rklx][0].H1}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="B1（mm）" v-if="props.row.rklx === 'A型' || props.row.rklx === 'B型' ">
                        <span>{{rklxform[props.row.rklx][0].B1}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型'">
                      <el-form-item label="B2（mm）">
                        <span>{{rklxform[props.row.rklx][0].B2}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型' || props.row.rklx === 'B型' ">
                      <el-form-item label="W1t（mm）">
                        <span>{{rklxform[props.row.rklx][0].W1t}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型' || props.row.rklx === 'B型' ">
                      <el-form-item label="W1b（mm）">
                        <span>{{rklxform[props.row.rklx][0].W1b}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型'">
                      <el-form-item label="W2t（mm）">
                        <span>{{rklxform[props.row.rklx][0].W2t}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型'">
                      <el-form-item label="W2b（mm）">
                        <span>{{rklxform[props.row.rklx][0].W2b}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"
                            v-if="props.row.rklx === 'C型' || props.row.rklx === 'D型' || props.row.rklx === 'E型' || props.row.rklx === 'F型' ||props.row.rklx === 'G型'">
                      <el-form-item label="RKt（mm）">
                        <span>{{rklxform[props.row.rklx][0].RKt}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"
                            v-if="props.row.rklx === 'C型' || props.row.rklx === 'D型' || props.row.rklx === 'E型' || props.row.rklx === 'F型' ||props.row.rklx === 'G型'">
                      <el-form-item label="RKb（mm）">
                        <span>{{rklxform[props.row.rklx][0].RKb}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"
                            v-if="props.row.rklx === 'A型' || props.row.rklx === 'B型' || props.row.rklx === 'E型'">
                      <el-form-item label="R1（mm）">
                        <span>{{rklxform[props.row.rklx][0].R1}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="hf1（mm）">
                        <span>{{rklxform[props.row.rklx][0].hf1}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型' ||props.row.rklx === 'G型'">
                      <el-form-item label="hf2（mm）">
                        <span>{{rklxform[props.row.rklx][0].hf2}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'A型' || props.row.rklx === 'B型'">
                      <el-form-item width="160px">
                        <span slot="label" v-if="props.row.rklx === 'A型'">W1、W2围板设置</span>
                        <span slot="label" v-else>W1围板设置</span>
                        <el-select v-model="rklxform[props.row.rklx][0].wbsz" style="width:50%" disabled>
                          <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="props.row.rklx === 'E型'">
                      <el-form-item label="人孔上缘线丶下缘线">
                        <el-select v-model="rklxform[props.row.rklx][0].rksxyx" disabled>
                          <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div>
                    <div v-if="props.row.rklx === 'B型' || props.row.rklx === 'C型'">
                      <h4>J1加劲板参数表</h4>
                    </div>
                    <el-row>
                      <el-col :span="6" v-if="props.row.rklx === 'C型'">
                        <el-form-item label="BZ">
                          <span>{{rklxform[props.row.rklx][0].BZ}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6" v-if="props.row.rklx === 'C型'">
                        <el-form-item label="BY">
                          <span>{{rklxform[props.row.rklx][0].BY}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6" v-if="props.row.rklx === 'B型' || props.row.rklx === 'C型'">
                        <el-form-item label="J1t">
                          <span>{{rklxform[props.row.rklx][0].J1t}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6" v-if="props.row.rklx === 'B型' || props.row.rklx === 'C型'">
                        <el-form-item label="J1b（mm）">
                          <span>{{rklxform[props.row.rklx][0].J1b}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6" v-if="props.row.rklx === 'B型' || props.row.rklx === 'C型'">
                        <el-form-item label="J1Y">
                          <span>{{rklxform[props.row.rklx][0].J1Y}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6" v-if="props.row.rklx === 'B型' || props.row.rklx === 'C型'">
                        <el-form-item label="J1D">
                          <span>{{rklxform[props.row.rklx][0].J1D}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6" v-if="props.row.rklx === 'B型' || props.row.rklx === 'C型'">
                        <el-form-item label="hf2">
                          <span>{{rklxform[props.row.rklx][0].hf2}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6" v-if="props.row.rklx === 'B型' || props.row.rklx === 'C型'">
                        <el-form-item label="J1关于横隔">
                          <el-select v-model="rklxform[props.row.rklx][0].j1GYHG" disabled>
                            <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div v-if="props.row.rklx === 'C型'">
                      <h4>J2加劲板参数表</h4>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="J2t">
                            <span>{{rklxform[props.row.rklx][0].J2t}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="J2b">
                            <span>{{rklxform[props.row.rklx][0].J2b}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="J2Y">
                            <span>{{rklxform[props.row.rklx][0].J2Y}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="hf2">
                            <span>{{rklxform[props.row.rklx][0].hf22}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="J2关于横隔">
                            <el-select v-model="rklxform[props.row.rklx][0].j2gyhg" disabled>
                              <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="props.row.rklx === 'C型'">
                      <h4>J3加劲板参数表</h4>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="J3t">
                            <span>{{rklxform[props.row.rklx][0].J3t}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="J3b">
                            <span>{{rklxform[props.row.rklx][0].J3b}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="J3D">
                            <span>{{rklxform[props.row.rklx][0].J3D}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="hf3">
                            <span>{{rklxform[props.row.rklx][0].hf23}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="J3关于横隔">
                            <el-select v-model="rklxform[props.row.rklx][0].j3gyhg" disabled>
                              <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="钢梁名称" width="180">
              <template v-slot="glmc">
                <el-input v-model="glmc.row.glmc" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="翼缘板厚度（mm）" width="180">
              <template v-slot="yybhd">
                <el-input type="number" v-model="yybhd.row.yybhd" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="腹板厚度（mm）">
              <template v-slot="fbhd">
                <el-input type="number" v-model="fbhd.row.fbhd" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="底板厚度（mm）">
              <template v-slot="dbhd">
                <el-input type="number" v-model="dbhd.row.dbhd" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="斜交角（度）">
              <template v-slot="xjjd">
                <el-input type="number" v-model="xjjd.row.xjjd" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="横隔编号" width="400px">
              <template v-slot="hgbh">
                <el-input v-model="hgbh.row.hgbh" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="横隔类型">
              <template v-slot="hglx">
                <el-select v-model="hglx.row.hglx">
                  <el-option v-for="(item,index) in hglxList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="人孔类型">
              <template v-slot="rklx">
                <el-select v-model="rklx.row.rklx">
                  <el-option v-for="(item,index) in rklxList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 中间横隔Table 读写-->
        <div style="margin-top:20px; ">
          <!-- 横隔类型模板 -->
          <div>
            <div align="left" style="margin: 0 0 10px 10px; ">
              <label style="margin-right:10px">横隔类型</label>
              <el-select v-model="zjhgselectvalue" @change="hglxchange">
                <el-option v-for="(item,index) in hglxList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div ref="zhongJianHengGeTable" id="zhongJianHengGeTable">
              <el-table border :data="hglxform[zjhgselectvalue]" style="width:100%">
                <el-table-column label="HGt（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.HGt"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="H1（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.H1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="b（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.b"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="R（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.R"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="DBZ（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.DBZ"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="DBY（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.DBY"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="DBb（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.DBb"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="DBt（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.DBt"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="人孔中心线位置">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.rkzxxwz"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="顶板顶缘线" width="160px">
                  <template v-slot="scope">
                    <el-select v-model="scope.row.dbdyxselectvalue">
                      <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="翼缘板和腹板交角处的过焊孔R（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.yyb_fb_R"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="翼缘板和腹板交角处的过焊孔D（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.yyb_fb_D"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="底板和腹板交角处的过焊孔R（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.db_fb_R"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="底板和腹板交角处的过焊孔D（mm）">
                  <template v-slot="scope">
                    <el-input type="number" v-model="scope.row.db_fb_D"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 人孔类型模板 -->
          <div>
            <div align="left" style="margin: 10px 0 10px 10px; ">
              <label style="margin-right:10px">人孔类型</label>
              <el-select v-model="rklxselectvalue" @change="rklxchange">
                <el-option v-for="(item,index) in rklxList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div ref="renKongLeiXingTable" id="renKongLeiXingTable" align="left">
              <el-form :v-model="rklxform[rklxselectvalue][0]">
                <h4>人孔参数表</h4>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="H（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].H" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                          v-if="rklxselectvalue === 'C型' ||rklxselectvalue === 'D型' ||rklxselectvalue === 'F型' ||rklxselectvalue === 'G型'">
                    <el-form-item label="RKD（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].RKD" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'F型' ||rklxselectvalue === 'G型'">
                    <el-form-item label="H1（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].H1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'D型' ">
                    <el-form-item label="B1（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].B1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                          v-if="rklxselectvalue === 'A型' ||  rklxselectvalue === 'B型' ||  rklxselectvalue === 'E型'">
                    <el-form-item label="RKH（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].RKH" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                          v-if="rklxselectvalue === 'A型'||  rklxselectvalue === 'B型' ||  rklxselectvalue === 'E型'">
                    <el-form-item label="RKB（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].RKB" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型' ||  rklxselectvalue === 'B型' ">
                    <el-form-item label="RKR（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].RKR" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型' ||  rklxselectvalue === 'B型' ">
                    <el-form-item label="人孔上缘线丶下缘线">
                      <el-select v-model="rklxform[rklxselectvalue][0].rksxyx">
                        <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div v-if="rklxselectvalue === 'A型'">
                  <h4>W1丶W2围板参数表</h4>
                </div>
                <div v-else>
                  <h4>W1围板参数表</h4>
                </div>
                <el-row>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型' || rklxselectvalue === 'B型' ">
                    <el-form-item label="H1（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].H1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="B1（mm）" v-if="rklxselectvalue === 'A型' || rklxselectvalue === 'B型' ">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].B1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型'">
                    <el-form-item label="B2（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].B2" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型' || rklxselectvalue === 'B型' ">
                    <el-form-item label="W1t（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].W1t" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型' || rklxselectvalue === 'B型' ">
                    <el-form-item label="W1b（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].W1b" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型'">
                    <el-form-item label="W2t（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].W2t" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型'">
                    <el-form-item label="W2b（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].W2b" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                          v-if="rklxselectvalue === 'C型' || rklxselectvalue === 'D型' || rklxselectvalue === 'E型' || rklxselectvalue === 'F型' ||rklxselectvalue === 'G型'">
                    <el-form-item label="RKt（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].RKt" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                          v-if="rklxselectvalue === 'C型' || rklxselectvalue === 'D型' || rklxselectvalue === 'E型' || rklxselectvalue === 'F型' ||rklxselectvalue === 'G型'">
                    <el-form-item label="RKb（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].RKb" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                          v-if="rklxselectvalue === 'A型' || rklxselectvalue === 'B型' || rklxselectvalue === 'E型'">
                    <el-form-item label="R1（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].R1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="hf1（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].hf1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型' ||rklxselectvalue === 'G型'">
                    <el-form-item label="hf2（mm）">
                      <el-input type="number" v-model="rklxform[rklxselectvalue][0].hf2" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'A型' || rklxselectvalue === 'B型'">
                    <el-form-item width="160px">
                      <span slot="label" v-if="rklxselectvalue === 'A型'">W1、W2围板设置</span>
                      <span slot="label" v-else>W1围板设置</span>
                      <el-select v-model="rklxform[rklxselectvalue][0].wbsz" style="width:50%">
                        <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rklxselectvalue === 'E型'">
                    <el-form-item label="人孔上缘线丶下缘线">
                      <el-select v-model="rklxform[rklxselectvalue][0].rksxyx">
                        <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div>
                  <div v-if="rklxselectvalue === 'B型' || rklxselectvalue === 'C型'">
                    <h4>J1加劲板参数表</h4>
                  </div>
                  <el-row>
                    <el-col :span="6" v-if="rklxselectvalue === 'C型'">
                      <el-form-item label="BZ">
                        <el-input type="number" v-model="rklxform[rklxselectvalue][0].BZ" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="rklxselectvalue === 'C型'">
                      <el-form-item label="BY">
                        <el-input type="number" v-model="rklxform[rklxselectvalue][0].BY" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="rklxselectvalue === 'B型' || rklxselectvalue === 'C型'">
                      <el-form-item label="J1t">
                        <el-input type="number" v-model="rklxform[rklxselectvalue][0].J1t" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="rklxselectvalue === 'B型' || rklxselectvalue === 'C型'">
                      <el-form-item label="J1b（mm）">
                        <el-input type="number" v-model="rklxform[rklxselectvalue][0].J1b" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="rklxselectvalue === 'B型' || rklxselectvalue === 'C型'">
                      <el-form-item label="J1Y">
                        <el-input type="number" v-model="rklxform[rklxselectvalue][0].J1Y" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="rklxselectvalue === 'B型' || rklxselectvalue === 'C型'">
                      <el-form-item label="J1D">
                        <el-input type="number" v-model="rklxform[rklxselectvalue][0].J1D" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="rklxselectvalue === 'B型' || rklxselectvalue === 'C型'">
                      <el-form-item label="hf2">
                        <el-input type="number" v-model="rklxform[rklxselectvalue][0].hf2" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="rklxselectvalue === 'B型' || rklxselectvalue === 'C型'">
                      <el-form-item label="J1关于横隔">
                        <el-select v-model="rklxform[rklxselectvalue][0].j1GYHG">
                          <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div v-if="rklxselectvalue === 'C型'">
                    <h4>J2加劲板参数表</h4>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="J2t">
                          <el-input type="number" v-model="rklxform[rklxselectvalue][0].J2t" style="width:50%">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="J2b">
                          <el-input type="number" v-model="rklxform[rklxselectvalue][0].J2b" style="width:50%">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="J2Y">
                          <el-input type="number" v-model="rklxform[rklxselectvalue][0].J2Y" style="width:50%">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="hf2">
                          <el-input type="number" v-model="rklxform[rklxselectvalue][0].hf22" style="width:50%">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="J2关于横隔">
                          <el-select v-model="rklxform[rklxselectvalue][0].j2gyhg">
                            <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="rklxselectvalue === 'C型'">
                    <h4>J3加劲板参数表</h4>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="J3t">
                          <el-input type="number" v-model="rklxform[rklxselectvalue][0].J3t" style="width:50%">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="J3b">
                          <el-input type="number" v-model="rklxform[rklxselectvalue][0].J3b" style="width:50%">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="J3D">
                          <el-input type="number" v-model="rklxform[rklxselectvalue][0].J3D" style="width:50%">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="hf3">
                          <el-input type="number" v-model="rklxform[rklxselectvalue][0].hf23" style="width:50%">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="J3关于横隔">
                          <el-select v-model="rklxform[rklxselectvalue][0].j3gyhg">
                            <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 箱间横联（HL）设计 -->
      <div>
        <div>
          <h3 align="left">箱间横联（HL）设计</h3>
          <el-table :data="entrie" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-form :v-model="dlslxform['单梁式']" v-if="scope.row.hllx==='单梁式'">
                  <h4>单梁式 横联（HL）参数表</h4>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="H（mm）：">
                        <span>{{dlslxform[scope.row.hllx].H}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="H1（mm）：">
                        {{dlslxform[scope.row.hllx].H1}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="B（mm）：">
                        {{dlslxform[scope.row.hllx].B}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="t1（mm）：">
                        {{dlslxform[scope.row.hllx].t1}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="t2（mm）：">
                        {{dlslxform[scope.row.hllx].t2}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="R（mm）：">
                        {{dlslxform[scope.row.hllx].R}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="hf1 ：">
                        {{dlslxform[scope.row.hllx].hf1}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="横联中心线">
                        <el-select v-model="dlslxform[scope.row.hllx].hlzxx" disabled>
                          <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <h4>J1参数表</h4>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="J1t（mm）：">
                        {{dlslxform[scope.row.hllx].J1t}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="J1b（mm）：">
                        {{dlslxform[scope.row.hllx].J1b}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="J1c（mm）：">
                        {{dlslxform[scope.row.hllx].J1c}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="b1（mm）：">
                        {{dlslxform[scope.row.hllx].b1}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="b2（mm）：">
                        {{dlslxform[scope.row.hllx].b2}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="R（mm）：">
                        {{dlslxform[scope.row.hllx].R1}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="hf2 ：">
                        {{dlslxform[scope.row.hllx].hf2}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="J1设置">
                        <el-select v-model="dlslxform[scope.row.hllx].J1sz" disabled>
                          <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="J1与横联顶、底板关系">
                        <el-select v-model="dlslxform[scope.row.hllx].J1sz" disabled>
                          <el-option v-for="(item,index) in j1csbList" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <h4>JJ参数表</h4>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="JJt（mm）：">
                        {{dlslxform[scope.row.hllx].JJt}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="JJb（mm）：">
                        {{dlslxform[scope.row.hllx].JJb}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="R（mm）：">
                        {{dlslxform[scope.row.hllx].R2}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="hf3 ：">
                        {{dlslxform[scope.row.hllx].hf3}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="JJ设置道数">
                        <el-select v-model="dlslxform[scope.row.hllx].JJszds" disabled>
                          <el-option v-for="(item,index) in JJszdsList" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="钢梁名称">
              <template v-slot="scope">
                <el-input v-model="scope.row.glmc" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="横隔编号">
              <template v-slot="scope">
                <el-input v-model="scope.row.hgbh" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="横联编号">
              <template v-slot="scope">
                <el-input v-model="scope.row.hlbh" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="横联类型">
              <template v-slot="scope">
                <el-select v-model="scope.row.hllx">
                  <el-option v-for="(item,index) in hllxList" :key="index" :label="item.label" :value="item.label"
                             :disabled="item.disabled"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div align="left" style="margin: 10px 0 10px 10px; ">
          <label style="margin-right:10px">横联类型</label>
          <el-select v-model="hllxselectvalue" @change="hllxchange">
            <el-option v-for="(item,index) in hllxList" :key="index" :label="item.label" :value="item.label"
                       :disabled="item.disabled">
            </el-option>
          </el-select>
        </div>
        <div ref="hengLianLeiXingForm" id="hengLianLeiXingForm" align="left">
          <el-form :v-model="dlslxform['单梁式']" v-if="hllxselectvalue==='单梁式'">
            <h4>单梁式 横联（HL）参数表</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="H（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].H" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="H1（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].H1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="B（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].B" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="t1（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].t1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="t2（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].t2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].R" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf1">
                  <el-input type="number" v-model="dlslxform['单梁式'].hf1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="横联中心线">
                  <el-select v-model="dlslxform['单梁式'].hlzxx">
                    <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <h4>J1参数表</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="J1t（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].J1t" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="J1b（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].J1b" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="J1c（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].J1c" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="b1（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].b1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="b2（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].b2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].R2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf2">
                  <el-input type="number" v-model="dlslxform['单梁式'].hf2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="J1设置">
                  <el-select v-model="dlslxform['单梁式'].J1sz">
                    <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="J1与横联顶、底板关系">
                  <el-select v-model="dlslxform['单梁式'].J1yhlddbgx">
                    <el-option v-for="(item,index) in j1csbList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <h4>JJ参数表</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="JJt（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].JJt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="JJb（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].JJb" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R（mm）">
                  <el-input type="number" v-model="dlslxform['单梁式'].R" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf3">
                  <el-input type="number" v-model="dlslxform['单梁式'].hf3" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="JJ设置道数">
                  <el-select v-model="dlslxform['单梁式'].JJszds">
                    <el-option v-for="(item,index) in JJszdsList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 支点横隔（ZDHG）设计 -->
      <div>
        <div>
          <h3 align="left">支点横隔（ZDHG）设计</h3>
          <el-table :data="entriesZDHG" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
            <el-table-column label="钢梁名称">
              <template v-slot="scope">
                <el-input v-model="scope.row.glmc" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="翼缘板厚度（mm）">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.yybhd" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="腹板厚度（mm）">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.fbhd" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="底板厚度（mm）">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.dbhd" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="斜交角（度）">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.xjj" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="支点横隔板编号">
              <template v-slot="scope">
                <el-input v-model="scope.row.zdhgbh" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="支座个数">
              <template v-slot="scope">
                <el-select v-model="scope.row.zzgs">
                  <el-option v-for="(item,index) in zzgsList" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="支承加劲肋类型">
              <template v-slot="scope">
                <el-select v-model="scope.row.zcjjllx">
                  <el-option v-for="(item,index) in zcjjllxList" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div align="left" style="margin: 10px 0 10px 10px; ">
          <label style="margin-right:10px">支座个数</label>
          <el-select v-model="zzgsselectvalue">
            <el-option v-for="(item,index) in zzgsList" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-form :v-model="zzgsform[zzgsselectvalue]">
            <el-row v-if="zzgsselectvalue === '单支座'">
              <el-col :span="6">
                <el-form-item label="支座位置（mm）">
                  <el-input type="number" v-model="zzgsform[zzgsselectvalue].zzwz" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="6">
                <el-form-item label="左侧支座位置（mm）">
                  <el-input type="number" v-model="zzgsform[zzgsselectvalue].zczzwz" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="右侧支座位置（mm）">
                  <el-input type="number" v-model="zzgsform[zzgsselectvalue].yczzwz" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div align="left" style="margin: 10px 0 10px 10px; ">
          <label style="margin-right:10px">支承加劲肋类型</label>
          <el-select v-model="zcjjllxselectvalue" @change="zcjjllxchange()">
            <el-option v-for="(item,index) in zcjjllxList" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div align="left" ref="zhiChengJiaJinLeiLeiXingForm" id="zhiChengJiaJinLeiLeiXingForm">
          <el-form :v-model="zcjjllxform[zcjjllxselectvalue]">
            <h4>支点横隔板的参数设置</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="ZDHGt（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].ZDHGt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="DBZ（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].DBZ" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="DBY（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].DBY" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="DBt（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].DBt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="顶板对齐方式">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].dbdqfs">
                    <el-option v-for="(item,index) in j1csbList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="顶板端部扩头参数设置">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].dbdbktcssz">
                    <el-option v-for="(item,index) in dbdbktcsszselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <h4>支承加劲板的参数设置</h4>
            <el-row>
              <h5 v-if="zcjjllxselectvalue==='ZC3'">CJ1的参数表</h5>
              <el-col :span="6">
                <el-form-item label="与隔板交角（度）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].ygbjjd" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="zcjjllxselectvalue==='ZC2'">
                <el-form-item label="CKZ（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CKZ" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="zcjjllxselectvalue==='ZC2'">
                <el-form-item label="CKY（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CKY" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="zcjjllxselectvalue==='ZC2'">
                <el-form-item label="CJt（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CJt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="zcjjllxselectvalue==='ZC2'">
                <el-form-item label="CJb（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CJb" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="zcjjllxselectvalue==='ZC3'">
                <el-form-item label="CJ1t（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CJ1t" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="zcjjllxselectvalue==='ZC3'">
                <el-form-item label="CJ1b（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CJ1b" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支承加劲板与顶板的关系">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].zcjjbydbdgx">
                    <el-option v-for="(item,index) in zcjjbydbdgxList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="D（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].D" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].R" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="b（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].b" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="h（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].h" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="zcjjllxselectvalue==='ZC3'">
              <el-row>
                <h5>CJ2的参数表</h5>
                <el-col :span="6">
                  <el-form-item label="与隔板交角（度）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].ygbjjd2" style="width:50%">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="CKZ（mm）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CKZ" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="CKY（mm）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CKY" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="CJ2t（mm）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CJ2t" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="CJ2b（mm）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].CJ2b" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="支承加劲板与顶板的关系">
                    <el-select v-model="zcjjllxform[zcjjllxselectvalue].zcjjbydbdgx2">
                      <el-option v-for="(item,index) in zcjjbydbdgxList" :key="index" :label="item" :value="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="D（mm）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].D2" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="R（mm）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].R2" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="b（mm）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].b2" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="h（mm）">
                    <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].h2" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <h4>临时支承的参数设置</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="LC设置">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].LCsz">
                    <el-option v-for="(item,index) in LCszList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="LC位置">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].LCwz">
                    <el-option v-for="(item,index) in LCwzList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="LC与隔板交角（度）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].LCygbjjd" style="width:50%">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="L2（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].L2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="LCt（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].LCt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="LCb（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].LCb" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="LCH（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].LCH" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="D（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].D3" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="b（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].b3" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="h（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].h3" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <h4>人孔的参数设置</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="人孔设置">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].rksz">
                    <el-option v-for="(item,index) in LCszList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="人孔位置">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].rkwz">
                    <el-option v-for="(item,index) in LCwzList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="L1（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].L1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="人孔类型">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].rklx">
                    <el-option v-for="(item,index) in rklxselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="检修门加劲板设置">
                  <el-select v-model="zcjjllxform[zcjjllxselectvalue].jxmjjbsz">
                    <el-option v-for="(item,index) in LCszList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="L1（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].L14" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="W1t（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].W1t" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="H（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].H" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="RKB（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].RKB" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="RKH（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].RKH" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R1（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].R1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R2（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].R2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="B1（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].B1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="B2（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].B2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="H1（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].H1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="H2（mm）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].H2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf1">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].hf1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <h4>支承加劲肋验算</h4>
            <el-row>
              <el-col :span="10">
                <el-form-item label="钢材的强度设计值（MPa）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].gcdqdsjz" style="width:50%">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="系数">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].xs" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="倍数">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].bs" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支座反力设计值（KN）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].zzflsjz" style="width:50%">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="承压面积（平方毫米）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].cymj" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="验算强度值（MPa）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].ysqdz" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <h4>临时支承验算</h4>
            <el-row>
              <el-col :span="8">
                <el-form-item label="钢材的强度设计值（MPa）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].gcdqdsjz2" style="width:50%">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="系数">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].xs2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="倍数">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].bs2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支座反力设计值（KN）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].zzflsjz2" style="width:50%">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="承压面积（平方毫米）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].cymj2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="验算强度值（MPa）">
                  <el-input type="number" v-model="zcjjllxform[zcjjllxselectvalue].ysqdz2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div align="left">
          <h3 align="left">承压区域底板纵肋帽孔设计</h3>
          <el-table :data="entriesCYQYDBZLMK" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
            <el-table-column label="钢梁名称">
              <template v-slot="scope">
                <el-input v-model="scope.row.glmc" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="底板纵肋编号">
              <template v-slot="scope">
                <el-input v-model="scope.row.dbzlbh" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="板肋型号">
              <template v-slot="scope">
                <el-select v-model="scope.row.blxh">
                  <el-option v-for="(item,index) in lbxhList" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="帽孔">
              <template v-slot="scope">
                <el-select v-model="scope.row.mk">
                  <el-option v-for="(item,index) in mkList" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 支点处横梁（ZDHL）设计 -->
      <div>
        <div>
          <h3 align="left">支点处横梁（ZDHL）设计</h3>
          <el-table :data="entriesZDHL" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }">
            <el-table-column label="钢梁名称">
              <template v-slot="scope">
                <el-input v-model="scope.row.glmc" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="横隔编号">
              <template v-slot="scope">
                <el-input v-model="scope.row.hgbh" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="横联编号">
              <template v-slot="scope">
                <el-input v-model="scope.row.hlbh" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="支点横梁类型">
              <template v-slot="scope">
                <el-select v-model="scope.row.zdhllx">
                  <el-option v-for="(item,index) in hllxList" :key="index" :label="item.label" :value="item.label"
                             :disabled="item.disabled">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="钢梁高度">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.glgd" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column label="斜交角（度）">
              <template v-slot="scope">
                <el-input type="number" v-model="scope.row.xjj" clearable></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top:10px">
          <el-form v-model="zdchlsjform">
            <el-row>
              <el-col :span="24">
                <el-form-item label="横梁腹板在翼缘板、主梁腹板交角处的过焊孔R（mm）">
                  <el-input type="number" v-model="zdchlsjform.HLFB_YYB_ZFB_R" style="width:50%">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="横梁腹板在横梁底板、主梁腹板交角处的过焊孔R（mm）">
                  <el-input type="number" v-model="zdchlsjform.HLFB_HLDB_ZLFB_R" style="width:50%">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="横梁顶板与翼缘板的过焊孔R（mm）">
                  <el-input type="number" v-model="zdchlsjform.HLDB_YYB_R" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div align="left" style="margin: 10px 0 10px 10px; ">
          <label style="margin-right:10px">支点横梁类型</label>
          <el-select v-model="zdchlsjselectvalue" @change="zdchlchange()">
            <el-option v-for="(item,index) in hllxList" :key="index" :label="item.label" :value="item.label"
                       :disabled="item.disabled">
            </el-option>
          </el-select>
        </div>
        <div align="left" ref="zhiDianChuHengLiangForm" id="zhiDianChuHengLiangForm">
          <el-form :v-model="zdchlform[zdchlsjselectvalue]">
            <el-row>
              <h4>支点横梁的参数设置</h4>
              <el-col :span="6">
                <el-form-item label="横梁高度H（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].hlgdH" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="DBZ（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].DBZ" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="DBY（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].DBY" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="t1（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].t1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="顶板对齐方式">
                  <el-select v-model="zdchlform[zdchlsjselectvalue].dbdqfs">
                    <el-option v-for="(item,index) in j1csbList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="横梁底板设置">
                  <el-select v-model="zdchlform[zdchlsjselectvalue].dbsz">
                    <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="B（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].B" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="t2（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].t2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="t3（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].t3" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf1">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].hf1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf2">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].hf2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf3">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].hf3" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf4">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].hf4" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <h4>支点横隔底板加劲肋的参数设置</h4>
              <el-col :span="6">
                <el-form-item label="底板加劲肋设置">
                  <el-select v-model="zdchlform[zdchlsjselectvalue].dbjjlsz">
                    <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="底板加劲肋与横梁底板关系">
                  <el-select v-model="zdchlform[zdchlsjselectvalue].dbjjlyhldbgx">
                    <el-option v-for="(item,index) in j1csbList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="横梁底板端部形式">
                  <el-select v-model="zdchlform[zdchlsjselectvalue].hldbdbxs">
                    <el-option v-for="(item,index) in hldbdbxsselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="J1在箱室内">
                  <el-select v-model="zdchlform[zdchlsjselectvalue].J1zxsn">
                    <el-option v-for="(item,index) in j1zxsnselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="J1t（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].J1t" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="J1b（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].J1b" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="J1c（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].J1c" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="b1（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].b1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="b2（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].b2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].R" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf2">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].hf22" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <div v-if="zdchlform[zdchlsjselectvalue].hldbdbxs === 1">
                <el-col :span="24">
                  <h4 align="left">底板端部扩头参数</h4>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="L（mm）">
                    <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].LQKT" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="k1（mm）">
                    <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].k1QKT" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="k2（mm）">
                    <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].k2QKT" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="b1（mm）">
                    <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].b1QKT" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="R（mm）">
                    <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].RQKT" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
            <el-row>
              <h4>支点横梁顶板端部扩头参数设置</h4>
              <el-col :span="6">
                <el-form-item label="顶板端部扩头设置">
                  <el-select v-model="zdchlform[zdchlsjselectvalue].dbdbktsz">
                    <el-option v-for="(item,index) in dbdbktszselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="L（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].L" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="k1（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].k1" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="k2（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].k2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="b1（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].b13" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].R3" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <h3 align="left">支点横梁腹板加劲肋设计</h3>
            <el-row>
              <h4>SL加劲板的参数设置</h4>
              <el-col :span="6">
                <el-form-item label="SL设置道数">
                  <el-select v-model="zdchlform[zdchlsjselectvalue].SLszds">
                    <el-option v-for="(item,index) in JJszdsList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="SLt（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].SLt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="SLb（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].SLb" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="R（mm）">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].RSL" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf3">
                  <el-input type="number" v-model="zdchlform[zdchlsjselectvalue].hf3SL" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <h4>VLS加劲板的参数设置</h4>
              <el-col :span="6">
                <el-form-item label="VLS加劲板设置">
                  <el-select v-model="vLSData.VLSjjbsz">
                    <el-option v-for="(item,index) in vLSjjbszselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <div v-if="vLSData.VLSjjbsz !== 2">
                <el-col :span="6">
                  <el-form-item label="VLS加劲板坡度">
                    <el-select v-model="vLSData.VLSjjbpd">
                      <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="HS（mm）">
                    <el-input type="number" v-model="vLSData.HS" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="VLt（mm）">
                    <el-input type="number" v-model="vLSData.VLt" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="VLb（mm）">
                    <el-input type="number" v-model="vLSData.VLb" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="L1（mm）">
                    <el-input type="number" v-model="vLSData.L1" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="b（mm）">
                    <el-input type="number" v-model="vLSData.b" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="R（mm）">
                    <el-input type="number" v-model="vLSData.RVLS" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="hf1">
                    <el-input type="number" v-model="vLSData.hf1VLS" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="hf2">
                    <el-input type="number" v-model="vLSData.hf2VLS" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row>
              <h4>VLX加劲板的参数设置</h4>
              <el-col :span="6">
                <el-form-item label="VLX加劲板设置">
                  <el-select v-model="vLXData.VLXjjbsz">
                    <el-option v-for="(item,index) in vLSjjbszselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <div v-if="vLXData.VLXjjbsz !== 2">
                <el-col :span="6">
                  <el-form-item label="VLX加劲板坡度">
                    <el-select v-model="vLXData.VLXjjbpd">
                      <el-option v-for="(item,index) in dbdyxselect" :key="index" :label="item" :value="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="HX（mm）">
                    <el-input type="number" v-model="vLXData.HX" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="VLt（mm）">
                    <el-input type="number" v-model="vLXData.VLtX" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="VLb（mm）">
                    <el-input type="number" v-model="vLXData.VLbX" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="L1（mm）">
                    <el-input type="number" v-model="vLXData.L1X" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="b（mm）">
                    <el-input type="number" v-model="vLXData.bX" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="R（mm）">
                    <el-input type="number" v-model="vLXData.RVLX" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="hf1">
                    <el-input type="number" v-model="vLXData.hf1VLX" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="hf2">
                    <el-input type="number" v-model="vLXData.hf2VLX" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row>
              <el-col :span="24">
                <h4>支点横梁腹板人孔设计</h4>
              </el-col>
              <el-col :span="6">
                <el-form-item label="人孔中心线位置">
                  <el-input type="number" v-model="rkData.rkzxxwz" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="人孔类型">
                  <el-select v-model="rkData.rklx" @change="zdhlfbrksjchange()">
                    <el-option v-for="(item,index) in rklxselect" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <div ref="zhiDianHengLIangFuBanRenKongSheJi" id="zhiDianHengLIangFuBanRenKongSheJi">
                <el-col :span="24">
                  <h5>人孔参数表</h5>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="H（mm）">
                    <el-input type="number" v-model="rklxData.H" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="rkData.rklx === 2">
                  <el-form-item label="RKD（mm）">
                    <el-input type="number" v-model="rklxData.RKD" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="rkData.rklx === 0 || rkData.rklx === 1 || rkData.rklx === 3">
                  <el-form-item label="RKH（mm）">
                    <el-input type="number" v-model="rklxData.RKH" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="rkData.rklx === 0 || rkData.rklx === 1 || rkData.rklx === 3">
                  <el-form-item label="RKB（mm）">
                    <el-input type="number" v-model="rklxData.RKB" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="rkData.rklx === 0 || rkData.rklx === 1">
                  <el-form-item label="RKR（mm）">
                    <el-input type="number" v-model="rklxData.RKR" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <div v-if="rkData.rklx === 0 || rkData.rklx === 1">
                  <el-col :span="24" v-if="rkData.rklx === 0">
                    <h5>W1、W2围板参数表</h5>
                  </el-col>
                  <el-col :span="24" v-if="rkData.rklx === 1">
                    <h5>W1围板参数表</h5>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="H1（mm）">
                      <el-input type="number" v-model="rklxData.H1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="B1（mm）">
                      <el-input type="number" v-model="rklxData.B1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rkData.rklx === 0">
                    <el-form-item label="B2（mm）">
                      <el-input type="number" v-model="rklxData.B2" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="W1t（mm）">
                      <el-input type="number" v-model="rklxData.W1t" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="W1b（mm）">
                      <el-input type="number" v-model="rklxData.W1b" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rkData.rklx === 0">
                    <el-form-item label="W2t（mm）">
                      <el-input type="number" v-model="rklxData.W2t" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rkData.rklx === 0">
                    <el-form-item label="W2b（mm）">
                      <el-input type="number" v-model="rklxData.W2b" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="R1（mm）">
                      <el-input type="number" v-model="rklxData.R1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="hf1">
                      <el-input type="number" v-model="rklxData.hf1W12" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rkData.rklx === 0">
                    <el-form-item label="hf2">
                      <el-input type="number" v-model="rklxData.hf2W12" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item>
                      <span slot="label" v-if="rkData.rklx === 0">W1、W2围板设置</span>
                      <span slot="label" v-else>W1围板设置</span>
                      <el-select v-model="rklxData.w1W2wbsz">
                        <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <div v-if="rkData.rklx === 1">
                    <el-col :span="24">
                      <h5>J1加劲板参数表</h5>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="J1t（mm）">
                        <el-input type="number" v-model="rklxData.J1t" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="J1b（mm）">
                        <el-input type="number" v-model="rklxData.J1b" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="R2（mm）">
                        <el-input type="number" v-model="rklxData.R2" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="hf2">
                        <el-input type="number" v-model="rklxData.hf2" style="width:50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="J1关于横隔">
                        <el-select v-model="rklxData.J1gyhg">
                          <el-option v-for="(item,index) in w1W2wbsz" :key="index" :label="item" :value="index">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </div>
                </div>
                <div v-if="rkData.rklx === 2 || rkData.rklx === 3">
                  <el-col :span="24">
                    <h5>W1参数表</h5>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="RKt（mm）">
                      <el-input type="number" v-model="rklxData.RKt" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="RKb（mm）">
                      <el-input type="number" v-model="rklxData.RKb" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="rkData.rklx === 3">
                    <el-form-item label="R1（mm）">
                      <el-input type="number" v-model="rklxData.R1W1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="hf1">
                      <el-input type="number" v-model="rklxData.hf1w1" style="width:50%"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
              </div>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 端封板（DFB）设计 -->
      <div>
        <h3 align="left">端封板（DFB）设计</h3>
        <div align="left">
          <el-form :v-model="dfbsjform">
            <el-row>
              <h4>端封板的参数设置</h4>
              <el-col :span="6">
                <el-form-item label="DFt（mm）">
                  <el-input type="number" v-model="dfbsjform.DFB_DFt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="L（mm）">
                  <el-input type="number" v-model="dfbsjform.DFB_L" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="DBY（mm）">
                  <el-input type="number" v-model="dfbsjform.DFB_DBY" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="DBt（mm）">
                  <el-input type="number" v-model="dfbsjform.DFB_DBt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="顶板对齐方式">
                  <el-select v-model="dfbsjform.dbdqfs">
                    <el-option v-for="(item,index) in j1csbList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <h4>SL加劲板的参数设置</h4>
              <el-col :span="6">
                <el-form-item label="LZ（mm）">
                  <el-input type="number" v-model="dfbsjform.SL_LZ" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="LY（mm）">
                  <el-input type="number" v-model="dfbsjform.SL_LY" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="SLt（mm）">
                  <el-input type="number" v-model="dfbsjform.SL_SLt" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="SLb（mm）">
                  <el-input type="number" v-model="dfbsjform.SL_SLb" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="HY（mm）">
                  <el-input type="number" v-model="dfbsjform.SL_HY" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="HD（mm）">
                  <el-input type="number" v-model="dfbsjform.SL_HD" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="b（mm）">
                  <el-input type="number" v-model="dfbsjform.SL_b" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="hf2">
                  <el-input type="number" v-model="dfbsjform.SL_hf2" style="width:50%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <h4>VL加劲板参数表设置</h4>
            <el-row>
              <el-col :span="6">
                <el-form-item label="VL设置">
                  <el-select v-model="dfbsjform.dbdbktsz">
                    <el-option v-for="(item,index) in vljjbcsbszList" :key="index" :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <div v-if="dfbsjform.dbdbktsz !== 0">
                <el-col :span="6">
                  <el-form-item label="VH（mm）">
                    <el-input type="number" v-model="dfbsjform.VL_VH" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="VLt（mm）">
                    <el-input type="number" v-model="dfbsjform.VL_VLt" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="VLb（mm）">
                    <el-input type="number" v-model="dfbsjform.VL_VLb" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="L1（mm）">
                    <el-input type="number" v-model="dfbsjform.VL_L1" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="b（mm）">
                    <el-input type="number" v-model="dfbsjform.VL_b" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="R（mm）">
                    <el-input type="number" v-model="dfbsjform.VL_R" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="hf1">
                    <el-input type="number" v-model="dfbsjform.VL_hf1" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="hf2">
                    <el-input type="number" v-model="dfbsjform.VL_hf2" style="width:10%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="翼缘板和腹板交角处的过焊孔R（mm）">
                    <el-input type="number" v-model="dfbsjform.YYB_FB_R" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="翼缘板和腹板交角处的过焊孔D（mm）">
                    <el-input type="number" v-model="dfbsjform.YYB_FB_D" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="底板和腹板交角处的过焊孔R（mm）">
                    <el-input type="number" v-model="dfbsjform.DB_FB_R" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="底板和腹板交角处的过焊孔D（mm）">
                    <el-input type="number" v-model="dfbsjform.DB_FB_D" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="翼缘板和端封板顶板的过焊孔R（mm）">
                    <el-input type="number" v-model="dfbsjform.YYB_DFB_R" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="翼缘板和端封板顶板的过焊孔h（mm）">
                    <el-input type="number" v-model="dfbsjform.YYB_DFB_h" style="width:50%"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { JsonDataService } from "@/components/CaoXingZuHeLiang/models/JsonDataService";

@Component({
  components: {}
})
export default class HeGeXi extends Vue {
  name = "Heng-GeXi";

  @Inject() jsonDataService!: JsonDataService;

  $refs!: {
    shuLeiXingHaoForm: HTMLDivElement;
    zhongJianHengGeTable: HTMLDivElement;
    renKongLeiXingTable: HTMLDivElement;
    hengLianLeiXingForm: HTMLDivElement;
    zhiChengJiaJinLeiLeiXingForm: HTMLDivElement;
    zhiDianChuHengLiangForm: HTMLDivElement;
    zhiDianHengLIangFuBanRenKongSheJi: HTMLDivElement;
  };

  // 腹板竖肋设计钢梁table数据集
  entries = [
    {
      glmc: "GL-1",
      yybhd: "28",
      fbhd: "16",
      dbhd: "20",
      slbh: "FS1、FS2、FS3、FS12、FS13、FS14",
      sllx: "I-1-0"
    },
    {
      glmc: "GL-1",
      yybhd: "48",
      fbhd: "16",
      dbhd: "30",
      slbh: "FS4、FS5、FS6、FS7、FS8、FS9、FS10、FS11",
      sllx: "I-1-0"
    },
    {
      glmc: "GL-2",
      yybhd: "28",
      fbhd: "16",
      dbhd: "20",
      slbh: "FS1、FS2、FS3、FS12、FS13、FS14",
      sllx: "I-1-0"
    },
    {
      glmc: "GL-2",
      yybhd: "48",
      fbhd: "16",
      dbhd: "30",
      slbh: "FS4、FS5、FS6、FS7、FS8、FS9、FS10、FS11",
      sllx: "I-1-0"
    }
  ];

  // 箱间横联设计Table数据集
  entrie = [
    {
      glmc: "(GL-1)",
      hgbh: "HG1",
      hlbh: "HL1",
      hllx: "单梁式"
    },
    {
      glmc: "(GL-2)",
      hgbh: "HG1",
      hlbh: "HL1",
      hllx: "单梁式"
    },
    {
      glmc: "(GL-1)",
      hgbh: "HG2",
      hlbh: "HL2",
      hllx: "单梁式"
    },
    {
      glmc: "(GL-2)",
      hgbh: "HG2",
      hlbh: "HL2",
      hllx: "单梁式"
    },
    {
      glmc: "(GL-1)",
      hgbh: "HG3",
      hlbh: "HL3",
      hllx: "单梁式"
    },
    {
      glmc: "(GL-2)",
      hgbh: "HG3",
      hlbh: "HL3",
      hllx: "单梁式"
    },
    {
      glmc: "(GL-2)",
      hgbh: "HG1",
      hlbh: "HL1-1",
      hllx: "单梁式"
    },
    {
      glmc: "(GL-3)",
      hgbh: "HG1",
      hlbh: "HL1-1",
      hllx: "单梁式"
    }
  ];

  // 中间横隔设计Table
  entry = [
    {
      glmc: "GL-1",
      yybhd: "28",
      fbhd: "16",
      dbhd: "20",
      xjjd: "90",
      hgbh: "HG1、HG6",
      hglx: "SF-1-0",
      rklx: "A型"
    },
    {
      glmc: "GL-1",
      yybhd: "48",
      fbhd: "16",
      dbhd: "32",
      xjjd: "90",
      hgbh: "HG2、HG3、HG4、HG5",
      hglx: "SF-1-0",
      rklx: "A型"
    },
    {
      glmc: "GL-2",
      yybhd: "28",
      fbhd: "16",
      dbhd: "20",
      xjjd: "90",
      hgbh: "HG1、HG6",
      hglx: "SF-1-0",
      rklx: "A型"
    },
    {
      glmc: "GL-2",
      yybhd: "48",
      fbhd: "16",
      dbhd: "32",
      xjjd: "90",
      hgbh: "HG2、HG3、HG4、HG5",
      hglx: "SF-1-0",
      rklx: "A型"
    }
  ];

  entriesZDHG = [
    {
      glmc: "GL-1",
      yybhd: "28",
      fbhd: "16",
      dbhd: "20",
      xjj: "90",
      zdhgbh: "ZDHG1",
      zzgs: "单支座",
      zcjjllx: "ZC2"
    },
    {
      glmc: "GL-1",
      yybhd: "28",
      fbhd: "16",
      dbhd: "20",
      xjj: "90",
      zdhgbh: "ZDHG2",
      zzgs: "单支座",
      zcjjllx: "ZC2"
    },
    {
      glmc: "GL-2",
      yybhd: "28",
      fbhd: "16",
      dbhd: "20",
      xjj: "90",
      zdhgbh: "ZDHG1",
      zzgs: "单支座",
      zcjjllx: "ZC2"
    },
    {
      glmc: "GL-2",
      yybhd: "28",
      fbhd: "16",
      dbhd: "20",
      xjj: "90",
      zdhgbh: "ZDHG2",
      zzgs: "单支座",
      zcjjllx: "ZC2"
    }
  ];

  entriesCYQYDBZLMK = [
    {
      glmc: "GL-1",
      dbzlbh: "DZ1",
      blxh: "I-1型",
      mk: "有"
    },
    {
      glmc: "GL-1",
      dbzlbh: "DZ2",
      blxh: "I-3型",
      mk: "有"
    },
    {
      glmc: "GL-1",
      dbzlbh: "DZ3",
      blxh: "I-1型",
      mk: "无"
    },
    {
      glmc: "GL-2",
      dbzlbh: "DZ1",
      blxh: "I-1型",
      mk: "无"
    },
    {
      glmc: "GL-2",
      dbzlbh: "DZ2",
      blxh: "I-3型",
      mk: "有"
    },
    {
      glmc: "GL-2",
      dbzlbh: "DZ3",
      blxh: "I-1型",
      mk: "有"
    }
  ];

  entriesZDHL = [
    {
      glmc: "(GL-1)",
      hgbh: "ZDHG1",
      hlbh: "ZDHL1",
      zdhllx: "单梁式",
      glgd: "1800",
      xjj: "90"
    },
    {
      glmc: "(GL-2)",
      hgbh: "ZDHG1",
      hlbh: "ZDHL1",
      zdhllx: "单梁式",
      glgd: "1800",
      xjj: "90"
    },
    {
      glmc: "(GL-1)",
      hgbh: "ZDHG2",
      hlbh: "ZDHL2",
      zdhllx: "单梁式",
      glgd: "1800",
      xjj: "90"
    },
    {
      glmc: "(GL-2)",
      hgbh: "ZDHG2",
      hlbh: "ZDHL2",
      zdhllx: "单梁式",
      glgd: "1800",
      xjj: "90"
    }
  ];

  //  竖肋类型数据集
  sllxList = [
    "I-1-0",
    "I-1-1",
    "I-1-2",
    "I-1-3",
    "I-1-4",
    "I-2-0",
    "I-2-1",
    "I-2-2",
    "I-2-3",
    "I-2-4"
  ];

  // 腹板竖肋类型
  fbslselectvalue = "I-1-0";

  // 横隔类型
  zjhgselectvalue = "SF-1-0";

  // 人孔类型
  rklxselectvalue = "A型";

  zzgsselectvalue = "单支座";

  zcjjllxselectvalue = "ZC2";

  zdchlsjselectvalue = "单梁式";

  zzgsList = ["单支座", "双支座"];

  zcjjllxList = ["ZC2", "ZC3"];

  lbxhList = ["I-1型", "I-2型", "I-3型"];

  dbdyxselect = ["水平设置", "随横坡"];

  w1W2wbsz = ["单侧设置", "双侧设置"];

  dbdbktcsszselect = ["不扩头", "半扩头", "全扩头"];

  hldbdbxsselect = ["不扩头", "全扩头"];

  dbdbktszselect = ["全扩头", "半扩头"];

  vLSjjbszselect = ["单侧", "双侧", "不设置"];

  j1zxsnselect = ["局部设置"];

  // 中间横隔人孔类型
  rklxList = ["A型", "B型", "C型", "D型", "E型", "F型", "G型"];

  JJszdsList = [0, 1, 2, 3, 4, 5];

  // 下部倒角select数据集
  xbdjselect = ["1 : 1", "1 : 2"];

  hllxList = [
    { label: "单梁式", disabled: false },
    { label: "桁架式", disabled: true }
  ];

  hllxselectvalue = "单梁式";

  j1csbList = ["顶对齐", "底对齐"];

  zcjjbydbdgxList = ["接触", "不接触"];

  LCszList = ["设置", "不设置"];

  LCwzList = ["左侧设置", "右侧设置"];

  rklxselect = ["A型", "B型", "C型", "D型"];

  mkList = ["有", "无"];

  vljjbcsbszList = ["不设置", "水平设置", "翼缘板角点连线设置"];

  // 请不要改变属性顺序
  // the iteration order is a combination of ascending order for number-like keys, then the insertion order for strings keys  number升序，然后是字符串插入顺序
  fbslform: { [key: string]: any } = {
    "I-1-0": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        b: 0,
        JL: 0,
        hf1: 0,
        hf2: 0,
        xbdjselectvalue: 0
      }
    ],
    "I-1-1": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        b: 0,
        JL: 0,
        hf1: 0,
        hf2: 0,
        xbdjselectvalue: 0
      }
    ],
    "I-1-2": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        b: 0,
        JL: 0,
        hf1: 0,
        hf2: 0,
        xbdjselectvalue: 0
      }
    ],
    "I-1-3": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        b: 0,
        JL: 0,
        hf1: 0,
        hf2: 0,
        xbdjselectvalue: 0
      }
    ],
    "I-1-4": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        b: 0,
        JL: 0,
        hf1: 0,
        hf2: 0,
        xbdjselectvalue: 0
      }
    ],
    "I-2-0": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        R2: 0,
        hf1: 0,
        hf2: 0,
        hf3: 0
      }
    ],
    "I-2-1": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        R2: 0,
        hf1: 0,
        hf2: 0,
        hf3: 0
      }
    ],
    "I-2-2": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        R2: 0,
        hf1: 0,
        hf2: 0,
        hf3: 0
      }
    ],
    "I-2-3": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        R2: 0,
        hf1: 0,
        hf2: 0,
        hf3: 0
      }
    ],
    "I-2-4": [
      {
        fbslhdFSt: 0,
        fbslkdFSb: 0,
        R1: 0,
        R2: 0,
        hf1: 0,
        hf2: 0,
        hf3: 0
      }
    ]
  };

  // 中间横隔Table
  hglxform: { [key: string]: any } = {
    "SF-1-0": [
      {
        HGt: 0,
        H1: 0,
        b: 0,
        R: 0,
        DBZ: 0,
        DBY: 0,
        DBb: 0,
        DBt: 0,
        rkzxxwz: 0,
        dbdyxselectvalue: 0,
        yyb_fb_R: 0,
        yyb_fb_D: 0,
        db_fb_R: 0,
        db_fb_D: 0
      }
    ],
    "SF-1-1": [
      {
        HGt: 0,
        H1: 0,
        b: 0,
        R: 0,
        DBZ: 0,
        DBY: 0,
        DBb: 0,
        DBt: 0,
        rkzxxwz: 0,
        dbdyxselectvalue: 0,
        yyb_fb_R: 0,
        yyb_fb_D: 0,
        db_fb_R: 0,
        db_fb_D: 0
      }
    ],
    "SF-1-2": [
      {
        HGt: 0,
        H1: 0,
        b: 0,
        R: 0,
        DBZ: 0,
        DBY: 0,
        DBb: 0,
        DBt: 0,
        rkzxxwz: 0,
        dbdyxselectvalue: 0,
        yyb_fb_R: 0,
        yyb_fb_D: 0,
        db_fb_R: 0,
        db_fb_D: 0
      }
    ],
    "SF-1-3": [
      {
        HGt: 0,
        H1: 0,
        b: 0,
        R: 0,
        DBZ: 0,
        DBY: 0,
        DBb: 0,
        DBt: 0,
        rkzxxwz: 0,
        dbdyxselectvalue: 0,
        yyb_fb_R: 0,
        yyb_fb_D: 0,
        db_fb_R: 0,
        db_fb_D: 0
      }
    ],
    "SF-1-4": [
      {
        HGt: 0,
        H1: 0,
        b: 0,
        R: 0,
        DBZ: 0,
        DBY: 0,
        DBb: 0,
        DBt: 0,
        rkzxxwz: 0,
        dbdyxselectvalue: 0,
        yyb_fb_R: 0,
        yyb_fb_D: 0,
        db_fb_R: 0,
        db_fb_D: 0
      }
    ]
  };

  // 人孔类型Table
  rklxform: { [key: string]: any } = {
    A型: [
      {
        H: 0,
        RKH: 0,
        RKB: 0,
        RKR: 0,
        H1: 0,
        B1: 0,
        B2: 0,
        W1t: 0,
        W1b: 0,
        W2t: 0,
        W2b: 0,
        R1: 0,
        hf1: 0,
        hf2: 0,
        rksxyx: 0,
        wbsz: 0
      }
    ],
    B型: [
      {
        H: 0,
        RKH: 0,
        RKB: 0,
        RKR: 0,
        H1: 0,
        B1: 0,
        W1t: 0,
        W1b: 0,
        R1: 0,
        hf1: 0,
        J1t: 0,
        J1b: 0,
        J1Y: 0,
        J1D: 0,
        hf2: 0,
        rksxyx: 0,
        wbsz: 0,
        j1GYHG: 0
      }
    ],
    C型: [
      {
        H: 0,
        RKD: 0,
        RKt: 0,
        RKb: 0,
        hf1: 0,
        BZ: 0,
        BY: 0,
        J1t: 0,
        J1b: 0,
        J1Y: 0,
        J1D: 0,
        hf2: 0,
        J2t: 0,
        J2b: 0,
        J2Y: 0,
        hf22: 0,
        J3t: 0,
        J3b: 0,
        J3D: 0,
        hf23: 0,
        j1GYHG: 0,
        j2gyhg: 0,
        j3gyhg: 0
      }
    ],
    D型: [
      {
        H: 0,
        RKD: 0,
        B1: 0,
        RKt: 0,
        RKb: 0,
        hf1: 0
      }
    ],
    E型: [
      {
        H: 0,
        RKH: 0,
        RKB: 0,
        RKt: 0,
        RKb: 0,
        R1: 0,
        hf1: 0,
        rksxyx: 0
      }
    ],
    F型: [
      {
        H: 0,
        RKD: 0,
        H1: 0,
        RKt: 0,
        RKb: 0,
        hf1: 0
      }
    ],
    G型: [
      {
        H: 0,
        RKD: 0,
        H1: 0,
        RKt: 0,
        RKb: 0,
        hf1: 0,
        hf2: 0
      }
    ]
  };

  // 单梁式横联Form
  dlslxform: { [key: string]: { [key: string]: number } } = {
    单梁式: {
      H: 0,
      H1: 0,
      B: 0,
      t1: 0,
      t2: 0,
      R: 0,
      hf1: 0,
      hlzxx: 0,
      J1t: 0,
      J1b: 0,
      J1c: 0,
      b1: 0,
      b2: 0,
      R1: 0,
      hf2: 0,
      J1sz: 0,
      J1yhlddbgx: 0,
      JJt: 0,
      JJb: 0,
      R2: 0,
      hf3: 0,
      JJszds: 0
    }
  };

  // 中间横隔类型
  hglxList = [
    "SF-1-0",
    "SF-1-1",
    "SF-1-2",
    "SF-1-3",
    "SF-1-4",
    "SF-2-0",
    "SF-2-1",
    "SF-2-2",
    "SF-2-3",
    "SF-2-4"
  ];

  zzgsform: { [key: string]: { [key: string]: number } } = {
    单支座: {
      zzwz: 0
    },
    双支座: {
      zczzwz: 0,
      yczzwz: 0
    }
  };

  zcjjllxform: { [key: string]: { [key: string]: number } } = {
    ZC2: {
      ZDHGt: 0,
      DBZ: 0,
      DBY: 0,
      DBt: 0,
      dbdqfs: 0,
      dbdbktcssz: 0,
      ygbjjd: 0,
      CKZ: 0,
      CKY: 0,
      CJt: 0,
      CJb: 0,
      zcjjbydbdgx: 0,
      D: 0,
      R: 0,
      b: 0,
      h: 0,
      LCsz: 0,
      LCwz: 0,
      LCygbjjd: 0,
      L2: 0,
      LCt: 0,
      LCb: 0,
      LCH: 0,
      D3: 0,
      b3: 0,
      h3: 0,
      rksz: 0,
      rkwz: 0,
      L1: 0,
      rklx: 0,
      jxmjjbsz: 0,
      L14: 0,
      W1t: 0,
      H: 0,
      RKB: 0,
      RKH: 0,
      R1: 0,
      R2: 0,
      B1: 0,
      B2: 0,
      H1: 0,
      H2: 0,
      hf1: 0,
      gcdqdsjz: 0,
      xs: 0,
      bs: 0,
      zzflsjz: 0,
      cymj: 0,
      ysqdz: 0,
      gcdqdsjz2: 0,
      xs2: 0,
      bs2: 0,
      zzflsjz2: 0,
      cymj2: 0,
      ysqdz2: 0
    },
    ZC3: {
      ZDHGt: 0,
      DBZ: 0,
      DBY: 0,
      DBt: 0,
      dbdqfs: 0,
      dbdbktcssz: 0,
      ygbjjd: 0,
      CJ1t: 0,
      CJ1b: 0,
      zcjjbydbdgx: 0,
      D: 0,
      R: 0,
      b: 0,
      h: 0,
      ygbjjd2: 0,
      CKZ: 0,
      CKY: 0,
      CJ2t: 0,
      CJ2b: 0,
      zcjjbydbdgx2: 0,
      D2: 0,
      R2: 0,
      b2: 0,
      h2: 0,
      LCsz: 0,
      LCwz: 0,
      LCygbjjd: 0,
      L2: 0,
      LCt: 0,
      LCb: 0,
      LCH: 0,
      D3: 0,
      b3: 0,
      h3: 0,
      rksz: 0,
      rkwz: 0,
      L1: 0,
      rklx: 0,
      jxmjjbsz: 0,
      L14: 0,
      W1t: 0,
      H: 0,
      RKB: 0,
      RKH: 0,
      R1: 0,
      B1: 0,
      B2: 0,
      H1: 0,
      H2: 0,
      hf1: 0,
      gcdqdsjz: 0,
      xs: 0,
      bs: 0,
      zzflsjz: 0,
      cymj: 0,
      ysqdz: 0,
      gcdqdsjz2: 0,
      xs2: 0,
      bs2: 0,
      zzflsjz2: 0,
      cymj2: 0,
      ysqdz2: 0
    }
  };

  zdchlsjform = {
    HLFB_YYB_ZFB_R: 35,
    HLFB_HLDB_ZLFB_R: 35,
    HLDB_YYB_R: 35
  };

  zdchlform: {
    [key: string]: {
      [key: string]: number;
    };
  } = {
    单梁式: {
      hlgdH: 0,
      DBZ: 0,
      DBY: 0,
      t1: 0,
      dbdqfs: 0,
      dbsz: 0,
      B: 0,
      t2: 0,
      t3: 0,
      hf1: 0,
      hf2: 0,
      hf3: 0,
      hf4: 0,
      dbjjlsz: 0,
      dbjjlyhldbgx: 0,
      hldbdbxs: 0,
      J1zxsn: 0,
      J1t: 0,
      J1b: 0,
      J1c: 0,
      b1: 0,
      b2: 0,
      R: 0,
      hf22: 0,
      LQKT: 0,
      k1QKT: 0,
      k2QKT: 0,
      b1QKT: 0,
      RQKT: 0,
      dbdbktsz: 0,
      L: 0,
      k1: 0,
      k2: 0,
      b13: 0,
      R3: 0,
      SLszds: 0,
      SLt: 0,
      SLb: 0,
      RSL: 0,
      hf3SL: 0
    }
  };

  zdhlfbrksjform: {
    [key: string]: {
      rkData: {
        [key: string]: number;
      }[];
    };
  } = {
    单梁式: {
      rkData: [
        // 单侧
        {
          rkzxxwz: 0,
          rklx: 0
        }
      ]
    }
  };

  zdchlform0: {
    [key: string]: {
      vLXData: {
        [key: string]: number;
      }[];
    };
  } = {
    单梁式: {
      vLXData: [
        // 单侧
        {
          VLXjjbsz: 0,
          VLXjjbpd: 0,
          HX: 0,
          VLtX: 0,
          VLbX: 0,
          L1X: 0,
          bX: 0,
          RVLX: 0,
          hf1VLX: 0,
          hf2VLX: 0
        }
      ]
    }
  };

  zdchlform1: {
    [key: string]: {
      vLSData: {
        [key: string]: number;
      }[];
    };
  } = {
    单梁式: {
      vLSData: [
        // 单侧
        {
          VLSjjbsz: 0,
          VLSjjbpd: 0,
          HS: 0,
          VLt: 0,
          VLb: 0,
          L1: 0,
          b: 0,
          RVLS: 0,
          hf1VLS: 0,
          hf2VLS: 0
        }
      ]
    }
  };

  zdchlform2: {
    [key: string]: {
      rklxData: {
        [key: string]: number;
      }[];
    };
  } = {
    单梁式: {
      rklxData: [
        // A型
        {
          H: 0,
          RKD: 0,
          RKH: 0,
          RKB: 0,
          RKR: 0,
          H1: 0,
          B1: 0,
          B2: 0,
          W1t: 0,
          W1b: 0,
          W2t: 0,
          W2b: 0,
          R1: 0,
          hf1W12: 0,
          hf2W12: 0,
          w1W2wbsz: 0,
          RKt: 0,
          RKb: 0,
          R1W1: 0,
          hf1w1: 0
        },
        // B型
        {
          H: 0,
          RKH: 0,
          RKB: 0,
          RKR: 0,
          H1: 0,
          B1: 0,
          W1t: 0,
          W1b: 0,
          R1: 0,
          hf1W12: 0,
          w1W2wbsz: 0,
          J1t: 0,
          J1b: 0,
          R2: 0,
          hf2: 0,
          J1gyhg: 0
        },
        // C型
        {
          H: 0,
          RKD: 0,
          RKt: 0,
          RKb: 0,
          hf1w1: 0
        },
        // D型
        {
          H: 0,
          RKH: 0,
          RKB: 0,
          RKt: 0,
          RKb: 0,
          R1W1: 0,
          hf1w1: 0
        }
      ]
    }
  };

  dfbsjform = {
    DFB_DFt: 14,
    DFB_L: 20,
    DFB_DBY: 200,
    DFB_DBt: 28,
    dbdqfs: 0,
    SL_LZ: 400,
    SL_LY: 400,
    SL_SLt: 14,
    SL_SLb: 160,
    SL_HY: 35,
    SL_HD: 35,
    SL_b: 20,
    SL_hf2: 6,
    dbdbktsz: 0,
    VL_VH: 350,
    VL_VLt: 12,
    VL_VLb: 140,
    VL_L1: 35,
    VL_b: 20,
    VL_R: 20,
    VL_hf1: 6,
    VL_hf2: 6,
    YYB_FB_R: 35,
    YYB_FB_D: 0,
    DB_FB_R: 35,
    DB_FB_D: 0,
    YYB_DFB_R: 25,
    YYB_DFB_h: 0
  };

  get isI1(): boolean {
    return this.fbslselectvalue.startsWith("I-1");
  }

  get rklxData() {
    return this.zdchlform2[this.zdchlsjselectvalue].rklxData[
      this.zdhlfbrksjform[this.zdchlsjselectvalue].rkData[0].rklx
    ];
  }

  get vLSData() {
    return this.zdchlform1[this.zdchlsjselectvalue].vLSData[0];
  }

  get vLXData() {
    return this.zdchlform0[this.zdchlsjselectvalue].vLXData[0];
  }

  get rkData() {
    return this.zdhlfbrksjform[this.zdchlsjselectvalue].rkData[0];
  }

  // 腹板竖肋型号切换Form模型
  fbslchange() {
    this.$refs.shuLeiXingHaoForm.classList.add("animate");
  }

  hglxchange() {
    this.$refs.zhongJianHengGeTable.classList.add("animate");
  }

  rklxchange() {
    this.$refs.renKongLeiXingTable.classList.add("animate");
  }

  hllxchange() {
    this.$refs.hengLianLeiXingForm.classList.add("animate");
  }

  zcjjllxchange() {
    this.$refs.zhiChengJiaJinLeiLeiXingForm.classList.add("animate");
  }

  zdhlfbrksjchange() {
    this.$refs.zhiDianHengLIangFuBanRenKongSheJi.classList.add("animate");
  }

  zdchlchange() {
    this.$refs.zhiDianChuHengLiangForm.classList.add("animate");
  }

  // 切换select 拿掉class
  removeAnimate(div: HTMLDivElement) {
    div.classList.remove("animate");
  }

  mounted() {
    const div1 = this.$refs.shuLeiXingHaoForm;
    div1.addEventListener("animationend", this.removeAnimate.bind(this, div1));
    const div2 = this.$refs.zhongJianHengGeTable;
    div2.addEventListener("animationend", this.removeAnimate.bind(this, div2));
    const div3 = this.$refs.renKongLeiXingTable;
    div3.addEventListener("animationend", this.removeAnimate.bind(this, div3));
    const div4 = this.$refs.hengLianLeiXingForm;
    div4.addEventListener("animationend", this.removeAnimate.bind(this, div4));
    const div5 = this.$refs.zhiChengJiaJinLeiLeiXingForm;
    div5.addEventListener("animationend", this.removeAnimate.bind(this, div5));
    const div6 = this.$refs.zhiDianHengLIangFuBanRenKongSheJi;
    div6.addEventListener("animationend", this.removeAnimate.bind(this, div6));
    const div7 = this.$refs.zhiDianChuHengLiangForm;
    div7.addEventListener("animationend", this.removeAnimate.bind(this, div7));
  }

  // 序列化腹板竖肋设计
  serializeFbslform() {
    const o: { [key: string]: any } = {};
    for (const key in this.fbslform) {
      const value = this.fbslform[key][0];
      const a = [];
      for (const prop in value) {
        if (prop !== "xbdjselectvalue") {
          a.push(value[prop]);
        }
      }
      o[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.sllxData = o;

    const o2: { [key: string]: any } = {};
    for (const key in this.fbslform) {
      const value = this.fbslform[key][0];
      const a = [];
      for (const prop in value) {
        // TODO 可能有多个选择要加入数组
        if (prop === "xbdjselectvalue") {
          a.push(value[prop]);
        }
      }
      o2[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.sllxOption = o2;
  }

  // 序列化横隔类型
  serializehglxform() {
    const o: { [key: string]: any } = {};
    for (const key in this.hglxform) {
      const value = this.hglxform[key][0];
      const a = [];
      for (const prop in value) {
        if (prop !== "dbdyxselectvalue") {
          a.push(value[prop]);
        }
      }
      o[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.hglxData = o;

    const o2: { [key: string]: any } = {};
    for (const key in this.hglxform) {
      const value = this.hglxform[key][0];
      const a = [];
      for (const prop in value) {
        // TODO 可能有多个选择要加入数组
        if (prop === "dbdyxselectvalue") {
          a.push(value[prop]);
        }
      }
      o2[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.hglxOption = o2;
  }

  static isRklxOption(prop: string) {
    return (
      prop === "rksxyx" ||
      prop === "wbsz" ||
      prop === "j1GYHG" ||
      prop === "j2gyhg" ||
      prop === "j3gyhg"
    );
  }

  isXjhlOption(prop: string) {
    return (
      prop === "hlzxx" ||
      prop === "J1sz" ||
      prop === "J1yhlddbgx" ||
      prop === "JJszds"
    );
  }

  iszcjjllxOption(prop: string) {
    return (
      prop === "dbdqfs" ||
      prop === "dbdbktcssz" ||
      prop === "zcjjbydbdgx" ||
      prop === "zcjjbydbdgx2" ||
      prop === "LCsz" ||
      prop === "LCwz" ||
      prop === "rksz" ||
      prop === "rkwz" ||
      prop === "rklx" ||
      prop === "jxmjjbsz"
    );
  }

  iszdchlsjOption(prop: string) {
    return (
      prop === "dbdqfs" ||
      prop === "dbsz" ||
      prop === "dbjjlsz" ||
      prop === "dbjjlyhldbgx" ||
      prop === "hldbdbxs" ||
      prop === "J1zxsn" ||
      prop === "dbdbktsz" ||
      prop === "SLszds" ||
      prop === "VLSjjbsz" ||
      prop === "VLSjjbpd" ||
      prop === "VLXjjbsz" ||
      prop === "VLXjjbpd" ||
      prop === "rklx" ||
      prop === "w1W2wbsz" ||
      prop === "J1gyhg"
    );
  }

  // 序列化人孔类型
  serializerklxform() {
    const o: { [key: string]: any } = {};
    for (const key in this.rklxform) {
      const value = this.rklxform[key][0];
      const a = [];
      for (const prop in value) {
        if (!HeGeXi.isRklxOption(prop)) {
          a.push(value[prop]);
        }
      }
      o[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.rklxData = o;

    const o2: { [key: string]: any } = {};
    for (const key in this.rklxform) {
      const value = this.rklxform[key][0];
      const a = [];
      for (const prop in value) {
        // TODO 可能有多个选择要加入数组
        if (HeGeXi.isRklxOption(prop)) {
          a.push(value[prop]);
        }
      }
      o2[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.rklxOption = o2;
  }

  // 序列化横联类型
  serializehllxform() {
    const o: { [key: string]: any } = {};
    for (const key in this.dlslxform) {
      const value = this.dlslxform[key];
      const a = [];
      for (const prop in value) {
        // TODO 可能有多个选择要加入数组
        if (!this.isXjhlOption(prop)) {
          a.push(value[prop]);
        }
      }
      o[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.hllxData = o;

    const o2: { [key: string]: any } = {};
    for (const key in this.dlslxform) {
      const value = this.dlslxform[key];
      const a = [];
      for (const prop in value) {
        // TODO 可能有多个选择要加入数组
        if (this.isXjhlOption(prop)) {
          a.push(value[prop]);
        }
      }
      o2[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.hllxOption = o2;
  }

  // 序列支座个数
  serializezzgsform() {
    const o: { [key: string]: any } = {};
    for (const key in this.zzgsform) {
      const value = this.zzgsform[key];
      const a = [];
      for (const prop in value) {
        // TODO 可能有多个选择要加入数组
        a.push(value[prop]);
      }
      o[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.zzgsData = o;
  }

  // 序列支承加劲肋类型
  serializezcjjllxform() {
    const o: { [key: string]: any } = {};
    for (const key in this.zcjjllxform) {
      const value = this.zcjjllxform[key];
      const a = [];
      for (const prop in value) {
        // TODO 可能有多个选择要加入数组
        if (!this.iszcjjllxOption(prop)) {
          a.push(value[prop]);
        }
      }
      o[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.zcjjllxData = o;

    const o2: { [key: string]: any } = {};
    for (const key in this.zcjjllxform) {
      const value = this.zcjjllxform[key];
      const a = [];
      for (const prop in value) {
        // TODO 可能有多个选择要加入数组
        if (this.iszcjjllxOption(prop)) {
          a.push(value[prop]);
        }
      }
      o2[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.zcjjllxOption = o2;
  }

  // 序列支点横梁类型
  serializezdhllxform() {
    const o: { [key: string]: any } = {};
    for (const key in this.zdchlform) {
      const value = this.zdchlform[key];
      const a = [];
      for (const prop in value) {
        if (!this.iszdchlsjOption(prop)) {
          a.push(value[prop]);
        }
      }

      // VLS加劲板的参数设置
      const value0 = this.zdchlform1[key].vLSData[0];
      // VLS加劲板设置 != 不设置 时才序列化数据
      // if (this.vLSData.VLSjjbsz !== 2 /* 不设置 */) {
      for (const prop in value0) {
        if (!this.iszdchlsjOption(prop)) {
          a.push(value0[prop]);
        }
      }
      // }

      // VLX加劲板的参数设置
      const value1 = this.zdchlform0[key].vLXData[0];
      // VLX加劲板设置 != 不设置 时才序列化数据
      // if (this.vLXData.VLXjjbsz !== 2 /* 不设置 */) {
      for (const prop in value1) {
        if (!this.iszdchlsjOption(prop)) {
          a.push(value1[prop]);
        }
      }
      //  }

      // 支点横梁腹板人孔设计
      const value2 = this.zdhlfbrksjform[key].rkData[0];
      for (const prop in value2) {
        if (!this.iszdchlsjOption(prop)) {
          a.push(value2[prop]);
        }
      }

      // 人孔参数表
      const value3 = this.zdchlform2[key].rklxData[this.rkData.rklx];
      for (const prop in value3) {
        if (!this.iszdchlsjOption(prop)) {
          a.push(value3[prop]);
        }
      }

      o[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.zdhllxData = o;
    this.jsonDataService.uiJSON.zdhlform = [
      this.zdchlsjform.HLFB_YYB_ZFB_R,
      this.zdchlsjform.HLFB_HLDB_ZLFB_R,
      this.zdchlsjform.HLDB_YYB_R
    ].join();

    const o2: { [key: string]: any } = {};
    for (const key in this.zdchlform) {
      const value = this.zdchlform[key];
      const a = [];
      for (const prop in value) {
        if (this.iszdchlsjOption(prop)) {
          a.push(value[prop]);
        }
      }
      const value0 = this.zdchlform1[key].vLSData[0];
      // if (this.vLSData.VLSjjbsz !== 2) {
      for (const prop in value0) {
        if (this.iszdchlsjOption(prop)) {
          a.push(value0[prop]);
        }
      }
      // }

      const value1 = this.zdchlform0[key].vLXData[0];
      // if (this.vLXData.VLXjjbsz !== 2) {
      for (const prop in value1) {
        if (this.iszdchlsjOption(prop)) {
          a.push(value1[prop]);
        }
      }
      // }

      const value2 = this.zdhlfbrksjform[key].rkData[0];
      for (const prop in value2) {
        if (this.iszdchlsjOption(prop)) {
          a.push(value2[prop]);
        }
      }

      const value3 = this.zdchlform2[key].rklxData[this.rkData.rklx];
      for (const prop in value3) {
        if (this.iszdchlsjOption(prop)) {
          a.push(value3[prop]);
        }
      }

      o2[key] = a.join(",");
    }
    this.jsonDataService.uiJSON.zdhllxOption = o2;
  }

  // 序列端封板DFB设计
  serializedfbsjform() {
    this.jsonDataService.uiJSON.dfbData = [
      this.dfbsjform.DFB_DFt,
      this.dfbsjform.DFB_L,
      this.dfbsjform.DFB_DBY,
      this.dfbsjform.DFB_DBt,
      this.dfbsjform.SL_LZ,
      this.dfbsjform.SL_LY,
      this.dfbsjform.SL_SLt,
      this.dfbsjform.SL_SLb,
      this.dfbsjform.SL_HY,
      this.dfbsjform.SL_HD,
      this.dfbsjform.SL_b,
      this.dfbsjform.SL_hf2,
      this.dfbsjform.VL_VH,
      this.dfbsjform.VL_VLt,
      this.dfbsjform.VL_VLb,
      this.dfbsjform.VL_L1,
      this.dfbsjform.VL_b,
      this.dfbsjform.VL_R,
      this.dfbsjform.VL_hf1,
      this.dfbsjform.VL_hf2,
      this.dfbsjform.YYB_FB_R,
      this.dfbsjform.YYB_FB_D,
      this.dfbsjform.DB_FB_R,
      this.dfbsjform.DB_FB_D,
      this.dfbsjform.YYB_DFB_R,
      this.dfbsjform.YYB_DFB_h
    ].join();

    this.jsonDataService.uiJSON.dfbOption = [
      this.dfbsjform.dbdqfs,
      this.dfbsjform.dbdbktsz
    ].join();
  }

  // 反序列化腹板竖肋设计
  deserializeFbslform() {
    const sllxData = this.jsonDataService.uiJSON.sllxData;
    for (const key in sllxData) {
      const value = sllxData[key];
      const valArray = value.split(",");
      const fbslformKey0 = this.fbslform[key][0];
      let index = 0;
      for (const prop in fbslformKey0) {
        // TODO 可能有多个选择要加入数组
        if (prop !== "xbdjselectvalue") {
          fbslformKey0[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }

    const sllxOption = this.jsonDataService.uiJSON.sllxOption;
    for (const key in sllxOption) {
      const value = sllxOption[key];
      const valArray = value.split(",");
      const fbslformKey0 = this.fbslform[key][0];
      let index = 0;
      for (const prop in fbslformKey0) {
        // TODO 可能有多个选择要加入数组
        if (prop === "xbdjselectvalue") {
          fbslformKey0[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }
  }

  // 反序列化横隔类型
  deserializehglxform() {
    const hglxData = this.jsonDataService.uiJSON.hglxData;
    for (const key in hglxData) {
      const value = hglxData[key];
      const valArray = value.split(",");
      const hglxformKey0 = this.hglxform[key][0];
      let index = 0;
      for (const prop in hglxformKey0) {
        // TODO 可能有多个选择要加入数组
        if (prop !== "dbdyxselectvalue") {
          hglxformKey0[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }

    const hglxOption = this.jsonDataService.uiJSON.hglxOption;
    for (const key in hglxOption) {
      const value = hglxOption[key];
      const valArray = value.split(",");
      const hglxformKey0 = this.hglxform[key][0];
      let index = 0;
      for (const prop in hglxformKey0) {
        // TODO 可能有多个选择要加入数组
        if (prop === "dbdyxselectvalue") {
          hglxformKey0[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }
  }

  //  反序列化人孔类型
  deserializerklxform() {
    const rklxData = this.jsonDataService.uiJSON.rklxData;
    for (const key in rklxData) {
      const value = rklxData[key];
      const valArray = value.split(",");
      const rklxformKey0 = this.rklxform[key][0];
      let index = 0;
      for (const prop in rklxformKey0) {
        // TODO 可能有多个选择要加入数组
        if (!HeGeXi.isRklxOption(prop)) {
          rklxformKey0[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }

    const rklxOption = this.jsonDataService.uiJSON.rklxOption;
    for (const key in rklxOption) {
      const value = rklxOption[key];
      const valArray = value.split(",");
      const rklxformKey0 = this.rklxform[key][0];
      let index = 0;
      for (const prop in rklxformKey0) {
        // TODO 可能有多个选择要加入数组
        if (HeGeXi.isRklxOption(prop)) {
          rklxformKey0[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }
  }

  // 反序列化横联类型
  deserializehllxform() {
    const hllxData = this.jsonDataService.uiJSON.hllxData;
    for (const key in hllxData) {
      const value = hllxData[key];
      const valArray = value.split(",");
      const hllxformKey = this.dlslxform[key];
      let index = 0;
      for (const prop in hllxformKey) {
        // TODO 可能有多个选择要加入数组
        if (!this.isXjhlOption(prop)) {
          hllxformKey[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }

    const hllxOption = this.jsonDataService.uiJSON.hllxOption;
    for (const key in hllxOption) {
      const value = hllxOption[key];
      const valArray = value.split(",");
      const hllxformKey = this.dlslxform[key];
      let index = 0;
      for (const prop in hllxformKey) {
        // TODO 可能有多个选择要加入数组
        if (this.isXjhlOption(prop)) {
          hllxformKey[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }
  }

  // 反序列化支座个数
  deserializezzgsform() {
    const zzgsData = this.jsonDataService.uiJSON.zzgsData;
    for (const key in zzgsData) {
      const value = zzgsData[key];
      const valArray = value.split(",");
      const zzgsformKey = this.zzgsform[key];
      let index = 0;
      for (const prop in zzgsformKey) {
        // TODO 可能有多个选择要加入数组
        zzgsformKey[prop] = parseFloat(valArray[index]);
        ++index;
      }
    }
  }

  // 反序列化支承加劲肋类型
  deserializezcjjllxform() {
    const zcjjllxData = this.jsonDataService.uiJSON.zcjjllxData;
    for (const key in zcjjllxData) {
      const value = zcjjllxData[key];
      const valArray = value.split(",");
      const zcjjllxformKey = this.zcjjllxform[key];
      let index = 0;
      for (const prop in zcjjllxformKey) {
        // TODO 可能有多个选择要加入数组
        if (!this.iszcjjllxOption(prop)) {
          zcjjllxformKey[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }

    const zcjjllxOption = this.jsonDataService.uiJSON.zcjjllxOption;
    for (const key in zcjjllxOption) {
      const value = zcjjllxOption[key];
      const valArray = value.split(",");
      const zcjjllxformKey = this.zcjjllxform[key];
      let index = 0;
      for (const prop in zcjjllxformKey) {
        // TODO 可能有多个选择要加入数组
        if (this.iszcjjllxOption(prop)) {
          zcjjllxformKey[prop] = parseFloat(valArray[index]);
          ++index;
        }
      }
    }
  }

  // 反序列化支点横梁类型
  deserializezdhllxform() {
    const o: { [key: string]: any } = this.jsonDataService.uiJSON.zdhllxData;
    for (const key in this.zdchlform) {
      const a = (o[key] as string)
        .split(",")
        .map((str: string) => parseFloat(str));
      const value = this.zdchlform[key];
      let index = 0;
      for (const prop in value) {
        if (!this.iszdchlsjOption(prop)) {
          value[prop] = a[index];
          ++index;
        }
      }

      // VLS加劲板的参数设置
      const value0 = this.zdchlform1[key].vLSData[0];
      // VLS加劲板设置 != 不设置 时才序列化数据
      // if (this.vLSData.VLSjjbsz !== 2 /* 不设置 */) {
      for (const prop in value0) {
        if (!this.iszdchlsjOption(prop)) {
          value0[prop] = a[index];
          ++index;
        }
      }
      // }

      // VLX加劲板的参数设置
      const value1 = this.zdchlform0[key].vLXData[0];
      // VLX加劲板设置 != 不设置 时才序列化数据
      //  if (this.vLXData.VLXjjbsz !== 2 /* 不设置 */) {
      for (const prop in value1) {
        if (!this.iszdchlsjOption(prop)) {
          value1[prop] = a[index];
          ++index;
        }
      }
      // }

      // 支点横梁腹板人孔设计
      const value2 = this.zdhlfbrksjform[key].rkData[0];
      for (const prop in value2) {
        if (!this.iszdchlsjOption(prop)) {
          value2[prop] = a[index];
          ++index;
        }
      }

      // 人孔参数表
      const value3 = this.zdchlform2[key].rklxData[this.rkData.rklx];
      for (const prop in value3) {
        if (!this.iszdchlsjOption(prop)) {
          value3[prop] = a[index];
          ++index;
        }
      }
    }

    const formArray: string[] = this.jsonDataService.uiJSON.zdhlform.split(",");
    this.zdchlsjform.HLFB_YYB_ZFB_R = Number(formArray[0]);
    this.zdchlsjform.HLFB_HLDB_ZLFB_R = Number(formArray[1]);
    this.zdchlsjform.HLDB_YYB_R = Number(formArray[2]);

    const o2: { [key: string]: any } = this.jsonDataService.uiJSON.zdhllxOption;
    for (const key in this.zdchlform) {
      const a = (o2[key] as string)
        .split(",")
        .map((str: string) => parseFloat(str));
      const value = this.zdchlform[key];
      let index = 0;
      for (const prop in value) {
        if (this.iszdchlsjOption(prop)) {
          value[prop] = a[index];
          ++index;
        }
      }

      const value0 = this.zdchlform1[key].vLSData[0];
      for (const prop in value0) {
        if (this.iszdchlsjOption(prop)) {
          value0[prop] = a[index];
          ++index;
        }
      }

      const value1 = this.zdchlform0[key].vLXData[0];

      for (const prop in value1) {
        if (this.iszdchlsjOption(prop)) {
          value1[prop] = a[index];
          ++index;
        }
      }

      const value2 = this.zdhlfbrksjform[key].rkData[0];
      for (const prop in value2) {
        if (this.iszdchlsjOption(prop)) {
          value2[prop] = a[index];
          ++index;
        }
      }

      const value3 = this.zdchlform2[key].rklxData[this.rkData.rklx];
      for (const prop in value3) {
        if (this.iszdchlsjOption(prop)) {
          value3[prop] = a[index];
          ++index;
        }
      }
    }
  }

  // 反序列端封板DFB设计
  deserializedfbsjform() {
    const a = this.jsonDataService.uiJSON.dfbData
      .split(",")
      .map((str: string) => parseFloat(str));
    this.dfbsjform.DFB_DFt = a[0];
    this.dfbsjform.DFB_L = a[1];
    this.dfbsjform.DFB_DBY = a[2];
    this.dfbsjform.DFB_DBt = a[3];
    this.dfbsjform.SL_LZ = a[4];
    this.dfbsjform.SL_LY = a[5];
    this.dfbsjform.SL_SLt = a[6];
    this.dfbsjform.SL_SLb = a[7];
    this.dfbsjform.SL_HY = a[8];
    this.dfbsjform.SL_HD = a[9];
    this.dfbsjform.SL_b = a[10];
    this.dfbsjform.SL_hf2 = a[11];
    this.dfbsjform.VL_VH = a[12];
    this.dfbsjform.VL_VLt = a[13];
    this.dfbsjform.VL_VLb = a[14];
    this.dfbsjform.VL_L1 = a[15];
    this.dfbsjform.VL_b = a[16];
    this.dfbsjform.VL_R = a[17];
    this.dfbsjform.VL_hf1 = a[18];
    this.dfbsjform.VL_hf2 = a[19];
    this.dfbsjform.YYB_FB_R = a[20];
    this.dfbsjform.YYB_FB_D = a[21];
    this.dfbsjform.DB_FB_R = a[22];
    this.dfbsjform.DB_FB_D = a[23];
    this.dfbsjform.YYB_DFB_R = a[24];
    this.dfbsjform.YYB_DFB_h = a[25];

    const o = this.jsonDataService.uiJSON.dfbOption
      .split(",")
      .map((str: string) => parseFloat(str));
    this.dfbsjform.dbdqfs = o[0];
    this.dfbsjform.dbdbktsz = o[1];
  }

  serialize() {
    console.log("序列化横隔系开始");
    this.serializeFbslform();
    this.serializehglxform();
    this.serializerklxform();
    this.serializehllxform();
    this.serializezzgsform();
    this.serializezcjjllxform();
    this.serializezdhllxform();
    this.serializedfbsjform();
    console.log("序列化横隔系结束");
  }

  deserialize() {
    console.log("反序列化横隔系开始");
    this.deserializeFbslform();
    this.deserializehglxform();
    this.deserializerklxform();
    this.deserializehllxform();
    this.deserializezzgsform();
    this.deserializezcjjllxform();
    this.deserializezdhllxform();
    this.deserializedfbsjform();
    console.log("反序列化横隔系结束");
  }
}
</script>
<style scoped lang="scss">
#shuLeiXingHaoForm {
  width: 100%;
  position: relative;
}
#zhongJianHengGeTable {
  width: 100%;
  position: relative;
}
#renKongLeiXingTable {
  width: 100%;
  position: relative;
}
#hengLianLeiXingForm {
  width: 100%;
  position: relative;
}
#zhiChengJiaJinLeiLeiXingForm {
  width: 100%;
  position: relative;
}
#zhiDianHengLIangFuBanRenKongSheJi {
  width: 100%;
  position: relative;
}
#zhiDianChuHengLiangForm {
  width: 100%;
  position: relative;
}
.animate {
  animation: slidein 1s ease-in-out;
}

@keyframes slidein {
  from {
    left: 100%;
  }

  to {
    left: 0%;
  }
}
</style>
<style lang="scss">
</style>
