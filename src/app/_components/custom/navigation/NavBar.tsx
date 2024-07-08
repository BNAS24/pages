"use client";
import Container from "@mui/material/Container";
import { theme } from "../../../_styles/muiTheme";
import BrandLogo from "../buttons/BrandLogo";
import HamburgerMenu from "../buttons/HamburgerMenu";

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
        boxShadow: "0px 1px 4px 0px #00000040",
      }}
    >
      <BrandLogo />
      <HamburgerMenu />
    </Container>
  );
};
