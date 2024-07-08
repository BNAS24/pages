"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface NavigationState {
  overflow?: string;
}

type MenuContextType = {
  bodyStyles: NavigationState;
  setBodyStyles: (state: NavigationState) => void;
  menuOpen: boolean;
  handleMenuOpen: () => void;
};

const MenuContext = createContext<MenuContextType>({} as MenuContextType);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bodyStyles, setBodyStyles] = useState<NavigationState>({
    overflow: "auto",
  });

  // Update bodyStyles whenever menuOpen changes
  useEffect(() => {
    if (menuOpen) {
      setBodyStyles({ overflow: "hidden" });
    } else {
      setBodyStyles({ overflow: "auto" });
    }
  }, [menuOpen]);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
    console.log("menu clicked", bodyStyles);
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