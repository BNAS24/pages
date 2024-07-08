import { Button, Container, Typography } from "@mui/material";
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
          width: "80%",
          height: "100%",
          mr: "unset",
          ml: "auto",
          borderTop: `1px solid ${theme.palette.secondary.main}`,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Container
          disableGutters={true}
          maxWidth={false}
          sx={{
            padding: "1rem 1rem",
          }}
        >
          {/*There will be only one typography component that will be mapped dynamically to*/}
          <Typography
            noWrap
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "2rem",
            }}
          >
            Editor&apos;s Choice
          </Typography>
          <Typography
            noWrap
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "2rem",
            }}
          >
            Kids
          </Typography>
          <Typography
            noWrap
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "2rem",
            }}
          >
            Thrillers
          </Typography>
          <Typography
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "2rem",
            }}
          >
            Romance
          </Typography>
          <Typography
            noWrap
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "2rem",
            }}
          >
            Self-Help
          </Typography>
          <Typography
            noWrap
            sx={{
              color: theme.palette.secondary.main,

              fontSize: "2rem",
            }}
          >
            Psychology
          </Typography>
          <Typography
            noWrap
            sx={{
              color: theme.palette.secondary.main,

              fontSize: "2rem",
            }}
          >
            More Subjects
          </Typography>
        </Container>

        {/*Horizontal line */}
        <Container maxWidth={false}>
          <hr className="horizontal-line" />
        </Container>

        {/*Button group */}
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
            paddingY: "1rem",
          }}
        >
          <Button
            disableElevation={true}
            variant="outlined"
            sx={{
              minWidth: "92px",
              borderRadius: "2rem",
            }}
          >
            Sign Up
          </Button>
          <Button
            disableElevation={true}
            variant="contained"
            sx={{
              minWidth: "92px",
              borderRadius: "2rem",
            }}
          >
            Join Now
          </Button>
        </Container>
      </Container>
    </SideMenuContainer>
  );
};
