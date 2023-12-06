import { getFileName, FloatFormater, getDate, getUuid } from '../utils';
import {
  CustomerServiceFilled,
  PictureFilled,
  PlaySquareFilled,
  FontSizeOutlined,
  VideoCameraFilled,
} from '@ant-design/icons';
import FilesBox from './ElePropPanel/FilesBox';
import { Form, Input, InputNumber, Select, ColorPicker, Carousel } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { ReactNode } from 'react';
import VideoPlayer from './EleCanvas/VideoPlayer';
import SvgIcon from '../assets/SvgIcon';
import Marquee from 'react-fast-marquee';
import { FILE_PATH } from './constant'

// 字幕相关方法
export const CaptionUtil = {
  isType: (type: string) => type === 'caption',
  // 初始化elelist属性时用到。原本的文字属性没有宽高，需要根据字体大小定义宽高
  toRect: function (item, programWidth: number) {
    item.height = FloatFormater(item.fontSize * 2, 0);
    item.width = programWidth;
  },
  // 根据真实的字体大小，转化为适合放在画布内的字体大小(真实转虚拟)
  getStyle: function (ele: TCaptionEle, { widthRatio }) {
    return {
      color: ele.color,
      fontSize: FloatFormater(ele.fontSize / widthRatio, 0),
    };
  },
};
// 普通文本相关方法
export const TxtUtil = {
  isType: (type: string) =>
    type === 'date' || type === 'time' || type === 'week',
  // 根据字体大小调整宽度
  formatWidth: function (item) {
    switch (item.type) {
      case 'date':
        item.width = item.fontSize * 6;
        break;
      case 'time':
        item.width = item.fontSize * 5;
        break;
      case 'week':
        item.width = item.fontSize * 3;
        break;
      default:
        break;
    }
  },
  // 初始化elelist属性时用到。原本的文字属性没有宽高，需要根据字体大小定义宽高
  toRect: function (item) {
    item.height = FloatFormater(item.fontSize * 2, 0);
    this.formatWidth(item);
  },
  // 伸缩画布中的文字元素时用到。根据伸缩的高度去定义字体大小，并且调整宽度，让元素更美观些
  formatFontSize: function (item) {
    item.fontSize = FloatFormater(item.height / 2, 0);
    this.formatWidth(item);
  },
  // 根据真实的字体大小，转化为适合放在画布内的字体大小(真实转虚拟)
  getStyle: function (ele: TTxtEle, { widthRatio }) {
    return {
      color: ele.color,
      fontSize: FloatFormater(ele.fontSize / widthRatio, 0),
    };
  },
};

export const FormatEleProps = (ele: TEle, baseInfo: TBaseInfo) => {
  // 对于普通文本来说，宽高初始时由 fontSize*倍数初略计算
  if (TxtUtil.isType(ele.type)) {
    TxtUtil.toRect(ele);
  }
  // 对于字幕来说，宽高初始时由 fontSize*倍数初略计算
  if (CaptionUtil.isType(ele.type)) {
    CaptionUtil.toRect(ele, baseInfo.program_width);
  }
};

// 根据原始数据生成elelist
export const generateEleList = (eles: any, program: TBaseInfo) => {
  return eles.map((item) => {
    const newItem = { ...item, uuid: getUuid() };

    FormatEleProps(newItem, program);
    return newItem;
  });
};

const getMediaTitle = (ele: TMediaEle | TAudioEle): string => {
  let files = (ele as TMediaEle).files;
  let title = '';
  if (ele.type === 'image') {
    title = '图片';
  } else if (ele.type === 'video') {
    title = '视频';
  } else {
    title = '背景音乐';
  }
  return `[${title}] ${
    files[0] ? `${getFileName(files[0].path)}[${files.length}]` : '--'
  }`;
};

const getTxtTitle = (ele: TTxtEle) => {
  const { date, time, week } = getDate();
  switch (ele.type) {
    case 'date':
      return `[日期] ${date}`;
    case 'time':
      return `[时间] ${time}`;
    case 'week':
      return `[星期] ${week}`;
    default:
      const content = (ele as TCaptionEle).content;
      return `[字幕] ${
        content.length < 16 ? content : `${content.slice(0, 15)}...`
      }`;
  }
};

const FormItem = ({ label = '', rules = [], children = null }) => (
  <Form.Item hasFeedback label={label} validateTrigger="onBlur" rules={rules}>
    {children}
  </Form.Item>
);

export const getSourceIconByType = (ele: TEle) => {
  switch (ele.type) {
    case 'image':
      return <PictureFilled />;
    case 'video':
      return <PlaySquareFilled />;
    case 'stream':
      return <VideoCameraFilled />;
    case 'audio':
      return <CustomerServiceFilled />;
    default:
      return <FontSizeOutlined />;
  }
};

// 根据类型获取图标和名称
export const getListItemData = (ele: TEle) => {
  let style = {
    color: '#10239e',
  };

  switch (ele.type) {
    case 'image':
      return [<PictureFilled style={style} />, getMediaTitle(ele as TMediaEle)];
    case 'video':
      return [
        <PlaySquareFilled style={style} />,
        getMediaTitle(ele as TMediaEle),
      ];
    case 'stream':
      return [
        <VideoCameraFilled style={style} />,
        `[流媒体] ${(ele as TStreamEle).address}`,
      ];
    case 'audio':
      return [
        <CustomerServiceFilled style={style} />,
        getMediaTitle(ele as TAudioEle),
      ];
    default:
      return [<FontSizeOutlined style={style} />, getTxtTitle(ele as TTxtEle)];
  }
};

// 根据key获取表单项
export const getComponentByKey = ({
  key,
  value,
  fileList,
  type,
  handleInputChange,
  handleSelectChange,
}): ReactNode => {
  const style = { width: '92px' };
  const baseFormItemProps = { key, label: key };
  const baseProps = { value, name: key, style };
  switch (key) {
    case 'x':
    case 'y':
    case 'fontSize':
    case 'speed':
    case 'width':
    case 'height':
      // 如果是字幕，不显示x
      if (CaptionUtil.isType(type) && key === 'x') {
        return null;
      }

      // 如果是普通文本或字幕，不显示宽高。因为它将由字体大小决定
      if (
        (key === 'width' || key === 'height') &&
        (TxtUtil.isType(type) || CaptionUtil.isType(type))
      ) {
        return null;
      }
      return (
        <FormItem {...baseFormItemProps}>
          <InputNumber
            {...baseProps}
            onChange={handleSelectChange.bind(null, key)}
          />
        </FormItem>
      );

    case 'address':
      return (
        <FormItem {...baseFormItemProps}>
          <Input {...baseProps} onChange={handleInputChange} />
        </FormItem>
      );
    case 'content':
      return (
        <FormItem {...baseFormItemProps}>
          <Input.TextArea
            {...baseProps}
            showCount
            maxLength={100}
            style={{ height: 120 }}
            onChange={handleInputChange}
          />
        </FormItem>
      );
    case 'direction':
      return (
        <FormItem {...baseFormItemProps}>
          <Select
            {...baseProps}
            onChange={handleSelectChange.bind(null, 'direction')}
            options={[
              { value: 0, label: '静止' },
              { value: 1, label: '向左滚动' },
              { value: 2, label: '向右滚动' },
            ]}
          />
        </FormItem>
      );
    case 'color':
      return (
        <FormItem {...baseFormItemProps}>
          <ColorPicker
            style={style}
            showText
            value={value as Color}
            onChange={(_, hex) => {
              handleSelectChange('color', hex);
            }}
          />
        </FormItem>
      );
    case 'files':
      return <FilesBox files={value} source={fileList} type={type} />;
    default:
      return null;
  }
};

// 生成gird元素内容
const getGridEleLabel = (ele: TEle, { widthRatio }) => {
  const { date, time, week } = getDate();
  let style = {};
  if (TxtUtil.isType(ele.type)) {
    style = TxtUtil.getStyle(ele as TTxtEle, { widthRatio });
  }

  if (CaptionUtil.isType(ele.type)) {
    style = CaptionUtil.getStyle(ele as TCaptionEle, { widthRatio });
  }

  // 字体大小也是要同比例缩小的
  switch (ele.type) {
    case 'date':
      return <span style={style}>{date}</span>;
    case 'time':
      return <span style={style}>{time}</span>;
    case 'week':
      return <span style={style}>{week}</span>;
    case 'image':
      // 如果为空，给一个默认容器
      if ((ele as TMediaEle).files.length === 0) {
        return <SvgIcon.Image />;
      }
      // 使用走马灯展示
      return (
        <Carousel autoplay>
          {(ele as TMediaEle).files.map((file) => (
            <div key={file.id}>
              <img
                src={`${FILE_PATH}${file.path}`}
                width="100%"
                height="100%"
              />
            </div>
          ))}
        </Carousel>
      );
    case 'video': {
      // 如果为空，给一个默认容器
      if ((ele as TMediaEle).files.length === 0) {
        return <SvgIcon.Video />;
      }
      return <VideoPlayer files={(ele as TMediaEle).files} />;
    }
    case 'caption': {
      if ((ele as TCaptionEle).direction === 0) {
        return <span style={style}>{(ele as TCaptionEle).content}</span>;
      }
      return (
        <Marquee
          style={style}
          direction={(ele as TCaptionEle).direction === 1 ? 'left' : 'right'}
          speed={(ele as TCaptionEle).speed}
        >
          {(ele as TCaptionEle).content}
        </Marquee>
      );
    }

    default:
      return null;
  }
};

// 转化gird要求的属性
const getGridEleProps = (ele: TEleWithLayout, { widthRatio, heightRatio }) => {
  return {
    x: FloatFormater(ele.x / widthRatio, 0),
    y: FloatFormater(ele.y / heightRatio, 0),
    w: FloatFormater(ele.width / widthRatio, 0),
    h: FloatFormater(ele.height / heightRatio, 0),
  };
};

// 根据元素列表获取gird元素
export const generateGridEles = (
  eles: Array<TEleWithLayout>,
  { selectedEleKey, setSelectedEleKey, widthRatio, heightRatio }
) => {
  return eles.map((item) => {
    const { uuid, x, y, width, height } = item;
    let className = '';
    // 生成内容
    let label = getGridEleLabel(item, { widthRatio });
    // 生成grid元素
    const key = `${uuid}:${x}-${y}-${width}-${height}-${widthRatio}-${heightRatio}`;
    // 不仅uuid 因为每个元素的x y w h属性,画布分辨率变化后，也需要重新渲染
    const GridProps = getGridEleProps(item, {
      widthRatio,
      heightRatio,
    });

    if (item.uuid === selectedEleKey) {
      className += ' selected';
    }

    return (
      <div key={key} data-grid={GridProps} className={`GridEle ${className}`}>
        <div
          className={`GridEle-LabelContainer`}
          onClick={() => {
            setSelectedEleKey(item.uuid);
          }}
        >
          {label}
        </div>
      </div>
    );
  });
};

export const getUuidFromLayoutEleKey = (key: string) => {
  return key.split(':')[0];
};
