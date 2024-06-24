export type CreateUserParams = {
  clerkId: String,
  firstName: String,
  imageUrl: String,
  email: String
}

export type CreateGroupParams = {
  name: String,
  description: String,
  public: Boolean,
  creator: String,
  length: Number,
  createdAt: Date,
}