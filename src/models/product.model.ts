import { Schema, model, models } from "mongoose";

export type ProductType = "pdf";

export interface IProduct {
  title: string;
  price: number;
  type: ProductType;

  // filename inside private-pdf/
  filePath: string;

  isPublished: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["pdf"],
      default: "pdf",
    },

    filePath: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  models.Product ||
  model<IProduct>("Product", ProductSchema);