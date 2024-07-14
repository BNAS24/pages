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
      maxWidth={false}
      sx={{
        minHeight: "100vh",
      }}
    >
      {bookDetails.volumeInfo && (
        <Container disableGutters={true} maxWidth={false}>
          <Breadcrumbs title={bookDetails.volumeInfo.title} />

          {/*Title Banner*/}
          <Container
            maxWidth={false}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              minHeight: "88px",
              paddingY: "0.5rem",
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
              flexDirection: {
                xs: "column", // 0px
                sm: "column", // 600px
                md: "row", // 900px
                lg: "row", // 1200px
                xl: "row", // 1536px
              },
              alignItems: {
                xs: "center", // 0px
                sm: "center", // 600px
                md: "flex-start", // 900px
                lg: "flex-start", // 1200px
                xl: "flex-start", // 1536px
              },
              mt: "1rem",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: {
                  xs: "100%", // 0px
                  sm: "100%", // 600px
                  md: "50%", // 900px
                  lg: "50%", // 1200px
                  xl: "50%", // 1536px
                },
              }}
            >
              {/*Image container*/}
              <Container
                disableGutters={true}
                sx={{
                  position: "relative",
                  display: "flex",
                  width: {
                    xs: "148px", // 0px
                    sm: "148px", // 600px
                    md: "100%", // 900px
                    lg: "100%", // 1200px
                    xl: "100%", // 1536px
                  },
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
              <Container disableGutters={true}><b>Ratings:</b>{}</Container>
            </Container>

            {/*Book description */}
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: {
                  xs: "100%", // 0px
                  sm: "100%", // 600px
                  md: "50%", // 900px
                  lg: "50%", // 1200px
                  xl: "50%", // 1536px
                },
              }}
            >
              <Typography>{bookDetails.volumeInfo.description}</Typography>
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
}
