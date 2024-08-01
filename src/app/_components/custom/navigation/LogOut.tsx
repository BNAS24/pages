"use client";
import { Button } from "@mui/material";

export const LogOut = () => {
  const removeUser = () => localStorage.removeItem("user");

  return (
    // Logout Button
    <a href="/api/auth/logout" onClick={removeUser}>
      <Button
        // variant="contained"
        disableElevation={true}
        variant="outlined"
        sx={{
          flexGrow: 0,
          flexShrink: 0,
          minWidth: "92px",
          borderRadius: "2rem",
        }}
      >
        Logout
      </Button>
    </a>
  );
};
