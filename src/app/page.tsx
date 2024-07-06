"use client";
import { Container, Typography } from "@mui/material";
import { theme } from "./_styles/muiTheme";
import { BookShelf } from "./_components/custom/book-related/BookShelf";

export default function Home() {
  const headingTextSize = 700;

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
          fontWeight={headingTextSize}
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
        <BookShelf />
        <BookShelf />
        <BookShelf />
        <BookShelf />
        <BookShelf />
        <BookShelf />
      </Container>
    </Container>
  );
}
