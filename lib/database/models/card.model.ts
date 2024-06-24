import { Schema, model, models } from "mongoose";

const CardSchema = new Schema({
  group: {type: Schema.Types.ObjectId, ref: 'Group'},
  question: {type: String},
  answer: {type: String},
})

const Card = models.Card || model('Card', CardSchema)

export default Card;