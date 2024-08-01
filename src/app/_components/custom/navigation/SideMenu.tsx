import { Avatar, Button, Container, Typography } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { useMenu } from "@/app/_hooks/useBodyStyle";
import { theme } from "@/app/_styles/muiTheme";
import { navigationLinks } from "@/app/_assets/NavLinks";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { LogOut } from "@/app/_components/custom/navigation/LogOut";

// Wrapping MUI Container component inside a react-spring component for more efficient usability and handling
const SideMenuContainer = animated(Container);

export const SideMenu = () => {
  const { user } = useUser();
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
        onClick={(event) => event.stopPropagation()}
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
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem 1rem",
          }}
        >
          {user && (
            <Avatar
              onClick={handleMenuOpen}
              component={Link}
              href="/dashboard"
              src={user.picture!}
              alt={user.nickname!}
              sx={{
                visibility: menuOpen ? "visible" : "hidden",
                alignSelf: "flex-end",
              }}
            ></Avatar>
          )}
          {/*List of navigation links*/}
          {navigationLinks &&
            navigationLinks.map((linkData: any) => (
              <Link
                key={linkData.title}
                onClick={handleMenuOpen}
                href={linkData.path}
                className="side-menu-link"
              >
                <Typography
                  noWrap
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: "2rem",
                  }}
                >
                  {linkData.title}
                </Typography>
              </Link>
            ))}
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
            width: "100%",
          }}
        >
          {user === undefined ? (
            <>
              <a href="/api/auth/login" rel="noopener noreferrer">
                <Button
                  disableElevation={true}
                  variant="outlined"
                  onClick={handleMenuOpen}
                  sx={{
                    flexGrow: 0,
                    flexShrink: 0,
                    minWidth: "92px",
                    borderRadius: "2rem",
                  }}
                >
                  Sign In
                </Button>
              </a>
              <a href="/api/auth/login" rel="noopener noreferrer">
                <Button
                  disableElevation={true}
                  variant="contained"
                  onClick={handleMenuOpen}
                  sx={{
                    flexGrow: 0,
                    flexShrink: 0,
                    minWidth: "92px",
                    borderRadius: "2rem",
                  }}
                >
                  Join Now
                </Button>
              </a>
            </>
          ) : (
            <LogOut />
          )}
        </Container>
      </Container>
    </SideMenuContainer>
  );
};
