import { useMenu } from "@/app/_hooks/useBodyStyle";
import { useState } from "react";

const HamburgerMenu = () => {
  const { handleMenuOpen } = useMenu();
  const [isHovered, setHovered] = useState<boolean>(false);

  const handleMouseHover = () => setHovered(!isHovered);

  return (
    <svg
      onClick={handleMenuOpen}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
      style={{
        cursor: isHovered ? "pointer" : "default",
      }}
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.3334 11.6667H6.66669"
        stroke="#FFA600"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
      <path
        d="M33.3334 20H6.66669"
        stroke="#FFA600"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
      <path
        d="M33.3334 28.3334H6.66669"
        stroke="#FFA600"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HamburgerMenu;
