const TEXT: TTxtEle = {
  type: 'time',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  color: '#fff',
  fontSize: 42,
  uuid: '',
};

const MEDIA: TMediaEle = {
  type: 'image',
  x: 0,
  y: 0,
  width: 400,
  height: 300,
  files: [],
  uuid: '',
};

const CAPTION: TCaptionEle = {
  type: 'caption',
  x: 0,
  y: 0,
  fontSize: 42,
  color: '#fff',

  direction: 0,
  speed: 50,
  content: '字幕内容',
  width: 400,
  height: 300,
  uuid: '',
};

export const GridDefault = {
  time: TEXT,
  date: TEXT,
  week: TEXT,
  image: MEDIA,
  video: MEDIA,
  caption: CAPTION,
};
