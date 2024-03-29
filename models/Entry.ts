import { IEntry } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface IEntrySchema extends IEntry {}

const entrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} is not a valid status",
    },
    default: 'pending'
  },
});

const EntryModel: Model<IEntrySchema> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
