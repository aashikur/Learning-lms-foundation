import fs from "fs";
import path from "path";

import { Product, IProduct } from "@/models/product.model";

type CreatePDFInput = {
  title: string;
  price: number;
  filePath: string;
};

export async function createPDF(
  data: CreatePDFInput
) {
  const { title, price, filePath } = data;

  // check file exists
  const absolutePath = path.join(
    process.cwd(),
    "private-pdf",
    filePath
  );

  const exists = fs.existsSync(
    absolutePath
  );

  if (!exists) {
    throw new Error(
      `PDF not found: ${filePath}`
    );
  }

  const product =
    await Product.create({
      title,
      price,
      type: "pdf",
      filePath,
      isPublished: true,
    });

  return product;
}

export async function getById(
  productId: string
) {
  return Product.findById(
    productId
  );
}

export async function getPublishedPDFs() {
  return Product.find({
    type: "pdf",
    isPublished: true,
  }).sort({
    createdAt: -1,
  });
}