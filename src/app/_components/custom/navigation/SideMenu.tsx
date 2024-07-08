import { Container } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { useMenu } from "@/app/_hooks/useBodyStyle";
import { theme } from "@/app/_styles/muiTheme";

const SideMenuContainer = animated(Container);

export const SideMenu = () => {
  const [animationComplete, setAnimationComplete] = useState(true);

  const { menuOpen, handleMenuOpen } = useMenu();

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
      disableGutters={true}
      maxWidth={false}
      style={spring}
      onClick={handleMenuOpen}
      sx={{
        position: "fixed",
        display: !animationComplete ? "flex" : "none",
        top: "64px",
        right: 0,
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.40)",
        // backdropFilter: "blur(8px) ",
        zIndex: 101,
      }}
    >
      <Container
        sx={{
          position: "absolute",
          right: 0,
          width: "80%",
          height: "100%",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        {" "}
        This a side nav
      </Container>
    </SideMenuContainer>
  );
};
