import { Container } from "@mui/material";
import { theme } from "@/app/_styles/muiTheme";

export const Footer = () => {
  return (
    <Container
    maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "64px",
        mt: "1rem",
        // padding bottom added to the bottom of container for accessibility on mobile devices
        pb: "1rem",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      Footer
    </Container>
  );
};
