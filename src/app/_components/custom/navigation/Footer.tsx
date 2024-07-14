import { Container, Typography } from "@mui/material";
import { theme } from "@/app/_styles/muiTheme";

export const Footer = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "80px",
        mt: "1rem",
        // padding bottom added to the bottom of container for accessibility on mobile devices
        // pb: "1rem",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          color: theme.palette.primary.contrastText,
        }}
      >
        Powered by Google Books
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          color: theme.palette.primary.contrastText,
        }}
      >
        Website created by Brandon Bradley
      </Typography>
    </Container>
  );
};
