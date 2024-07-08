import { Container } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { useMenu } from "@/app/_hooks/useBodyStyle";

const SideMenuContainer = animated(Container);

export const SideMenu = () => {
  const [animationComplete, setAnimationComplete] = useState(true);

  const { menuOpen } = useMenu();

  // Define spring animation configuration
  const spring = useSpring({
    width: menuOpen ? "100%" : "0",
    onStart: () => {
      setAnimationComplete(false);
    },
    onRest: (result) => {
      menuOpen && result.finished
        ? setAnimationComplete(false)
        : setAnimationComplete(true);
    },
  });

  return (
    <SideMenuContainer
      style={spring}
      sx={{
        position: "fixed",
        display: !animationComplete ? "flex" : "none",
        top: "64px",
        right: 0,
        height: "100%",
        backgroundColor: "grey",
        zIndex: 101,
      }}
    >
      This a side nav
    </SideMenuContainer>
  );
};
