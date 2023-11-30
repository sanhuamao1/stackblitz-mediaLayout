import { useDrag } from 'ahooks';
import { ReactNode, useRef } from 'react';

type DragItemProps = {
  children: ReactNode;
  stringData: TEleType;
};
const DragItem = ({ children, stringData }: DragItemProps) => {
  const dragRef = useRef(null);
  useDrag(stringData, dragRef, {
    onDragStart: () => {
      dragRef.current.style.border = 'dashed';
      dragRef.current.style.opacity = 0.5;
    },
    onDragEnd: () => {
      dragRef.current.style.border = 'none';
      dragRef.current.style.opacity = 1;
    },
  });

  return (
    <div className="DragItem" ref={dragRef}>
      {children}
    </div>
  );
};

export default DragItem;
