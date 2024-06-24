'use server'
import {CreateGroupParams} from '@/types'
import { connectToDatabase } from '../database'
import Group from '../database/models/cardgroup.model'
export const createGroup = async (group: CreateGroupParams) => {
  try {
    await connectToDatabase()
    const newGroup = await Group.create(group)

    return newGroup;
  } catch (e) {
    console.log(e)
  }
}

export const getOwnedGroups = async (userId: String) => {
  try {
    await connectToDatabase()

    const groups = await Group.find({creator: userId}).limit(7)

    return groups;
  } catch (e) {
    console.log(e)
  }
}

export const getAllGroups = async() => {
  try {
    await connectToDatabase()

    

  } catch (e) {
    console.log(e)
  }
}