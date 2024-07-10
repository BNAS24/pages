import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Container } from "@mui/material";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function ActiveLastBreadcrumb() {
  return (
    <Container
      role="presentation"
      onClick={handleClick}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "48px",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Genres
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Thrillers
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link>
      </Breadcrumbs>
    </Container>
  );
}
