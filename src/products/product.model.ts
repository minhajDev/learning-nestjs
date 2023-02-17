/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';

// Define the schema for a product in our MongoDB database
export const ProductSchema = new Schema({
  title: { type: String, require: true }, // The title of the product, a required string
  desc: { type: String, require: true }, // A description of the product, a required string
  price: { type: Number, require: true }, // The price of the product, a required number
});

// Define an interface that describes a Product document in the database
export interface Product extends Document {
  id: string; // The unique identifier for the product document
  title: string; // The title of the product
  desc: string; // A description of the product
  price: number; // The price of the product
}
