interface CheckBookGenreParams {
  bookDetails?: string[];
  supportedGenres: string[];
}

// There will be a predefined set of names that the books from the detilas might have, and if they have one of them , they will match

const supportedBookGenres: string[] = [
  "Kids",
  "Thrillers",
  "Romance",
  "Self-Help",
  "Physchology",
  "Health & Fitness",
];

const relatedGenres: string[] = [
"Medical",
"Juvenile Fiction",
"Boarding Schools",
];

export const checkForBookGenre = ({
  bookDetails,
  supportedGenres,
}: CheckBookGenreParams) => {
  // Genres list with their lowercase counterparts
  const addBookGenresWithLowerCase: string[] = supportedGenres
    .map((genre) => [genre, genre.toLowerCase()])
    .flat();

  // Check if any of the genres from book details, matches

  return addBookGenresWithLowerCase;
};
