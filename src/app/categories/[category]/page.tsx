"use client";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CategoryPage() {
  const [books, setBooks] = useState([]);

  const pathname = usePathname();
  const category =
    pathname.split("/")[2].charAt(0).toUpperCase() +
    pathname.split("/")[2].slice(1);

  useEffect(() => {
    const fetchCategoryOfBooks = async () => {
      try {
        const response = await fetch(
          `/api/getBooks/featured-categories?bookCategory=${category}`,
          {
            next: { revalidate: 3600 },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const booksInCategory = await response.json();

        setBooks(booksInCategory);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCategoryOfBooks();
  }, [category]);

  console.log("books", books);

  return (
    <Container
    // disableGutters={true}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
        }}
      >
        {books ? (
          books.map((book: any) => (
            <Container
            disableGutters={true}
              key={book.id}
              sx={{
                flexShrink: 0,
                display: "flex",
                width: "88px",
                aspectRatio: "2 / 3",
              }}
            >
              <Image
                src={book.volumeInfo?.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                width={200}
                height={300}
              />
            </Container>
          ))
        ) : (
          <Typography variant="h1">No books available</Typography>
        )}
      </Container>
    </Container>
  );
}
