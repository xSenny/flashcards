'use server'

import { CardParams } from "@/types"
import { connectToDatabase } from "../database"
import Card from "../database/models/card.model"
import Group from "../database/models/cardgroup.model"

export const createCard = async (card: CardParams) => {
  try {
    await connectToDatabase()

    const createdCard = await Card.create(card)

    const group = await Group.findById(card.group)
    if (!group) return new Error('Could not find the group')

    await Group.findByIdAndUpdate(card.group, {length: group.length + 1})

    return JSON.parse(JSON.stringify(createdCard));
  } catch (e) {
    console.log(e)
  }
}

export const getAllCardsForGroup = async (group: string) => {
  try {
    await connectToDatabase()

    const cards = await Card.find({group})

    return cards;
  } catch (e) {
    console.log(e)
  }
}

export const updateCard = async ({id, question, answer}: {id: string, question: string, answer: string}) => {
  try {
    await connectToDatabase()

    const card = await Card.findByIdAndUpdate(id, {question, answer})

    return JSON.parse(JSON.stringify(card))
  } catch (e) {
    console.log(e)
  }
}

export const deleteCard = async (id: string) => {
  try {
    await connectToDatabase()
    const d = await Card.findById(id)
    
    const group = await Group.findById(d.group)
    if (!group) throw new Error('Could not find the group')

    await Group.findByIdAndUpdate(d.group, {length: group.length - 1})

    await Card.findByIdAndDelete(id)

    return {deleted: true}
  } catch (e) {
    console.log(e)
  }
}