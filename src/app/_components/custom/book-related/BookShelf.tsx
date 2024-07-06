import { Container, Skeleton, Typography } from "@mui/material";
import { theme } from "../../../_styles/muiTheme";
import Image from "next/image";

const CollectionTitle = ({ title }: any) => {
  const fontSize = "1.5rem";

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ display: "flex", paddingY: "1rem" }}
    >
      <Typography
        sx={{
          color: theme.palette.secondary.main,
          fontSize: fontSize,
        }}
      >
        {title ? title : "Title Component"}
      </Typography>
    </Container>
  );
};

const Book = ({ title, bookCover }: any) => {
  // book variable will actually be a react state variable
  const book = false;
  const titleFontSize = "0.8rem";

  return (
    <Container
      disableGutters={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Container
        disableGutters={true}
        sx={{
          position: "relative",
          display: "flex",
          flexShrink: 0,
          width: "88px",
          aspectRatio: "2 / 3",
          backgroundColor: "white",
        }}
      >
        {/*This will actually be rendered while the books are being fetched from the api*/}
        {bookCover ? (
          <Image
            src={bookCover}
            alt={title}
            fill
            style={{ height: "100%", width: "100%" }}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "grey",
            }}
          />
        )}
      </Container>
      <Typography
        align="center"
        sx={{
          fontSize: titleFontSize,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title ? title : "Title of Book Title of Book Title of Book"}
      </Typography>
    </Container>
  );
};

export const BookShelf = ({ collectionTitle, bookList }: any) => {
  // This bookshelf prop should take it these values
  // - Booktitle
  // - Bookcover
  // - Description
  // - BookLink
  // - Collection title - this will be passed to the collection title component within the bookshelf

  console.log("bookshelf list", bookList);
  return (
    <Container
      component="section"
      sx={{
        height: "280px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        overflow: "hidden  ",
      }}
    >
      <CollectionTitle title={collectionTitle} />
      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          gap: "16px",
          width: "100%",
          overflowX: "auto",
          scrollbarWidth: "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Opera
          },
        }}
      >
        {bookList ? (
          bookList.map((book: any) => (
            <Book
              key={book.id}
              title={book.volumeInfo.title}
              bookCover={book.volumeInfo.imageLinks?.thumbnail}
            />
          ))
        ) : (
          <>
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
          </>
        )}
      </Container>
    </Container>
  );
};
