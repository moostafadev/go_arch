export interface ReorderButtonsProps {
  index: number;
  total: number;
  disabled?: boolean;
  onMove: (toIndex: number) => void;
}
