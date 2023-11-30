import LayoutContext from './Context';
import { useContext } from 'react';
import { deepClone } from '../utils';
import { TxtUtil, CaptionUtil } from './helper';

const useContextHandler = () => {
  let {
    eleList,
    selectedEleKey,
    setSelectedEleKey,
    setEleList,
    fileList,
    setBaseInfo,
    baseInfo,
    widthRatio,
    heightRatio,
    viewSize,
  } = useContext(LayoutContext);

  // 扩展：当前选中元素
  const eleInfoIdx = eleList.findIndex((item) => item.uuid === selectedEleKey);
  const eleInfo = eleList[eleInfoIdx];

 // 扩展：表单中修改基础信息 （节目名称，节目宽度，节目高度）
  const handleBaseInputChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    handleBaseSelectChange(name, value);
  };
  const handleBaseSelectChange = (name: string, value: any) => {
    setBaseInfo({
      ...baseInfo,
      [name]: value,
    });
  };

  // 扩展：表单中修改元素属性
  const handleEleInputChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    handleEleSelectChange(name, value);
  };
  const handleEleSelectChange = (name: string, value: any) => {
     // 对于复杂的数据，就比如现在的eleList
	   // 修改里面的元素属性时，是不能直接在原来地址上修改的
	   // 因为根据原理，状态只会对比第一层，再深层的是检测不到的，
	   // 所以如果地址没有变更，只是在原地址修改，渲染时将监测不到变化，从而不会重新渲染。
	   // 因此这里需要对修改的对象进行一次深克隆,来重置它的地址
    let newEleInfo = deepClone(eleInfo);
    newEleInfo[name] = value;

      // 联动关系：对于文本类型，如果修改了字体大小，根据字体大小定义它在画布中的宽高
    switch (name) {
      case 'fontSize':
        if (TxtUtil.isType(eleInfo.type)) {
          TxtUtil.toRect(newEleInfo);
        }

        if (CaptionUtil.isType(eleInfo.type)) {
          CaptionUtil.toRect(newEleInfo, baseInfo.program_width);
        }
        break;
      default:
        break;
    }
    // 最后再修改状态
    setEleList((prev) => {
      prev[eleInfoIdx] = newEleInfo;
      return [...prev];
    });
  };

  // 删除元素
  const handleDelEle = (uuid: string) => {
    const idx = eleList.findIndex((item) => item.uuid === uuid);
    eleList.splice(idx, 1);
    setEleList([...eleList]);
  };

  return {
    eleList,
    setEleList,
    selectedEleKey,
    setSelectedEleKey,
    fileList,
    baseInfo,
    widthRatio,
    heightRatio,
    viewSize,

    // 额外的
    handleEleInputChange,
    handleEleSelectChange,
    eleInfo,
    handleDelEle,
    handleBaseInputChange,
    handleBaseSelectChange,
  };
};
export default useContextHandler;
