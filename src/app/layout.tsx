"use client";
import "@fontsource/roboto";
import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
// import type { Metadata } from "next";
import "./globals.css";
import { theme } from "./_styles/muiTheme";
import { NavBar } from "./_components/custom/navigation/NavBar";
import { Suspense } from "react";
import Loading from "./_components/custom/loading/Loading";
import { SideMenu } from "./_components/custom/navigation/SideMenu";
import { MenuProvider, useMenu } from "./_hooks/useBodyStyle";

// export const metadata: Metadata = {
//   title: "Pages",
//   description: "Read your favorite books anywhere!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <MenuProvider>
            <CssBaseline>
              <LayoutWrapper>{children}</LayoutWrapper>
            </CssBaseline>
          </MenuProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
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
        position: "relative",
      }}
    >
      <NavBar />
      <Suspense fallback={<Loading />}>
        <SideMenu />
        {children}
      </Suspense>
    </Container>
  );
};
