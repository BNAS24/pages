import UserModel from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/_lib/db";

// Get user from db
export async function GET(req: NextRequest) {
  // Extract user id from body
  const email = req.nextUrl.searchParams.get("email");
  
  console.log("email", email);
  try {
    await dbConnect();

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Create new user and store into db
export async function POST() {
  return;
}

// Update user information
export async function PUT() {
  return;
}
