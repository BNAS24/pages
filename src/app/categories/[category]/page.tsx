"use client";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Loading from "@/app/_components/custom/loading/Progress";
import ActiveLastBreadcrumb from "@/app/_components/custom/navigation/Breadcrumbs";
import { theme } from "@/app/_styles/muiTheme";
import { Book } from "@/app/_components/custom/book-related/BookShelf";

export default function CategoryPage() {
  const [books, setBooks] = useState([]);

  const pathname = usePathname();
  const category =
    pathname.split("/")[2].charAt(0).toUpperCase() +
    pathname.split("/")[2].slice(1);

  useEffect(() => {
    const fetchCategoryOfBooks = async () => {
      try {
        const encodedCategory = encodeURIComponent(category);
        const response = await fetch(
          `/api/getBooks/featured-categories?bookCategory=${encodedCategory}`,
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

  if (books.length === 0) {
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
    <Container
      disableGutters={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <ActiveLastBreadcrumb />
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          alignContent: "flex-start",
          justifyContent: "flex-start",
          gap: "1rem",
          width: "100%",
          minHeight: "100vh",
          paddingY: "1.5rem",
          overflowX: "hidden",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        {books ? (
          books.map((book: any) => (
            <Book
              key={book.id}
              title={book.volumeInfo.title}
              bookCover={book.volumeInfo.imageLinks?.thumbnail}
              maxWidth="88px"
              fontSize="0.8rem"
              link={book.volumeInfo?.previewLink}
            />
          ))
        ) : (
          <Typography variant="h1">No books available</Typography>
        )}
      </Container>
    </Container>
  );
}
