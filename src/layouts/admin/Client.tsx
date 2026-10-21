"use client";

import { useState } from "react";
import { IProps } from "./types";
import HeaderAdmin from "./Header";
import SidebarAdmin from "./Sidebar";

const ClientAdmin = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeaderAdmin isOpen={isOpen} setIsOpen={setIsOpen} />

      <SidebarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="min-h-screen pt-16 duration-300 lg:pl-64">
        <article className="p-3 lg:p-4">{children}</article>
      </main>
    </div>
  );
};

export default ClientAdmin;
