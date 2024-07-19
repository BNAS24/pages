// Function to filter books based on specified conditions
export const filterBooks = (books: any) => {
  return books.filter((book: any) => {
    const volumeInfo = book.volumeInfo;
    return (
      volumeInfo.previewLink &&
      volumeInfo.imageLinks &&
      volumeInfo.language === "en"
    );
  });
};