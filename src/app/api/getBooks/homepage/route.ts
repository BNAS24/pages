// @desc Get list of all books from Google Books API
// @route /api/getBooks/homepage
// @access Public
import fetchData from "@/app/utils/fetchData";
import { NextResponse } from "next/server";
import { filterBooks } from "@/app/utils/filterBooks";
import { generateResponse } from "@/app/utils/bookCategories";

export async function GET() {
  try {
    const categories = [
      "Kids",
      "Thrillers",
      "Romance",
      "Self-Help",
      "Pyschology",
      "Health & Fitness",
    ];

    const urls = [
      "https://www.googleapis.com/books/v1/volumes?q=subject:juvenile+fiction&maxResults=40",
      "https://www.googleapis.com/books/v1/volumes?q=subject:fiction+thrillers&maxResults=40",
      "https://www.googleapis.com/books/v1/volumes?q=subject:fiction+Romance&maxResults=40",
      "https://www.googleapis.com/books/v1/volumes?q=subject:self-help&maxResults=40",
      "https://www.googleapis.com/books/v1/volumes?q=subject:psychology&maxResults=40",
      "https://www.googleapis.com/books/v1/volumes?q=subject:health+&+fitness&maxResults=40",
    ];

    // Fetch data concurrently
    const results = await Promise.all(urls.map((url) => fetchData(url)));

    // Extract the 'items' property from each result
    const data = results.map((result) => result.items || []);

    // Filter the results of books that dont meet certain conditions and then return them to the frontend
    const filteredData = data.map(filterBooks);

    // Generate dynamic response
    const response = generateResponse(categories, filteredData);

    return NextResponse.json({
      response,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};