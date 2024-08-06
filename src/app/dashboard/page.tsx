import { UserData } from "@/app/_components/server/UserData";
import { Container } from "@mui/material";
import { LogOut } from "@/app/_components/custom/navigation/LogOut";

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

      {/*Logout Button*/}
      <LogOut topMargin="1rem" />
    </Container>
  );
}