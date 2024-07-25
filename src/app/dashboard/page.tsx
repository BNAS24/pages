"use client";
import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { theme } from "@/app/_styles/muiTheme";
import { useRouter } from "next/navigation";
import { User } from "@/app/models/User";
import Loading from "@/app/_components/custom/loading/Progress";
import Image from "next/image";

export default function Dashboard() {
  const [userDBData, setUserDBData] = useState<User | null>(null);
  const router = useRouter();
  const { user } = useUser();

  const removeUser = () => localStorage.removeItem("user");

  useEffect(() => {
    // Check if the user is signed in and redirects the user if not
    const signedIn = localStorage.getItem("user");

    if (!signedIn) {
      router.push("/onboarding");
    }
  }, [router]);

  useEffect(() => {
    const getAdditionalUserInfo = async () => {
      const response = await fetch(`/api/user?email=${user?.email}`);

      if (!response.ok) {
        throw new Error(
          "Something went wrong fetching additional user information"
        );
      }

      const data = await response.json();

      console.log("data", data);

      setUserDBData(data);
    };

    if (user) {
      getAdditionalUserInfo();
    }
  }, [user]);

  console.log("user: ", user);

  if (!userDBData) {
    return (
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
        <Loading />
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
          />
        </Container>
      </Container>
    );
  }

  return (
    // Greeting the user
    <Container sx={{ minHeight: "100vh" }}>
      {userDBData && (
        <>
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
            {`Welcome Back ${userDBData.username}!`}
          </Typography>

          {/* Show bookmarks saved by user */}
          <Container>
            {userDBData.bookmarks.length > 0 ? (
              userDBData.bookmarks.map((book, index) => (
                <Typography key={index}>{book.title}</Typography>
              ))
            ) : (
              <Typography align="center">You currently have no bookmarks saved</Typography>
            )}
          </Container>
          <a href="/api/auth/logout" onClick={removeUser}>
            <Button variant="contained">Logout</Button>
          </a>
        </>
      )}
    </Container>
  );
}
