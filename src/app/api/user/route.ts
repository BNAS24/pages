import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/db";
import mongoose from "mongoose";

// Get user from db
export async function GET(req: NextRequest) {
  // Extract user email from body (auth0's user details)
  const email = req.nextUrl.searchParams.get("email");

  try {
    // Connect db to server
    await dbConnect();

    // Use the native MongoDB driver to access the 'users' collection
    const db = mongoose.connection.db;

    // Accessing the specified collection in the mongodb database
    const userCollection = db.collection("users");
    const bookCollection = db.collection("books");

    // Find user in db
    const user = await userCollection.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    // Manually populate the bookmarks
    const bookIds = user.bookmarks || [];
    const books = await bookCollection
      .find({ _id: { $in: bookIds } })
      .toArray();

    // Attach the populated books to the user object
    user.bookmarks = books;

    console.log("user on server populate", user);
    // Send user data in response
    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// export async function PUT(req: NextRequest) {
//   try {
//     // Connect to the database
//     await dbConnect();

//     // Use the native MongoDB driver to access the 'users' collection
//     const db = mongoose.connection.db;
//     const userCollection = db.collection("users");

//     // Parse the JSON body
//     const data = await req.json();
//     const userId = data.user.id;
//     const bookData = data.book;

//     return NextResponse.json("User data updated successfully");
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }