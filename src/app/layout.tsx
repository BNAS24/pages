"use client";
import "@fontsource/roboto";
import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { NavBar } from "./_components/custom/navigation/NavBar";
import { SideMenu } from "./_components/custom/navigation/SideMenu";
import { MenuProvider, useMenu } from "./_hooks/useBodyStyle";
import { theme } from "./_styles/muiTheme";
import "./globals.css";
import { Footer } from "./_components/custom/navigation/Footer";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Pages</title>
        <meta name="description" content="Read your favorite books anywhere!" />
      </head>
      <UserProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <MenuProvider>
              <CssBaseline>
                <LayoutWrapper>{children}</LayoutWrapper>
              </CssBaseline>
            </MenuProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </UserProvider>
    </html>
  );
}

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  // Extract body style properties from custom hook
  const { bodyStyles } = useMenu();

  return (
    // Body component using MUI Container component
    <Container
      component="body"
      maxWidth={false}
      disableGutters={true}
      sx={{
        ...bodyStyles,
        minHeight: "100vh",
        fontFamily: "Roboto, Open Sans, sans-serif",
      }}
    >
      <NavBar />
      <SideMenu />
      {children}
      <Footer />
    </Container>
  );
};
