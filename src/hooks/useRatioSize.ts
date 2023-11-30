import { FloatFormater } from '../utils';
// 计算比率，当设置的宽高 大于 窗口宽高时， 通过计算比率，使设置的宽高同比例缩小，以适应于窗口宽高中
const useRatioSize = (
  windowSize: TSize,
  settingSize: TSize
): [number, number, TSize] => {
  const [wWidth, wHeight] = windowSize;
  const [sWidth, sHeight] = settingSize;

  if (sWidth === 0 || sHeight === 0 || wWidth === 0 || wHeight === 0) {
    return [1, 1, [0, 0]];
  }

  // 如果窗口的长和高都比设置的长和高大，那么使用的就是实际宽高
  // 否则要计算缩小比率。这里需要向上取整，否则即便 设置宽高 比 窗口宽高 大1.几倍，还是会当做1来看，这样就起不到同比例缩小效果
  const widthRatio =
    wWidth >= sWidth ? 1 : FloatFormater(Math.ceil(sWidth / wWidth), 0);
  const heightRatio =
    wHeight >= sHeight ? 1 : FloatFormater(Math.ceil(sHeight / wHeight), 0);

  // 且还要返回 设置宽高经过同比例缩小后，能放在画布容器中的虚拟宽高（所视宽高）
  const viewSize = [
    FloatFormater(sWidth / widthRatio, 0),
    FloatFormater(sHeight / heightRatio, 0),
  ] as TSize;

  return [widthRatio, heightRatio, viewSize];
};

export default useRatioSize;
