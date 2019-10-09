import React = require("react");
import {
  useDrag,
  useDrop,
  DragElementWrapper,
  DragSourceOptions
} from "react-dnd";

interface DraggedField {
  type: string;
  index: number;
}

interface CollectedDropTargetProps {
  isOver: boolean;
  canDrop: boolean;
}

export const useDragDrop = function(
  dragDropType: string,
  index: number,
  move: (from: number, to: number) => void
): [
  DragElementWrapper<DragSourceOptions>,
  DragElementWrapper<DraggedField>,
  CollectedDropTargetProps
] {
  const [, drag] = useDrag({
    item: { index: index, type: dragDropType }
  });

  const [collected, drop] = useDrop({
    accept: dragDropType,
    drop: (item: DraggedField) => {
      const from = item.index;
      const to = index;
      console.log("from", item.index, "to", to);
      if (to > from) {
        move(from, to - 1);
      } else {
        move(from, to);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return [drag, drop, collected];
};

export function DropZone(props: {
  drop: DragElementWrapper<DraggedField>;
  dropProps: CollectedDropTargetProps;
}) {
  return (
    <div
      className={"drop-zone" + (props.dropProps.isOver ? "--can-drop" : "")}
      ref={props.drop}
    />
  );
}
