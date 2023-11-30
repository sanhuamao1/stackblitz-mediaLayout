import { getListItemData } from '../helper';
import useContextHandler from '../useContextHandler';
import { DeleteOutlined, PlayCircleFilled } from '@ant-design/icons';
type EleItemProps = {
  item: TEle;
  isSelected: boolean;
  onPlay: () => void;
  onStop: () => void;
};

const EleItem = ({ item, isSelected, onPlay }: EleItemProps) => {
  const [icon, title] = getListItemData(item);
  let { setSelectedEleKey, handleDelEle } = useContextHandler();
  const handleDel = () => {
    handleDelEle(item.uuid);
  };

  return (
    <div
      className={
        isSelected
          ? 'MediaLayout-EleList-EleItem selected'
          : 'MediaLayout-EleList-EleItem'
      }
      onClick={() => setSelectedEleKey(item.uuid)}
    >
      <span className="MediaLayout-EleList-EleItem__icon">{icon}</span>
      <span className="MediaLayout-EleList-EleItem__title">{title}</span>
      {/* 背景音乐不可删除 */}
      {item.type !== 'audio' && (
        <span
          className="MediaLayout-EleList-EleItem__handler"
          onClick={() => handleDel()}
        >
          <DeleteOutlined style={{ color: '#f5222d', fontSize: '12px' }} />
        </span>
      )}
      {/* 当文件没有在播放时可以点击播放 */}
      {item.type === 'audio' && (item as TAudioEle).files.length !== 0 && (
        <span className="MediaLayout-EleList-EleItem__handler">
          <PlayCircleFilled
            style={{ color: '#73d13d', fontSize: '12px' }}
            onClick={onPlay}
          />
        </span>
      )}
    </div>
  );
};

export default EleItem;
