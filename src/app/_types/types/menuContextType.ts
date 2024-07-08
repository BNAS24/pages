export type MenuContextType = {
  bodyStyles: NavigationState;
  setBodyStyles: (state: NavigationState) => void;
  menuOpen: boolean;
  handleMenuOpen: () => void;
};
