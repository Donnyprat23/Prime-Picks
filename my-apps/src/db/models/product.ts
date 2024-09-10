import { z } from "zod";
import { db } from "../config";
import { WithId } from "mongodb";

const ProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  price: z.number(),
  tags: z.array(z.string()),
  thumbnail: z.string(),
  images: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductType = WithId<z.infer<typeof ProductSchema>>;

export class Product {
  static col() {
    return db.collection("Products");
  }

  static async findAll(page: number = 1, limit: number = 8, search?: string) {
    try {
      let filter = {};
      if (search) {
        filter = {
          $or: [
            {
              name: { $regex: search, $options: "i" },
            },
          ],
        };
      }
      const skip = (page - 1) * limit;

      const result = await this.col().find(filter).skip(skip).limit(limit).toArray();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(filter: Partial<ProductType>) {
    try {
      const result = await this.col().findOne(filter);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
