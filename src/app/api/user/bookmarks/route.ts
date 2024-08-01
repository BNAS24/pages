import Book, { BookType } from "@/app/_models/Books";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/db";
import mongoose from "mongoose";

// Update user's bookmarks and new book in the db
export async function PUT(req: NextRequest) {
  // Extract user userId from nextjs url params
  const userId = req.nextUrl.searchParams.get("userId");

  // Retrieve book information from request
  const bookData = await req.json();

  console.log("Book from request:", bookData);
  console.log("userId:", userId);

  // Ensure both userId and bookData are provided
  if (!userId || !bookData) {
    return NextResponse.json(
      { message: "Missing userId or bookData" },
      { status: 400 }
    );
  }

  try {
    // Connect db to server
    await dbConnect();

    // Use the native MongoDB driver to access the 'users' collection.
    const db = mongoose.connection.db;
    const userCollection = db.collection("users");

    // Check if book already exists in database
    const bookExists: BookType | null = await Book.findOne({
      googleBooksId: bookData.id,
    });

    // If the book doesnt exist we create a new book in the db and then update the user's bookmarks information.
    if (!bookExists) {
      const book: BookType = new Book({
        title: bookData.volumeInfo.title,
        description: bookData.volumeInfo.description,
        link: bookData.volumeInfo.previewLink,
        googleBooksId: bookData.id,
        author: bookData.volumeInfo.authors.join(","),
        image: bookData.volumeInfo.imageLinks.thumbnail,
      });

      // Save book in the db
      await book.save();

      // Adds book to user bookmark list
      await userCollection.updateOne(
        { sub: userId },
        {
          $addToSet: {
            bookmarks: new mongoose.Types.ObjectId(book._id as string),
          },
        }
      );

      console.log("Book created:", book);
      return NextResponse.json({
        message: "Book created and saved in user's bookmarks",
      });
    }

    // If book already exists in the db , then it updates users bookmarks accordingly.
    await userCollection.updateOne(
      { sub: userId },
      {
        $addToSet: {
          bookmarks: new mongoose.Types.ObjectId(bookExists._id as string),
        },
      }
    );

    return NextResponse.json({
      message: "Book saved to user's bookmarks",
      bookExisted: bookExists,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Remove book from users bookmarks
export async function DELETE(req: NextRequest) {
  // Extract user userId from nextjs url params
  const userId = req.nextUrl.searchParams.get("userId");
  const bookId = req.nextUrl.searchParams.get("bookId");

  // Ensure both userId and bookId are provided
  if (!userId || !bookId) {
    console.error({
      message: "Please provide both userId and bookId",
      userId: userId,
      bookId: bookId,
    });
    return NextResponse.json(
      { message: "Missing userId or bookId" },
      { status: 400 }
    );
  }

  console.log("deleting", bookId);

  try {
    // Connect db to server
    await dbConnect();

    // Use the native MongoDB driver to access the 'users' collection.
    const db = mongoose.connection.db;
    const userCollection = db.collection("users");

    // Find user in db
    const user: any = await userCollection.findOne({
      sub: userId,
    });

    const book = await Book.findOne({ googleBooksId: bookId });

    if (!user || !book) {
      console.log("book:", book);
      throw new Error("User or book not found", user);
    }

    // Remove objectid from users bookmarks array
    await userCollection.updateOne(
      { sub: userId },
      { $pull: { bookmarks: book._id as any } }
    );

    return NextResponse.json({ message: "Book removed from bookmarks" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
