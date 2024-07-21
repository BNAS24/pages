"use client";
import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { theme } from "@/app/_styles/muiTheme";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    const signedIn = localStorage.getItem("user");
    if (!signedIn) {
      router.push("/onboarding");
    } else {
      setUserInfo(user);
    }
  }, [user, router]);

  return (
    <Container sx={{ minHeight: "100vh" }}>
      {userInfo?.nickname && (
        <Typography
          component="h1"
          variant="h4"
          align="center"
          fontWeight={700}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            color: theme.palette.primary.main,
          }}
        >
          Welcome back! {userInfo.nickname}
        </Typography>
      )}
    </Container>
  );
}
