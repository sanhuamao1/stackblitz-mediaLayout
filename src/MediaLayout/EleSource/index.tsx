import SvgIcon from '../../assets/SvgIcon';
import DragItem from './DragItem';

const EleSource = () => {
  return (
    <div className="MediaLayout-EleSource">
      <DragItem stringData="caption">
        <SvgIcon.Caption width={28} height={28} />
      </DragItem>
      <DragItem stringData="time">
        <SvgIcon.Time width={36} height={36} />
      </DragItem>
      <DragItem stringData="date">
        <SvgIcon.Date width={58} height={58} />
      </DragItem>
      <DragItem stringData="week">
        <SvgIcon.Week />
      </DragItem>
      <DragItem stringData="image">
        <SvgIcon.Image width={38} height={38} />
      </DragItem>
      <DragItem stringData="video">
        <SvgIcon.Video width={38} height={38} />
      </DragItem>
    </div>
  );
};
export default EleSource;
