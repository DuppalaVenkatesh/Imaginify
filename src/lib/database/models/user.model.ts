import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  planId: { type: Number, default: 1 },
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  creditBalance: { type: Number, default: 10 },
  photo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = models?.User || model("User", UserSchema);

export default User;
