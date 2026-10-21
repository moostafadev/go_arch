"use client";

import {
  createContext,
  lazy,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";

import { DialogContextValue, DialogOptions } from "./types";

const Dialog = lazy(() => import("./Main"));

const DialogContext = createContext<DialogContextValue | null>(null);

interface Props {
  children: ReactNode;
}

const DialogProvider = ({ children }: Props) => {
  const [dialog, setDialog] = useState<DialogOptions | null>(null);

  const openDialog = useCallback((options: DialogOptions) => {
    setDialog(options);
  }, []);

  const closeDialog = useCallback(() => {
    setDialog(null);
  }, []);

  const value = useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [openDialog, closeDialog],
  );

  return (
    <DialogContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {dialog && (
          <Suspense fallback={null} key="dialog">
            <Dialog {...dialog} onClose={closeDialog} />
          </Suspense>
        )}
      </AnimatePresence>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used inside DialogProvider");
  }
  return context;
};

export default DialogProvider;
