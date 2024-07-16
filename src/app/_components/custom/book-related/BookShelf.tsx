import { Container, Skeleton, Typography } from "@mui/material";
import { theme } from "../../../_styles/muiTheme";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

const CollectionTitle = ({ title }: any) => {
  const fontSize = "1.5rem";

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        paddingY: "1rem",
        backgroundColor: theme.palette.primary.main,
      }}
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

export const Book = ({ title, bookCover, link, maxWidth, fontSize, category }: any) => {
  return (
    <Link href={`/categories/genre/details?book=${link}&category=${category}`}>
      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{
          display: "flex",
          flex: "0 0",
          minWidth: "88px",
          flexDirection: "column",
          gap: "0.5rem",
          maxWidth: maxWidth ? maxWidth : null,
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
            color: "white",
            fontSize: fontSize ? fontSize : "1rem",
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
    </Link>
  );
};

export const BookShelf = ({ collectionTitle, bookList }: any) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  return (
    <Container disableGutters={true}>
      <CollectionTitle title={collectionTitle} />{" "}
      <Container
        ref={emblaRef}
        component="section"
        sx={{
          height: "100%",
          paddingBottom: "1rem",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          overflow: "hidden",
        }}
      >
        <Container
          disableGutters={true}
          maxWidth={false}
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: "16px",
            width: "100%",
            // overflowX: "auto",
            // overflow: "hidden",
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Opera
            },
          }}
        >
          {bookList
            ? bookList.map((book: any) => (
                <Book
                  key={book.id}
                  title={book.volumeInfo.title}
                  bookCover={book.volumeInfo.imageLinks.thumbnail}
                  link={book.id}
                  category={collectionTitle}
                />
              ))
            : Array.from({ length: 8 }).map((_, index) => <Book key={index} />)}
        </Container>
      </Container>
    </Container>
  );
};
