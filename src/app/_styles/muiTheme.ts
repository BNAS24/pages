"use client";
import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto";
import "@fontsource/open-sans";

const primaryMainBlue = "#0F52BA";
const secondaryMainOrange = "#FFA600";
const surfaceVariant = "#DFE2F1";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryMainBlue,
    },
    secondary: {
      main: secondaryMainOrange,
    }
  },
  typography: {
    fontFamily: `"Roboto", "Open Sans", sans-serif`,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // fontFamily: `Roboto, "Open Sans", sans-serif`,
          backgroundColor: surfaceVariant,
          width: "100vw",
        },
      },
    },
  },
});
