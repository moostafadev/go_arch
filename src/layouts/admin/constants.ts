import {
  LayoutDashboard,
  Users,
  BookOpen,
  Tags,
  DollarSign,
  Eye,
} from "lucide-react";
import { SidebarItem } from "./types";

export const sidebarData: SidebarItem[] = [
  {
    link: "/admin",
    title: "Dashboard",
    icon: LayoutDashboard,
    items: [],
    isActive: true,
  },
  {
    link: "/admin/leads",
    title: "Leads",
    icon: Users,
    items: [],
    isActive: true,
  },
  {
    link: "/admin/sales",
    title: "Sales",
    icon: DollarSign,
    items: [],
    isActive: true,
  },
  {
    link: "/admin/courses",
    title: "Courses",
    icon: BookOpen,
    items: [
      {
        link: "/admin/courses",
        title: "All Courses",
        icon: BookOpen,
        items: [],
        isActive: true,
      },
      {
        link: "/admin/courses/categories",
        title: "Categories",
        icon: Tags,
        items: [],
        isActive: true,
      },
    ],
    isActive: true,
  },
  {
    link: "/admin/views",
    title: "Page Views",
    icon: Eye,
    items: [],
    isActive: true,
  },
];
