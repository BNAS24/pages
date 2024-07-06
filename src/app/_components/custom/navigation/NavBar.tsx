"use client";
import Container from "@mui/material/Container";
import { theme } from "../../../_styles/muiTheme";
import BrandLogo from "./BrandLogo";
import HamburgerMenu from "./HamburgerMenu";

export const NavBar = () => {
  return (
    <Container
      component="nav"
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        width: "100%",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <BrandLogo />
      <HamburgerMenu />
    </Container>
  );
};
