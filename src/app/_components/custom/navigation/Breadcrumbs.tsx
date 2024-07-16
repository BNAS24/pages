import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ActiveLastBreadcrumb({ title, category }: any) {
  const [genre, setGenre] = useState<string>("");
  const [book, setBook] = useState<string>("");

  const getPathnameGenre = usePathname();
  const extractedGenre =
    getPathnameGenre.split("/")[2].charAt(0).toUpperCase() +
    getPathnameGenre.split("/")[2].slice(1);

  useEffect(() => {
    const setPathnames = () => {
      setGenre(extractedGenre);
      setBook(title);
    };

    setPathnames();
  }, [extractedGenre, title]);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "48px",
        paddingY: "0.5rem",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {/*Home link*/}
        <Link href="/">Home</Link>

        {/*Genre link and typography component - conditionally rendered.*/}
        {book ? (
          <Link href={`/categories/${category}`}>{category}</Link>
        ) : (
          <Typography>{category}</Typography>
        )}

        {/*Book title*/}
        <Typography>{book}</Typography>
      </Breadcrumbs>
    </Container>
  );
}
