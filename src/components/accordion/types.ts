import { ReactNode } from "react";
export interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpenValue?: string;
  className?: string;
}
export interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
  isOpen: (value: string) => boolean;
}
export interface AccordionItemProps {
  value: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
}
