import { CSSProperties } from "react";
import { useDrag } from "react-dnd";
import classnames from "classnames/bind";
import styles from "./styles.module.scss";

const cn = classnames.bind(styles);

export type Items = {
  [key: string]: {
    top: number;
    left: number;
    color: string;
  };
};

export enum DraggableTypes {
  ITEM = "ITEM",
  INVENTORY_ITEM = "INVENTORY_ITEM",
}

export enum Colors {
  violet = "violet",
  green = "green",
  blue = "blue",
  orange = "orange",
  purple = "purple",
  black = "black",
}

export type DraggableItem = {
  id: string;
  type: keyof typeof DraggableTypes;
  top: number;
  left: number;
  color: keyof typeof Colors;
  style?: CSSProperties;
  onClick?: (id: string) => void;
  isSelected?: boolean;
};

export const Draggable = ({
  id,
  type,
  left,
  top,
  color,
  onClick,
  isSelected,
}: DraggableItem) => {
  const [, drag] = useDrag(
    () => ({
      type,
      item: { id, left, top, type, color },
    }),
    [id, left, top, type, color]
  );

  const isOnCanvas = type === DraggableTypes.ITEM;

  return (
    <div
      ref={drag}
      className={cn("draggable", { isOnCanvas, isSelected })}
      style={{
        top,
        backgroundColor: Colors[color],
        left: isOnCanvas ? `calc(${left}px - 230px)` : left,
      }}
      onClick={() => onClick?.(id)}
    />
  );
};
