"use client";
import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { theme } from "@/app/_styles/muiTheme";
import { useRouter } from "next/navigation";
import { Bookmark } from "@/app/_types/interfaces/bookmark";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
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
      const response = await fetch(`api/user?email=${user?.email}`);

      if (!response.ok) {
        throw new Error(
          "Something went wrong fetching additional user information"
        );
      }

      const data = await response.json();

      console.log("data", data);

      setBookmarks(data.bookmarks);
    };

    if (user) {
      getAdditionalUserInfo();
    }
  }, [user]);

  console.log("user: ", user);

  return (
    //Greeting the user
    <Container sx={{ minHeight: "100vh" }}>
      {user?.nickname && (
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
          Welcome back! {user.nickname}
        </Typography>
      )}

      {/*Show bookmarks saved by user*/}
      <Container>
        {bookmarks.length > 0 ? (
          bookmarks.map((book, index) => (
            <Typography key={index}>{book.title}</Typography>
          ))
        ) : (
          <Typography align="center">No Bookmarks Yet!</Typography>
        )}
      </Container>
      <a href="/api/auth/logout" onClick={removeUser}>
        <Button variant="contained">Logout</Button>
      </a>
    </Container>
  );
}
