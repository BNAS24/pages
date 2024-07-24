import { models, model, Schema } from "mongoose";

// Interface types required for books
interface Book {
  title: string;
  description?: string;
  link: string;
}

// Interface for the user model
export interface User {
  userId: string;
  nickname: string;
  username: string;
  bookmarks: Book[];
}

const userSchema = new Schema<User>({});

const UserModel = models.UserModel || model("UserModel", userSchema);

export default UserModel;