import React, { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useMenu } from "@/app/_hooks/useBodyStyle";
import { Box } from "@mui/material";

// Create animated path component
const AnimatedPath = animated('path');

const HamburgerMenu = () => {
  const { menuOpen, handleMenuOpen } = useMenu();

  // Animation props for react spring components
  const firstLineProps = useSpring({
    transform: menuOpen
      ? "rotate(45deg) translate(8.5px, -12px)"
      : "rotate(0deg) translate(0, 0)",
  });

  const secondLineProps = useSpring({
    opacity: menuOpen ? 0 : 1,
  });

  const thirdLineProps = useSpring({
    transform: menuOpen
      ? "rotate(-45deg) translate(-20px,0px)"
      : "rotate(0deg) translate(0, 0)",
  });

  return (
    <Box
      sx={{
        display: {
          xs: "flex",
          sm: "flex",
          md: "none",
          lg: "none",
          xl: "none",
        },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        onClick={handleMenuOpen}
        className="hamburger-menu"
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="button"
        aria-label="Open menu"
      >
        <AnimatedPath
          d="M33.3334 11.6667H6.66669"
          stroke="#FFA600"
          strokeWidth={3.2}
          strokeLinecap="round"
          style={firstLineProps}
        />
        <AnimatedPath
          d="M33.3334 20H6.66669"
          stroke="#FFA600"
          strokeWidth={3.2}
          strokeLinecap="round"
          style={secondLineProps}
        />
        <AnimatedPath
          d="M33.3334 28.3334H6.66669"
          stroke="#FFA600"
          strokeWidth={3.2}
          strokeLinecap="round"
          style={thirdLineProps}
        />
      </svg>
    </Box>
  );
};

export default HamburgerMenu;
