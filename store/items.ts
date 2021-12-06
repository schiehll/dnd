import { DraggableItem, DraggableTypes, Items } from "components/Draggable";
import { nanoid } from "nanoid";
import create from "zustand";
import { persist } from "zustand/middleware";

type ItemsStore = {
  items: Items;
  setItems: (items: Items) => void;
  moveItem: (item: DraggableItem, left: number, top: number) => void;
  deleteItem: (id: string) => void;
};

export const useStore = create<ItemsStore>(
  persist(
    (set) => ({
      items: {},
      setItems: (items: Items) => set({ items }),
      moveItem: (item: DraggableItem, left: number, top: number) => {
        set(({ items }) => {
          const newItems = { ...items };
          const { id, type, color } = item;

          newItems[type === DraggableTypes.ITEM ? id : nanoid()] = {
            ...items[id],
            color,
            left,
            top,
          };

          return { items: newItems };
        });
      },
      deleteItem: (id: string) => {
        set(({ items }) => {
          const newItems = { ...items };
          delete newItems[id];

          return { items: newItems };
        });
      },
    }),
    { name: "items" }
  )
);
