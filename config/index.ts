import { Colors, Items } from "components/Draggable";
import { nanoid } from "nanoid";

export const inventory: Items = {
  [nanoid()]: { top: 0, left: 0, color: Colors.violet },
  [nanoid()]: { top: 0, left: 0, color: Colors.green },
  [nanoid()]: { top: 0, left: 0, color: Colors.blue },
  [nanoid()]: { top: 0, left: 0, color: Colors.orange },
  [nanoid()]: { top: 0, left: 0, color: Colors.purple },
  [nanoid()]: { top: 0, left: 0, color: Colors.black },
};

export const keysToDelete: string[] = ["Backspace"];
