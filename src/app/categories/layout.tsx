import { Container } from "@mui/material";
import { LayoutProps } from "@/app/_types/interfaces/layoutProps";
// import { theme } from "@/app/_styles/muiTheme";

export default function Layout({ children }: LayoutProps) {
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        width: '100%',
        minHeight: "100vh",
        // backgroundColor: "#DFE2F1",
      }}
    >
      {children}
    </Container>
  );
}
