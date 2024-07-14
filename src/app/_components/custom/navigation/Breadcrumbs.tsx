import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ActiveLastBreadcrumb({ title }: any) {
  const [genre, setGenre] = useState<string>("");
  const [book, setBook] = useState<string>("");

  const getPathnameGenre = usePathname();
  const extractedGenre =
    getPathnameGenre.split("/")[2].charAt(0).toUpperCase() +
    getPathnameGenre.split("/")[2].slice(1);

  const pathname = usePathname();
  const genreBasePath = pathname.split("/").slice(0, 3).join("/");

  useEffect(() => {
    const setPathnames = () => {
      setGenre(extractedGenre);
      setBook(title);
    };

    setPathnames();
  }, [extractedGenre, title]);

  console.log({
    bookExtracted: book,
    basePath: genreBasePath,
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "48px",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">Home</Link>
        <Link href={`${genreBasePath}`}>{genre}</Link>
        <Typography>{book}</Typography>
      </Breadcrumbs>
    </Container>
  );
}
