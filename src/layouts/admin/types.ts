import { LucideIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IProps {
  children: ReactNode;
}

export interface IPropsHeader {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SubItemsProps {
  items: SidebarItem[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SidebarItem {
  link: string;
  title: string;
  icon: LucideIcon;
  items: SidebarItem[];
  isActive?: boolean;
}
