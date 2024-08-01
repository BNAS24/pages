import { Container, Typography } from "@mui/material";
import { getSession } from "@auth0/nextjs-auth0";
import { Book } from "@/app/_components/custom/book-related/BookShelf";

export const UserData = async () => {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User session not found or user not authenticated");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?email=${session?.user.email}&sub=${session?.user.sub.split("|")[1]}`,
  );

  if (!response.ok) {
    throw new Error(
      "Something went wrong fetching additional user information"
    );
  }

  const data = await response.json();
  const bookmarks = data.bookmarks;

  console.log("sessions: ", session);
  console.log("user data fetched:", data);

  return (
    <Container
      disableGutters={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {bookmarks && (
        <>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            fontWeight={700}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
              color: "var(--palette-primary-main)",
            }}
          >
            {`Welcome ${data.username}!`}
          </Typography>

          {/* Show bookmarks saved by user */}
          <Container
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(3, 1fr)", // 0px
                sm: "repeat(5, 1fr)", // 600px
                md: "repeat(8, 1fr)", // 900px
                lg: "repeat(9, 1fr)", // 1200px
                xl: "repeat(9, 1fr)", // 1536px
              },
              rowGap: "1rem",
              paddingY: "1.5rem",
              backgroundColor: "var(--palette-primary-main)",
            }}
          >
            {bookmarks.length > 0 ? (
              bookmarks.map((book: any) => (
                <Book
                  key={book.googleBookId}
                  title={book.title}
                  bookCover={book.image}
                  maxWidth="88px"
                  fontSize="1rem"
                  link={book.googleBooksId}
                  category={book.category}
                />
              ))
            ) : (
              <Typography
                align="center"
                fontWeight={600}
                sx={{
                  fontSize: "1rem",
                }}
              >
                You currently have no bookmarks saved
              </Typography>
            )}
          </Container>
        </>
      )}
    </Container>
  );
};
