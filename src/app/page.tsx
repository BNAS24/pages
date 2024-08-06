"use client";
import { Container, Typography } from "@mui/material";
import { theme } from "./_styles/muiTheme";
import { BookShelf } from "./_components/custom/book-related/BookShelf";
import { useEffect, useState } from "react";
import { BookCollection } from "./_types/types/bookCollectionTypes";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingPage from "@/app/_components/custom/loading/LoadingPage";

export default function Home() {
  const [bookList, setBookList] = useState<BookCollection[]>([]);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const signedIn = localStorage.getItem("user");

    if (!signedIn && user) {
      localStorage.setItem("user", `${user.sid}`);
      router.push("/dashboard");
    }
  }, [router, user]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`/api/getBooks/homepage`, {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const collections = await response.json();

        // Ensure collections.response is an object and convert it to an array of [key, value] pairs
        const bookArray: BookCollection[] = Object.entries(
          collections.response
        );

        setBookList(bookArray);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCollections();
  }, []);

  if (bookList.length === 0) {
    return <LoadingPage />;
  }

  return (
    <Container
      disableGutters={true}
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          paddingY: "1rem",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
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
          Read Without Limits, Anytime, Anywhere!
        </Typography>
      </Container>

      <Container
        disableGutters={true}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: "1rem",
        }}
      >
        {bookList
          ? bookList.map(([collectionTitle, books], index): any => (
              <BookShelf
                key={index}
                collectionTitle={collectionTitle}
                bookList={books}
              />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <BookShelf key={index} />
            ))}
      </Container>
    </Container>
  );
}
