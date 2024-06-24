import { Schema, model, models } from "mongoose";

const GroupSchema = new Schema({
  name: {type: String},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  private: {type: Boolean},
  description: {type: String},
  length: {type: Number}
})

const Group = models.Group || model('Group', GroupSchema)

export default Group;