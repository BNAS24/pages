"use client";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@/app/_components/custom/navigation/Breadcrumbs";
import Image from "next/image";

export default function BookDetails() {
  const [bookDetails, setDetails] = useState({});
  const pathname = usePathname();
  const bookId = pathname.split("/")[4];

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

  console.log("bookDetails: ", bookDetails);

  return (
    <Container
      sx={{
        minHeight: "100vh",
      }}
    >
      <Breadcrumbs title={bookDetails.volumeInfo?.title} />
      <Container>
        <Image
          src={bookDetails.volumeInfo?.imageLinks.thumbnail}
          alt={bookDetails.volumeInfo?.title}
          height={100}
          width={100}
        />
        <Typography fontWeight={700}>{bookDetails.volumeInfo?.title}</Typography>
        <Typography>{bookDetails.volumeInfo?.description}</Typography>
      </Container>
    </Container>
  );
}
