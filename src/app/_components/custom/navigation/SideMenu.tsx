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
    width: menuOpen ? "100%" : "0%",
    onStart: () => {
      setAnimationComplete(false);
    },
    onRest: (result) => {
      if (result.finished) {
        setAnimationComplete(!menuOpen);
      }
    },
  });

  return (
    <SideMenuContainer
      disableGutters={true}
      maxWidth={false}
      style={spring}
      onClick={handleMenuOpen}
      sx={{
        display: !animationComplete ? "flex" : "none",
        justifyContent: "flex-end",
        position: "fixed",
        top: "64px",
        right: 0,
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.40)",
        zIndex: 101,
      }}
    >
      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{
          // Margins needed to be set manually to override the mui containers default properties
          mr: "unset",
          ml: "auto",
          width: "80%",
          height: "100%",
          borderTop: `1px solid ${theme.palette.secondary.main}`,
          backgroundColor: theme.palette.primary.main,
        }}
      ></Container>
    </SideMenuContainer>
  );
};
