import mongoose, { Schema, Document } from "mongoose";

export interface IPhone extends Document {
  id: number;
  brand: string;
  model: string;
  memory: number;
  release: Date;
}

const PhoneSchema: Schema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  memory: { type: Number, required: true },
  release: { type: Date, required: true },
});

PhoneSchema.virtual("id").get(function (this: IProjeto) {
  return this._id.toHexString();
});

PhoneSchema.set("toJSON", {
  virtuals: true,
});

const Phone = mongoose.model<IPhone>("Phone", PhoneSchema);

export default Phone;
