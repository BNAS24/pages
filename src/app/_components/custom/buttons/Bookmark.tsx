import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface BookmarkProps {
  bookDetails: any;
  category: string | undefined | null;
}

interface BookmarkParams {
  userSub: string | undefined;
  bookDetails: any;
  category?: string | undefined| null;
}

const Bookmark = ({ bookDetails, category }: BookmarkProps) => {
  const { user } = useUser();
  const [bookSaved, setBookSaved] = useState<boolean>(false);

  useEffect(() => {
    const getBookmarkStatus = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user?email=${
          user?.email
        }&sub=${user?.sub?.split("|")[1]}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      const bookmarks = data.bookmarks;

      const checkIfBookmarked = bookmarks.some(
        (book: any) => book.googleBooksId === bookDetails.id
      );

      setBookSaved(checkIfBookmarked ? true : false);
    };

    if (user !== undefined) {
      getBookmarkStatus();
    }
  }, [user, bookDetails]);

  // auth0 sub string without the prefix
  const userSub: string | undefined = user?.sub?.split("|")[1];

  const toggleSaveBook = () => setBookSaved(!bookSaved);

  const vibrateBookmark = () => {
    if ('vibrate' in window.navigator) {
      window.navigator.vibrate(200);
    } else {
      console.warn('Vibration API not supported in this browser');
    }
  };

  const saveBookmarkInDB = async ({
    userSub,
    bookDetails,
    category,
  }: BookmarkParams) => {
    try {
      const book: any = {
        ...bookDetails,
        category: category,
      };

      console.log("category added to book", book);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/bookmarks?userId=${userSub}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Something went wrong saving book to bookmarks list: ${response.statusText}`
        );
      }

      console.log("book saved:", await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const unsaveBookmarkInDB = async ({
    userSub,
    bookDetails,
  }: BookmarkParams) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/bookmarks?userId=${userSub}&bookId=${bookDetails.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Something went wrong unsaving book from bookmarks list: ${response.statusText}`
        );
      }

      console.log("book unsaved:", await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = () => {
    if (userSub) {
      console.log({
        message: "details in handle",
        sub: userSub,
        bookDetails: bookDetails,
        category: category,
      });
      toggleSaveBook();
      vibrateBookmark();
      !bookSaved
        ? saveBookmarkInDB({ userSub, bookDetails, category })
        : unsaveBookmarkInDB({ userSub, bookDetails });
    } else {
      console.error("User not found");
    }
  };

  return (
    <>
      {user !== undefined && (
        <Box
          onClick={handleBookmark}
          sx={{
            display: "flex",
            cursor: "pointer",
            mt: "1rem",
          }}
        >
          {!bookSaved ? (
            <svg
              width={43}
              height={43}
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3736 36.4521L23.0522 36.7735L23.3736 36.4521C22.3398 35.4183 20.6602 35.4183 19.6264 36.4521L19.9478 36.7735L19.6264 36.4521L14.0665 42.0124C13.0269 43.0519 11.25 42.3159 11.25 40.8458V4.3C11.25 2.20039 12.9504 0.5 15.05 0.5H27.95C30.0496 0.5 31.75 2.20039 31.75 4.3V40.8458C31.75 42.3159 29.9731 43.0519 28.9335 42.0124L23.3736 36.4521Z"
                stroke="#FFB245"
              />
            </svg>
          ) : (
            <svg
              width={43}
              height={43}
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.25 4.3V40.8458C32.25 42.7614 29.9344 43.7204 28.5799 42.3659L23.0201 36.8056C22.1816 35.9671 20.8184 35.9671 19.9799 36.8056L14.4201 42.3659C13.0656 43.7204 10.75 42.7614 10.75 40.8458V4.3C10.75 1.92425 12.6743 0 15.05 0H27.95C30.3258 0 32.25 1.92425 32.25 4.3Z"
                fill="#FFB245"
              />
            </svg>
          )}
        </Box>
      )}
    </>
  );
};

export default Bookmark;
