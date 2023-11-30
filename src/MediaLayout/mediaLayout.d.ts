type TBaseInfo = {
  program_name: string;
  program_width: number;
  program_height: number;
};

type TFile = {
  id: string;
  path: string;
};

// 元素类型
type TEleType =
  | 'image'
  | 'video'
  | 'stream'
  | 'date'
  | 'time'
  | 'week'
  | 'caption'
  | 'audio';

type TBaseEle = {
  type: TEleType;
  uuid: string;
};

type TLayoutProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// 图片元素、视频元素
type TMediaEle = TBaseEle &
  TLayoutProps & {
    files: Array<TFile>;
  };
// 流媒体元素
type TStreamEle = TBaseEle &
  TLayoutProps & {
    address: string;
  };

// 日期、时间、星期
type TTxtEle = TBaseEle &
  TLayoutProps & {
    color: string;
    fontSize: number;
  };

declare enum EDirection {
  Static,
  Right,
  Left,
}
// 字幕
type TCaptionEle = TTxtEle & {
  direction: EDirection;
  speed: number;
  content: string;
};

// 背景音乐
type TAudioEle = TBaseEle & {
  files: Array<TFile>;
};

type TEle = TMediaEle | TStreamEle | TTxtEle | TCaptionEle | TAudioEle;
type TEleWithLayout = TMediaEle | TStreamEle | TTxtEle | TCaptionEle;
type TEleList = Array<TEle>;

type TSize = [number, number];
