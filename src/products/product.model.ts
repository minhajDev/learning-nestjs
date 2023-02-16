/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose'

export const ProductSchema = new Schema({
    title: { type: String, require: true },
    desc: { type: String, require: true },
    price: { type: Number, require: true }
});
export interface Product extends Document {
    id: string;
    title: string;
    desc: string;
    price: number;
}
