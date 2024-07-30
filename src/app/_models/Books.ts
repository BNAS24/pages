import { Model, model, models, Schema, Document } from "mongoose";

// Interface types required for books
export interface BookType extends Document {
  title: string;
  description: string;
  link: string;
  googleBooksId: string;
  author: string;
  image: string;
  category: string;
}

const bookSchema = new Schema<BookType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  googleBooksId: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  }
});

const Book: Model<BookType> = models.Book || model("Book", bookSchema);

export default Book;
