import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/db";
import mongoose from "mongoose";

// Get user from db
export async function GET(req: NextRequest) {
  // Extract user email from body (auth0's user details)
  const email = req.nextUrl.searchParams.get("email");
  const auth0Id = req.nextUrl.searchParams.get("sub");

  if (!email || !auth0Id) {
    console.error({ email: email, auth0Id: auth0Id });
    throw new Error("email or auth0Id is not specified");
  }

  try {
    // Connect db to server
    await dbConnect();

    // Use the native MongoDB driver to access the 'users' collection
    const db = mongoose.connection.db;

    // Accessing the specified collection in the mongodb database
    const userCollection = db.collection("users");
    const bookCollection = db.collection("books");

    // Find user in db
    const user = await userCollection.findOne({ email: email, sub: auth0Id });

    if (!user) {
      throw new Error("User not found");
    }

   // Add auth0 user-specific id to db for better authentication if it doesn't exist yet
   if (!user.sub) {
    const updateResult = await userCollection.updateOne(
      { email: email },
      { $set: { sub: auth0Id } }
    );
    if (updateResult.modifiedCount === 0) {
      throw new Error("Failed to update user with auth0Id");
    }
  }

    // Manually populate the bookmarks
    const bookIds = user.bookmarks || [];
    const books = await bookCollection
      .find({ _id: { $in: bookIds } })
      .toArray();

    // Attach the populated books to the user object
    user.bookmarks = books;

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
