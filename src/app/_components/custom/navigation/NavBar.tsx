"use client";
import { Avatar, Container, Typography } from "@mui/material/";
import { theme } from "../../../_styles/muiTheme";
import BrandLogo from "../buttons/BrandLogo";
import HamburgerMenu from "../buttons/HamburgerMenu";
import { navigationLinks } from "@/app/_assets/NavLinks";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMediaQuery, useTheme } from "@mui/material";

export const NavBar = () => {
  const { user } = useUser();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

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
      <Container
        sx={{
          display: {
            xs: "none", // 0px
            sm: "none", // 600px
            md: "flex", // 900px
            lg: "flex", // 1200px
            xl: "flex", // 1536px
          },
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {navigationLinks &&
          navigationLinks.map((linkData: any) => (
            <Link
              key={linkData.title}
              href={linkData.path}
              className="nav-links"
            >
              <Typography
                noWrap
                className="nav-links-text"
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: {
                    md: "1.1rem", // 900px
                    lg: "1.5rem", // 1200px
                    xl: "1.5rem", // 1536px
                  },
                }}
              >
                {linkData.title}
              </Typography>
            </Link>
          ))}
      </Container>
      {user && isLargeScreen ? (
        <Avatar component={Link} href="/dashboard">
          B
        </Avatar>
      ) : (
        <HamburgerMenu />
      )}
    </Container>
  );
};
