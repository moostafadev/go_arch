"use client";

import { IPropsHeader } from "./types";
import { CircleUserRound, Menu, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const HeaderAdmin = ({ setIsOpen }: IPropsHeader) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="z-40 fixed top-0 left-0 lg:left-64 w-full lg:w-[calc(100%-16rem)] h-16 bg-background/60 backdrop-blur-md border-b border-border flex items-center justify-between px-4 lg:px-6">
      <button
        onClick={() => setIsOpen(true)}
        className="flex size-8 items-center justify-center text-foreground lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div className="relative ml-auto" ref={dropdownRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 outline-none focus:outline-none cursor-pointer"
        >
          <CircleUserRound
            className={`size-6 transition-colors ${isProfileOpen ? "text-accent" : "text-foreground-second hover:text-accent"}`}
            strokeWidth={1.5}
          />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 top-full mt-4 w-56 border border-border bg-card shadow-2xl flex flex-col">
            <div className="border-b border-border p-4">
              <p className="text-sm font-bold text-foreground">Administrator</p>
              <p className="text-xs text-foreground-second truncate">
                admin@goarch.com
              </p>
            </div>
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-danger hover:bg-danger/10 transition-colors"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderAdmin;
