"use client";
import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/app/_components/custom/navigation/Breadcrumbs";
import Image from "next/image";
import { theme } from "@/app/_styles/muiTheme";

export default function BookDetails() {
  const [bookDetails, setDetails] = useState<any>({});

  const searchParams = useSearchParams();
  const bookId = searchParams.get("book");

  useEffect(() => {
    // Fetch relevant book details
    const getBookDetails = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const details = await response.json();

      setDetails({ ...details });
    };

    // Load it's details
    getBookDetails();
  }, [bookId]);

  console.log("book details", bookDetails);
  return (
    <Container
      disableGutters={true}
      sx={{
        minHeight: "100vh",
      }}
    >
      {bookDetails.volumeInfo && (
        <Container disableGutters={true}>
          <Breadcrumbs title={bookDetails.volumeInfo.title} />

          {/*Title Banner*/}
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              height: "88px",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                color: theme.palette.secondary.main,
              }}
            >
              {bookDetails.volumeInfo.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: theme.palette.secondary.main,
              }}
            >
              By: {bookDetails.volumeInfo.authors[0]}
            </Typography>
          </Container>

          {/*Book details and content*/}
          <Container
            component="section"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "1rem",
            }}
          >
            {/*Image container*/}
            <Container
              disableGutters={true}
              sx={{
                position: "relative",
                display: "flex",
                width: "148px",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "2 / 3",
              }}
            >
              <Image
                src={bookDetails.volumeInfo.imageLinks.thumbnail}
                alt={bookDetails.volumeInfo.title}
                fill
                style={{ height: "100%", width: "100%" }}
              />
            </Container>

            {/*CTA Buttons Container*/}
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                mt: "1rem",
              }}
            >
              <Button
                disableElevation={true}
                variant="contained"
                href={bookDetails.volumeInfo.previewLink}
                sx={{
                  flexGrow: 0,
                  flexShrink: 0,
                  minWidth: "92px",
                  borderRadius: "2rem",
                }}
              >
                Preview
              </Button>
              <Button
                disableElevation={true}
                variant="contained"
                href={bookDetails.volumeInfo.previewLink}
                sx={{
                  flexGrow: 0,
                  flexShrink: 0,
                  minWidth: "92px",
                  borderRadius: "2rem",
                }}
              >
                Buy
              </Button>
            </Container>

            {/*Ratings Container*/}
            <Container>{}</Container>

            {/*Book description */}
            <Typography
              sx={{
                mt: "1rem",
              }}
            >
              {bookDetails.volumeInfo.description}
            </Typography>
          </Container>
        </Container>
      )}
    </Container>
  );
}
