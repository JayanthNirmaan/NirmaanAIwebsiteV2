"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { WaitlistModal } from "./WaitlistModal";

type WaitlistCtx = { open: () => void };

const Ctx = createContext<WaitlistCtx>({ open: () => {} });

export function useWaitlist() {
  return useContext(Ctx);
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Ctx.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <WaitlistModal open={isOpen} onClose={() => setIsOpen(false)} />
    </Ctx.Provider>
  );
}
