'use server'
import {CreateGroupParams} from '@/types'
import { connectToDatabase } from '../database'
import Group from '../database/models/cardgroup.model'
import User from '../database/models/user.model'
import Card from '../database/models/card.model'

const populateGroup = (query: any) => {
  return query.populate({path: "creator", model: User, select: 'firstName imageUrl'})
}


export const createGroup = async (group: CreateGroupParams) => {
  try {
    await connectToDatabase()
    const newGroup = await Group.create(group)

    return newGroup;
  } catch (e) {
    console.log(e)
  }
}

export const getOwnedGroups = async (userId: String, all?: Boolean) => {
  try {
    await connectToDatabase()

    if (all) {
      const groups = await Group.find({creator: userId})
      return groups;
    }

    const groups = await Group.find({creator: userId}).limit(7)
    return groups;
  } catch (e) {
    console.log(e)
  }
}

export const getAllPublicGroups = async() => {
  try {
    await connectToDatabase()

    // const titleConditions = query ? {name: {$regex: query, $options: 'i'}} : {}

    const groups = await Group.find({public: true})

    return groups;
  } catch (e) {
    console.log(e)
  }
}

export const getGroupById = async (id: String) => {
  try {
    await connectToDatabase();

    const query = Group.findById(id);
    const group = await populateGroup(query)
    return group;
  } catch (e) { 
    console.log(e)
  }
}

export const deleteGroup = async (id: string) => {
  try {
    await connectToDatabase();

    const groupToDelete = await Group.findById(id);
    if (!groupToDelete) throw new Error('No group found')

    await Card.deleteMany({group: groupToDelete._id})

    await Group.findByIdAndDelete(id)

    return {message: "Deleted group"}
  } catch (e) {
    console.log(e)
  }
}