// @desc Get list of books from specific category from Google Books API
// @route /api/getBooks/featured-categories
// @access Public
import { Categories } from "@/app/_types/interfaces/categoryContent";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Destructure category name from the path name of the request
  const bookCategory = req.nextUrl.searchParams.get('bookCategory');
  console.log("bookCategory:", bookCategory);

  const categories = [
    "Kids",
    "Thrillers",
    "Romance",
    "Self-Help",
    "Psychology",
    "Health & Fitness",
  ];

  const checkIfACategoryMatches = ({ categories, request }: Categories) => {
    // Filter through categories and and check if the requsted has a matching category and returns the match
    const match = categories.filter((c: string) => c === request);
    console.log("match", match);
    return match.length > 0 ? match : undefined;
  };

  const category = checkIfACategoryMatches({
    categories,
    request: bookCategory!,
  });

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=40`
    );

    if (!response.ok) {
      console.error(`Error fetching data for ${category}`);
    }

    const books = await response.json();

    return NextResponse.json([...books.items]);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
