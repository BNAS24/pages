import { Container, Typography } from "@mui/material";
import { getSession } from "@auth0/nextjs-auth0";
import { Book } from "@/app/_components/custom/book-related/BookShelf";
import dbConnect from "@/app/_lib/db";
import mongoose from "mongoose";

const fetchUserData = async () => {
  try {
    console.log(
      "Books and user data were fetched on server side with server component"
    );
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User session not found or user not authenticated");
    }

    const auth0Id = session.user.sub.split("|")[1];
    const userEmail = session.user.email;

    await dbConnect();
    const db = mongoose.connection.db;
    const userCollection = db.collection("users");
    const bookCollection = db.collection("books");

    // Find user in db
    const user = await userCollection.findOne({
      email: userEmail,
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.sub) {
      const updateResult = await userCollection.updateOne(
        { email: userEmail },
        { $set: { sub: auth0Id } }
      );

      if (updateResult.modifiedCount === 0) {
        throw new Error("Failed to update user with auth0Id");
      }
    }

    const bookIds = user.bookmarks || [];
    const books = await bookCollection
      .find({ _id: { $in: bookIds } })
      .toArray();
    user.bookmarks = books;

    return user;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const UserData = async () => {
  const user = await fetchUserData();

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  console.log(`Bookmarks(${user.bookmarks.length})`, user.bookmarks);
  
  return (
    <Container
      disableGutters={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user.bookmarks && (
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
            {`Welcome ${user.username}!`}
          </Typography>

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
              borderRadius: "1rem 1rem 1rem 1rem ",
              backgroundColor: "var(--palette-primary-main)",
            }}
          >
            {user.bookmarks.length > 0 ? (
              user.bookmarks.map((book: any) => (
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
