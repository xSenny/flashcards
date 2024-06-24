'use server'
import { CreateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase()

    const createdUser = await User.create(user)

    return createdUser;
  } catch (e) {
    console.log(e)
  }
}

export const deleteUser = async (clerkId: String) => {
  try {

    await connectToDatabase()

    const deletedUser = await User.findOneAndDelete({clerkId})

    return deletedUser;

  } catch (e) {
    console.log(e)
  }
}