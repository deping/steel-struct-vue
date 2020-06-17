export class ComponentInfo {
  msg!: string;
  code!: string;
  success!: string;
  cJson!: string;
  uiJson!: string;
  data!: {
    id: string;
    projectId: string;
    componentName: string;
    remark: string;
    type: string;
    componentInputParamList: {
      id: string;
      componentId: string;
      inputParam: string;
      jsonFile: string;
      jsonFlag: string;
      createTime: string;
      updateTime: string;
    }[];
    componentInputFileList: {
      id: string;
      userId: string;
      componentId: string;
      oriFileName: string;
      desFileName: string;
      fileFlag: string;
      createTime: string;
      updateTime: string;
    }[];
  };
}
