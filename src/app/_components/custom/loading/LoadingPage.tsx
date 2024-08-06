import { Container } from "@mui/material";
import Image from "next/image";
import ProgressBar from "./Progress";

const LoadingPage = () => (
  <Container
    disableGutters={true}
    maxWidth={false}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}
  >
    <ProgressBar />
    <Container
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src="/icons/logo-64.png"
        alt="splash screen logo"
        height={64}
        width={64}
        style={{
          marginBottom: "2rem",
        }}
        quality={100}
        loading="eager"
      />
    </Container>
  </Container>
);

export default LoadingPage;