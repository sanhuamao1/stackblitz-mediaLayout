export const getFileName = (path: string) => {
  const lastIndex = path.lastIndexOf('/');
  if (lastIndex !== -1) {
    return path.slice(lastIndex + 1);
  } else {
    return path;
  }
};

export const getUuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const deepClone = <T>(source: T): T => {
  if (source === null || typeof source !== 'object') {
    // 如果是基本类型或者 null，直接返回
    return source;
  }

  // 如果是数组
  if (Array.isArray(source)) {
    const newArray: any[] = [];
    for (const item of source) {
      newArray.push(deepClone(item));
    }
    return newArray as T;
  }

  // 如果是对象
  const newObject: Record<string, any> = {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      newObject[key] = deepClone(source[key]);
    }
  }
  return newObject as T;
};

// 返回固定小数位的小数
export const FloatFormater = (num: number, fix = 2): number =>
  Number(num.toFixed(fix));

export const getDate = () => {
  const current = new Date();
  const date = current.toLocaleDateString();
  const time = current.toLocaleTimeString();
  const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const week = WEEK[current.getDay()];
  return {
    date,
    time,
    week,
  };
};
