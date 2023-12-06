// @ts-nocheck
import  { forwardRef, useRef } from 'react';
import useContextHandler from '../useContextHandler';
import GridLayout from 'react-grid-layout';
import {
  generateGridEles,
  getUuidFromLayoutEleKey,
  TxtUtil,
  FormatEleProps,
} from '../helper';
import { deepClone, getUuid, FloatFormater } from '../../utils';
import { GridDefault } from '../constant';
import { useDrop } from 'ahooks';

const EleCanvas = forwardRef((_, ref) => {
  let {
    viewSize,
    widthRatio,
    heightRatio,
    eleList,
    setEleList,
    setSelectedEleKey,
    selectedEleKey,
    baseInfo,
  } = useContextHandler();
  const [width, height] = viewSize;
  const containerStyle = { width: `${width}px`, height: `${height}px` }; // 转换后的容器宽高

  // 过滤掉背景音乐类型，因为它不需要布局
  const showedEles = eleList.filter(
    (item) => item.type !== 'audio'
  ) as Array<TEleWithLayout>;
  // 在视图中需要对元素的宽高也进行同比例处理
  // 把数据处理成GridLayout要求的数据结构

  // 拖拽近区域
  const dropRef = useRef(null);
  useDrop(dropRef, {
    onDom: (type: string, e: React.DragEvent) => {
      const newItem = deepClone(GridDefault[type]);
      if (newItem) {
        newItem.uuid = getUuid();
        newItem.type = type;
        FormatEleProps(newItem, baseInfo);

        // 这里的e是鼠标。
        // 这是相对于父元素的偏移量，是画布中实际的，需要转换成原数据
        newItem.x = e.layerX * widthRatio;
        // y点不能直接设定，因为容器可能超出范围。需要判断
        if (
          e.layerY + FloatFormater(newItem.height / heightRatio, 0) >
          height
        ) {
          newItem.y = height * heightRatio - newItem.height;
        } else {
          newItem.y = e.layerY * heightRatio;
        }

        eleList.push(newItem);
        setEleList(() => [...eleList]);
      }
    },
  });

  // 画布内拖拽
  const handleMove = (prop) => {
    const [targetItem] = prop;
    const layoutUuid = getUuidFromLayoutEleKey(targetItem.i);
    const idx = eleList.findIndex((ele) => ele.uuid === layoutUuid);
    if (idx !== -1) {
      setSelectedEleKey(layoutUuid);
      const newEle = deepClone(eleList[idx]) as TEleWithLayout;
      const { x, y } = targetItem;
      newEle.x = x * widthRatio;
      newEle.y = y * heightRatio;
      eleList[idx] = newEle;
    }
    setEleList([...eleList]);
  };

  // 伸缩
  const handleResizeEle = (prop) => {
    const [targetItem] = prop;
    console.log(targetItem)
    const layoutUuid = getUuidFromLayoutEleKey(targetItem.i);
    const idx = eleList.findIndex((ele) => ele.uuid === layoutUuid);
    console.log(layoutUuid)

    if (idx !== -1) {
      setSelectedEleKey(layoutUuid);
      const newEle = deepClone(eleList[idx]) as TEleWithLayout;
      const { w, h } = targetItem;
      newEle.width = w * widthRatio;
      newEle.height = h * heightRatio;
      // 对应普通文字来说，要根据它的高度去修改文字大小，同时计算宽度
      if (TxtUtil.isType(newEle.type)) {
        TxtUtil.formatFontSize(newEle);
      }

      eleList[idx] = newEle;
    }
    setEleList([...eleList]);
  };

  return (
    <div className="MediaLayout-EleCanvas" ref={ref}>
      <div
        className="MediaLayout-EleCanvas-PreviewBox"
        style={containerStyle}
        ref={dropRef}
      >
        {width !== 0 && (
          <GridLayout
            className="layout"
            width={width}
            cols={width}
            rowHeight={1}
            margin={[0, 0]}
            style={containerStyle}
            compactType={null} 
            allowOverlap={true}
            onDragStop={handleMove}
            onResizeStop={handleResizeEle}
            isBounded={true} // 防止出界
          >
            {generateGridEles(showedEles, {
              selectedEleKey,
              setSelectedEleKey,
              widthRatio,
              heightRatio,
            })}
          </GridLayout>
        )}
      </div>
    </div>
  );
});

export default EleCanvas;
