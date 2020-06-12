import { Table, Upload } from "element-ui";
import { ElUploadInternalFileDetail } from "element-ui/types/upload";

export class ElTable2 extends Table {
  selection: any[];
}
export class ElUpload2 extends Upload {
  uploadFiles: ElUploadInternalFileDetail[];
}
