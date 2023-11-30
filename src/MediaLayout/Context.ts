import { createContext } from 'react';
type LayoutProviderValue = {
  selectedEleKey: string; // 选中元素的uuid
  setSelectedEleKey: any; // 修改 选中元素的uuid
  eleList: TEleList; // 元素列表
  setEleList: any; // 修改 元素列表
  fileList: Array<any>; // 文件列表（源）
  baseInfo: TBaseInfo; // 节目基本信息
  setBaseInfo: any; // 修改 节目基本信息
  widthRatio: number;
  heightRatio: number;
  viewSize: TSize;
};

const LayoutContext = createContext<LayoutProviderValue | undefined>(undefined);

export default LayoutContext;
