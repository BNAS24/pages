import "@fontsource/roboto";
import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import "./globals.css";
import { theme } from "./_styles/muiTheme";
import { NavBar } from "./_components/custom/navigation/NavBar";
import { Suspense } from "react";
import Loading from "./_components/custom/loading/Loading";

export const metadata: Metadata = {
  title: "Pages",
  description: "Read your favorite books anywhere!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Container
              component="body"
              maxWidth={false}
              disableGutters={true}
              // sx={{
              //   fontFamily: `"Roboto", "Open Sans", san-serif`,
              // }}
            >
              <NavBar />
              <Suspense fallback={<Loading />}>
              {children}
              </Suspense>
            </Container>
          </CssBaseline>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
