import Head from "next/head";
import {
  Colors,
  Draggable,
  DraggableItem,
  DraggableTypes,
} from "components/Draggable";
import { useCallback, useEffect, useState } from "react";
import { DropTargetMonitor, useDrop, XYCoord } from "react-dnd";
import { inventory, keysToDelete } from "config";
import { useStore } from "store/items";
import styles from "styles/Home.module.scss";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<string>();
  const { items, moveItem, deleteItem } = useStore();

  const [, drop] = useDrop(
    () => ({
      accept: [DraggableTypes.ITEM, DraggableTypes.INVENTORY_ITEM],
      drop(item: DraggableItem, monitor: DropTargetMonitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const initialSourceOffset =
          monitor.getInitialSourceClientOffset() as XYCoord;

        const isOnCanvas = item.type === DraggableTypes.ITEM;

        const left = Math.round(
          item.left + delta.x + (isOnCanvas ? 0 : initialSourceOffset.x)
        );
        const top = Math.round(
          item.top + delta.y + (isOnCanvas ? 0 : initialSourceOffset.y)
        );
        moveItem(item, left, top);
        return undefined;
      },
    }),
    [moveItem]
  );

  const handleOnSelect = useCallback((id: string) => {
    setSelectedItem(id);
  }, []);

  useEffect(() => {
    const deleteSelectedItem = () => {
      if (selectedItem) {
        deleteItem(selectedItem);
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (keysToDelete.includes(e.key)) {
        deleteSelectedItem();
      }
    };

    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keyup", upHandler);
    };
  }, [deleteItem, selectedItem]);

  return (
    <div>
      <Head>
        <title>DND</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.inventory}>
          {Object.keys(inventory).map((key: string) => {
            const { left, top, color } = inventory[key];
            return (
              <div key={key} className={styles.inventoryItem}>
                <Draggable
                  type={DraggableTypes.INVENTORY_ITEM}
                  id={key}
                  left={left}
                  top={top}
                  color={color as Colors}
                />
              </div>
            );
          })}
        </div>
        <div ref={drop} className={styles.canvas}>
          {Object.keys(items).map((key) => {
            const { left, top, color } = items[key];
            return (
              <Draggable
                type={DraggableTypes.ITEM}
                key={key}
                id={key}
                left={left}
                top={top}
                color={color as Colors}
                onClick={handleOnSelect}
                isSelected={selectedItem === key}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
