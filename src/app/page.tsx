"use client";
import { Container, Typography } from "@mui/material";
import { theme } from "./_styles/muiTheme";
import { BookShelf } from "./_components/custom/book-related/BookShelf";
import { useEffect, useState } from "react";

export default function Home() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    // Fetches a book list from the google book api
    const fetchBookCollectionTest = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:juvenile%20fiction&maxResults=40`
        );

        if (!response.ok) {
          console.error("Error fetching books from Google Books API");
          return;
        }

        const books = await response.json();

        // Filter out books that don't have required fields
        const completeBooks = books.items.filter(
          (book: any) => book.volumeInfo.imageLinks && book.volumeInfo.previewLink
        );

        setBookList(completeBooks);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBookCollectionTest();
  }, []);

  console.log("book list", bookList);

  return (
    <Container disableGutters={true}>
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
        {/*These bookshelves will be dynamically mapped with books fetched from the server using the google book api */}
        <BookShelf collectionTitle="Kids" bookList={bookList} />
        <BookShelf />
        <BookShelf />
        <BookShelf />
        <BookShelf />
        <BookShelf />
      </Container>
    </Container>
  );
}
