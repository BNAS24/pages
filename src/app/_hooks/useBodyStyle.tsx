"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationState } from "@/app/_types/interfaces/navigationState";
import { MenuContextType } from "@/app/_types/types/menuContextType";

const MenuContext = createContext<MenuContextType>({} as MenuContextType);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bodyStyles, setBodyStyles] = useState<NavigationState>({
    overflow: "auto",
  });

  // Update bodyStyles whenever menuOpen changes
  useEffect(() => {
    if (menuOpen) {
      setBodyStyles({ position: "fixed", inset: 0, overflowY: "hidden" });
    } else {
      setBodyStyles({ overflow: "auto" });
    }
  }, [menuOpen]);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <MenuContext.Provider
      value={{ menuOpen, handleMenuOpen, bodyStyles, setBodyStyles }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
