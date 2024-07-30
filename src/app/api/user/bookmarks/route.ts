import Book, { BookType } from "@/app/_models/Books";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/db";
import mongoose from "mongoose";

// Update user's bookmarks and new book in the db
export async function PUT(req: NextRequest) {
  // Extract user userId from nextjs url params
  const userId = req.nextUrl.searchParams.get("userId");

  // Retrieve book information from request
  const request = await req.json();
  const bookData = request.book;

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
      googleBooksId: bookData.googleBooksId,
    });

    // If the book doesnt exist we create a new book in the db and then update the user's bookmarks information.
    if (!bookExists) {
      const book: BookType = new Book({
        title: bookData.title,
        description: bookData.description,
        link: bookData.link,
        googleBooksId: bookData.googleBooksId,
        author: bookData.author,
        image: bookData.image,
        category: bookData.category,
      });

      // Save book in the db
      await book.save();

      // Adds book to user bookmark list
      await userCollection.updateOne(
        { _id: new mongoose.Types.ObjectId(userId) },
        { $addToSet: { bookmarks: book._id } }
      );

      console.log("Book created:", book);
      return NextResponse.json({
        message: "Book created and saved in user's bookmarks",
      });
    }

    // If book already exists in the db , then it updates users bookmarks accordingly.
    await userCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $addToSet: { bookmarks: bookExists._id } }
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
      _id: new mongoose.Types.ObjectId(userId),
    });

    const book = await Book.findById(bookId);

    if (!user || !book) {
      throw new Error("User or book not found");
    };

    // Remove objectid from users bookmarks array
    await userCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $pull: { bookmarks: new mongoose.Types.ObjectId(bookId) as any} }
    );

    return NextResponse.json({ message: "Book removed from bookmarks" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
