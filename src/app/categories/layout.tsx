import { Container } from "@mui/material";
import { LayoutProps } from "@/app/_types/interfaces/layoutProps";

export default function Layout({ children }: LayoutProps) {
  return (
    <Container disableGutters={true} maxWidth={false}>
      {children}
    </Container>
  );
}
