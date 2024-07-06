import { Container, Skeleton, Typography } from "@mui/material";
import { theme } from "../../../_styles/muiTheme";

const CollectionTitle = () => {
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
        Title Component
      </Typography>
    </Container>
  );
};

const Book = () => {
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
          display: "flex",
          flexShrink: 0,
          width: "88px",
          aspectRatio: "2 / 3",
          backgroundColor: "white",
        }}
      >
        {/*This will actually be rendered while the books are being fetched from the api*/}
        {book ? (
          "Hello, world"
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </Container>
  );
};

export const BookShelf = () => {
  return (
    <Container
      sx={{
        height: "280px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        overflow: "hidden  ",
      }}
    >
      <CollectionTitle />
      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
      </Container>
    </Container>
  );
};
