import { UserData } from "@/app/_components/server/UserDetails";
import { Container } from "@mui/material";

export default function Dashboard() {

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/*Server component data fetched using auth0 session */}
      <UserData />
    </Container>
  );
}
