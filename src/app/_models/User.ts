import { models, model, Schema, Document, Types } from "mongoose";

// Interface for the user model
export interface User extends Document {
  userId?: string;
  nickname?: string;
  username?: string;
  bookmarks?: Types.ObjectId[]; // Use ObjectId for references
  logins?: number;
  email?: string;
  password?: string;
}

const userSchema = new Schema<User>({
  userId: {
    type: String,
    required: false,
  },
  nickname: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  logins: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{
  collection: 'users' // Explicitly specify the collection name
});

const UserModel = models.UserModel || model<User>("UserModel", userSchema, "users");

export default UserModel;
