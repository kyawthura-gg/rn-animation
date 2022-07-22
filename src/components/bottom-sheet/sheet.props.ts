export interface SheetProps {
  children: React.ReactNode;

  /**
   * Height of bottom sheet.
   */
  height: number;
}

export interface SheetRefProps {
  open: () => void;
  close: () => void;
}
