import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ActiveLastBreadcrumb({ title }: any) {
  const [genre, setGenre] = useState<string>("");
  const [book, setBook] = useState<string>("");

  const genreFromPathname = usePathname();
  const genreExtracted =
    genreFromPathname.split("/")[2].charAt(0).toUpperCase() +
    genreFromPathname.split("/")[2].slice(1);

  useEffect(() => {
    const setPathnames = () => {
      setGenre(genreExtracted);
      setBook(title);
    };

    setPathnames();
  }, [genreExtracted, title]);

  console.log({
    genreExtracted: genreExtracted,
    bookExtracted: book,
  });

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        height: "48px",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Pages
        </Link>
        <Link href={`categories/${genreFromPathname}`}>
          {genre}
        </Link>
        <Link color="text.primary" href={`/`} aria-current="page">
          {book}
        </Link>
      </Breadcrumbs>
    </Container>
  );
}
