import { Container } from "@mui/material";
import { LayoutProps } from "@/app/_types/interfaces/layoutProps";

export default function Layout({ children }: LayoutProps) {
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        width: '100%',
        minHeight: "100vh",
      }}
    >
      {children}
    </Container>
  );
}
