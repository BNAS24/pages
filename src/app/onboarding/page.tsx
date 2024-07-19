import { Button, Container } from "@mui/material";

const SignUp = () => {
  return <></>;
};

const SingIn = () => {
  return <></>;
};

export default function OnBoarding() {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <a href="/api/auth/login">
        <Button>Login</Button>
      </a>
      <a href="/api/auth/logout">
        <Button>Logout</Button>
      </a>
    </Container>
  );
}
