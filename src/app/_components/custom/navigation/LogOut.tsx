"use client";
import { Button } from "@mui/material";

export const LogOut = () => {
  const removeUser = () => localStorage.removeItem("user");

  return (
    // Logout Button
    <a
      href="/api/auth/logout"
      onClick={removeUser}
      style={{
        marginTop: "2rem",
      }}
    >
      <Button variant="contained">Logout</Button>
    </a>
  );
};
