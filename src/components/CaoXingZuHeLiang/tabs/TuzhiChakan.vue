<template>
  <div id="container">
    <div id="message" ref="messagePane"></div>
    <div id="lower-pane">
      <div id="lower-left">
        <div>
          <el-button
            id="generate"
            type="primary"
            @click="generateDrawings"
            :disabled="generateDisabled"
          >
            出图
          </el-button>
          <span ref="feedback"></span>
        </div>
        <el-table
          ref="drawingTable"
          :data="drawings"
          stripe
          :header-cell-style="headerCellStyle"
          @cell-click="openPDF"
          height="calc(100% - 100px)"
          row-class-name="drawing-row"
        >
          <el-table-column type="selection" width="40" :selectable="selectable">
          </el-table-column>
          <el-table-column
            class-name="file"
            show-overflow-tooltip
            prop="fileName"
            label="文件"
          >
          </el-table-column>
          <el-table-column prop="dxfPrice" label="价格" width="60">
          </el-table-column>
        </el-table>
        <div id="buy">
          <el-button @click="buy" type="primary">购买选中图纸</el-button>
        </div>
      </div>
      <div id="lower-right" ref="pdfViewerContainer">
        <!-- <app-cad-viewer #cadviewer></app-cad-viewer> -->
        <!-- <embed type="application/pdf" #pdfviewer> -->
        <!-- <object type="application/pdf" #pdfviewer></object> -->
        <iframe scrolling="no" ref="pdfViewer"></iframe>
      </div>
    </div>
    <qrcode-dlg
      @paid="onPaid"
      :buyUrl="buyUrl"
      :visible.sync="visible"
    ></qrcode-dlg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Persist } from "@/components/ConstructBase";
import { State /* , Getter, Action, Mutation, namespace */ } from "vuex-class";
import { getAjaxUrl } from "@/utils/path";
import { generateUUID, getWsUrl, setCurrentRow } from "@/utils/misc";
import axios from "axios";
import { ThreeModelFile } from "@/components/ThreeJs.vue";
import { ElTable2 } from "@/typings/element-ui";
import QRCodeDlg from "@/components/QRCodeDlg.vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ResizeSensor } = require("css-element-queries");

class DrawingItem {
  id = 0;
  fileName = "";
  dxfFileUrl = "";
  dxfPrice = 0;
  vsfFileUrl?: string = undefined;
  pdfFileUrl = "";
  pdfPrice = 0;
  buyed = false;
}

@Component({
  components: {
    "qrcode-dlg": QRCodeDlg
  }
})
export default class TuzhiChakan extends Vue {
  name = "tuzhi-chakan";

  drawings: DrawingItem[] = [];
  threeModel: ThreeModelFile = { modelUrl: "" };
  buyUrl = "";
  visible = false;
  generateDisabled = false;
  webSocket?: WebSocket;
  resizeSensor: any = undefined;

  @State construct_id!: string;
  @State currentConstruct!: Vue & Persist;

  $refs!: {
    messagePane: HTMLDivElement;
    feedback: HTMLSpanElement;
    pdfViewer: HTMLIFrameElement;
    drawingTable: ElTable2;
    pdfViewerContainer: HTMLDivElement;
  };

  mounted() {
    this.resizeSensor = new ResizeSensor(
      this.$refs.pdfViewerContainer,
      this.onDivResize.bind(this)
    );
    this.disablePDFContextMenu();
  }

  onDivResize(size: { width: number; height: number }) {
    this.$refs.pdfViewer.width = size.width - 0 + "px";
    this.$refs.pdfViewer.height = size.height - 0 + "px";
  }

  selectable(row: DrawingItem) {
    return !row.buyed;
  }

  findIndex(row: DrawingItem) {
    for (let i = 0; i < this.drawings.length; ++i) {
      if (row.id === this.drawings[i].id) {
        return i;
      }
    }
    return -1;
  }

  openPDF(row: DrawingItem, column: { label: string }) {
    if (row && column.label === "文件") {
      const index = this.findIndex(row);
      if (index !== -1) {
        setTimeout(() => {
          this.setCurrentRow(index);
        }, 0);
      }
      this.$refs.pdfViewer.src = row.pdfFileUrl;
      setTimeout(() => this.disablePDFContextMenu(), 0);
    }
  }

  private disablePDFContextMenu() {
    const pdfViewer = this.$refs.pdfViewer;
    const disableContextMenu = (e: MouseEvent) => {
      if (e.button === 2) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    };
    // if iframe and its parent aren't in the same origin, iframe.contentDocument will be null.
    if (pdfViewer && pdfViewer.contentDocument) {
      pdfViewer.contentDocument.addEventListener(
        "mousedown",
        disableContextMenu,
        false
      );
      pdfViewer.contentDocument.addEventListener(
        "contextmenu",
        disableContextMenu,
        false
      );
    }
  }

  async onPaid(buyUrl: string) {
    const pos = buyUrl.indexOf("?");
    if (pos === -1) return;
    let checkUrl = "/pay/goods/isPaid.html";
    const queryString = buyUrl.substring(pos);
    checkUrl = getAjaxUrl(checkUrl + queryString);

    for (let i = 0; i < 3; ++i) {
      try {
        const res = await axios.get(checkUrl);
        switch (res.data.code) {
          case "00100":
            for (const drawing of this.$refs.drawingTable.selection) {
              (drawing as DrawingItem).buyed = true;
            }
            this.$message({
              message: "购买成功！",
              type: "success"
            });
            return;
          case "00101":
          default:
            console.log("尚未支付!");
            // 未完成支付，等待1秒后继续查询
            if (i !== 2) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
            break;
        }
      } catch (err) {
        // 查询出错，等待1秒后继续查询
        if (i !== 2) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    this.$message.error(
      "没有查询到已经支付成功，请稍后检查下载页面是否已经购买这个图纸，如果仍然没有请联系客服。"
    );
  }

  buy() {
    let buyUrl = "/pay/goods/batchQrPay.html";
    let queryString = "?goodsInfo=";
    let count = 0;
    for (const drawing of this.$refs.drawingTable.selection) {
      const d = drawing as DrawingItem;
      if (!d.buyed) {
        ++count;
        queryString += drawing.id + ",dxf;";
      }
    }
    if (count === 0) {
      return;
    }
    buyUrl = getAjaxUrl(buyUrl + queryString); // 只能是http://bim.doctorbridge.com/pay/goods/batchQrPay.html

    this.buyUrl = buyUrl;
    this.visible = true;

    // // 支付暂时不可用，先直接保存
    // let url = "/calc/paid/savePaidDrawing";
    // const data = new FormData();
    // let drawInfo = "";
    // this.buyedItems.forEach((item) => {
    //   drawInfo += item.id + ",dxf;";
    // });
    // data.append("drawInfo", drawInfo);
    // this.http.post(modifyAjaxUrl(url), data, { withCredentials: true }).subscribe((value) => {
    //   alert("购买成功！");
    //   this.updateCheckBoxAfterBuy();
    // });
  }

  async generateDrawings() {
    await this.currentConstruct.save();
    await this.generateDrawingsWoSave();
  }

  async generateDrawingsWoSave() {
    // 防止重入
    if (this.generateDisabled) {
      return;
    }
    this.generateDisabled = true;
    this.$refs.feedback.textContent = "请稍候...";
    try {
      const formData: FormData = new FormData();
      const uuid: string = generateUUID();
      formData.append("componentId", this.construct_id);
      formData.append("random", uuid);
      const res = await axios.post(getAjaxUrl("/calc/onlyDraw"), formData);
      if (res.data.code === "00100") {
        this.$refs.feedback.textContent = "正在生成图形...";
        this.updateMessage(uuid);
        for (let i = 0; i < 120; ++i) {
          try {
            const res2 = await axios.get(getAjaxUrl("/calc/getAllFile"), {
              params: { componentId: this.construct_id }
            });
            switch (res2.data.code) {
              case "00100":
                try {
                  this.fillDrawings(res2.data.data);
                  this.openPDF(this.drawings[0], { label: "文件" });
                } catch (err) {
                  console.log(err.message);
                }
                break;
              case "00103":
                // 出图中，等待10秒后继续查询
                console.log("出图中...");
                await new Promise(resolve => setTimeout(resolve, 10 * 1000));
                break;
              default:
                break;
            }
            if (
              res2.data.code === "00100" /* 出图成功 */ ||
              res2.data.code === "00102" /* 出图失败 */
            ) {
              break;
            }
          } catch (err) {
            console.log(err.message);
          }
        }
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    } catch (err) {}
    this.generateDisabled = false;
    this.$refs.feedback.textContent = "";
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = undefined;
    }
  }

  updateMessage(uuid: string) {
    this.$refs.messagePane.innerHTML = "";
    this.webSocket = new WebSocket(getWsUrl(this.construct_id + "/" + uuid));
    this.webSocket.onmessage = (event: MessageEvent) => {
      // 自动滚动到最下方
      this.$refs.messagePane.scrollTop = this.$refs.messagePane.scrollHeight;
      const line = document.createElement("p");
      const message = event.data as string;
      const colonPos = message.indexOf(":");
      if (colonPos !== -1) {
        const stateCode = message.substring(0, colonPos);
        line.innerText = message.substring(colonPos + 1);
        switch (stateCode) {
          case "0":
            line.style.color = "red";
            break;
          case "1":
            line.style.color = "blue";
            break;
          case "2":
          default:
            line.style.color = "black";
            break;
        }
      } else {
        line.innerText = message;
        line.style.color = "black";
      }
      this.$refs.messagePane.appendChild(line);
    };
  }

  fillDrawings(data: any) {
    try {
      this.drawings = [];
      this.threeModel.modelUrl = undefined;
      this.threeModel.mtlUrl = undefined;
      this.threeModel.picUrls = [];
      if (data.FileList) {
        for (const element of data.FileList) {
          const item = new DrawingItem();
          item.dxfFileUrl = getAjaxUrl(element.dxfFileUrl);
          item.vsfFileUrl = getAjaxUrl(element.vsfFileUrl);
          item.pdfFileUrl = getAjaxUrl(element.pdfFileUrl);
          item.fileName = element.fileName;
          item.id = element.id;
          item.pdfPrice = element.pdfPrice;
          item.dxfPrice = element.dxfPrice;
          this.drawings.push(item);
        }
      }
      const modelList = data.modelList;
      if (modelList) {
        this.threeModel.modelUrl = modelList.objFileUrl
          ? (getAjaxUrl(modelList.objFileUrl) as string)
          : undefined;
        this.threeModel.mtlUrl = modelList.mtlFileUrl
          ? getAjaxUrl(modelList.mtlFileUrl)
          : undefined;
        this.threeModel.picUrls = modelList.pngFileUrl.map(getAjaxUrl);
        this.$emit("modelChange", this.threeModel);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  setCurrentRow(index: number) {
    return setCurrentRow(this.$refs.drawingTable.$el, "drawing-row", index);
  }

  headerCellStyle(indicator: any) {
    if (indicator.rowIndex === 0) {
      return "background-color: rgb(84, 92, 100);color: white;font-weight: 700;";
    }
  }
}
</script>

<style lang="scss" scoped>
$messageHeight: 200px;
$leftWidth: 300px;
#container {
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  #message {
    flex-grow: 0;
    overflow: auto;
    border: 1px solid black;
    width: calc(100% - 2px);
    height: $messageHeight;
    text-align: left;
  }

  #lower-pane {
    margin: 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: calc(100% - #{$messageHeight});
    margin: 0px;

    #lower-left {
      flex-grow: 0;
      margin: 0px;
      width: $leftWidth;
      height: 100%;
      border-right: 1px solid black;

      el-table {
        width: 100%;
      }
    }

    #lower-right {
      margin: 0px;
      flex-grow: 1;
      width: calc(100% - #{$leftWidth} - 1px);
      height: calc(100% - 0px);

      iframe {
        margin: 0px;
        border: 0px;
      }
    }
  }
}
</style>
<style lang="scss">
#container #lower-pane #lower-left button.el-button {
  margin: 5px;
}

#message > p {
  margin: 2px 0px;
}

table.el-table__body tr.current-row > td {
  background-color: #ffff50;
}

table.el-table__body tr > td.file {
  cursor: zoom-in;
}
</style>
