import { RootStackParamList } from "../navigators";

export const SCREEN_LISTS = [
  {
    name: "TwitterProfile",
    label: "Twitter Profile",
  },
  {
    name: "BottomSheet",
    label: "Bottom Sheet",
  },
  {
    name: "DragDrop",
    label: "Drag Drop",
  },
] as {
  name: keyof RootStackParamList;
  label: string;
}[];
