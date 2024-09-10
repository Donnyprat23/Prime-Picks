import { z } from "zod";
import { db } from "../config";
import { ObjectId, WithId } from "mongodb";
import { ProductType } from "./product";
const wishlistSchema = z.object({
  userId: z.instanceof(ObjectId),
  productId: z.instanceof(ObjectId),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type WishlistType = z.infer<typeof wishlistSchema>;
export type WishlistId = WithId<WishlistType> & {
  product: ProductType;
};

export class Wishlist {
  static collection() {
    return db.collection<WishlistType>("Wishlists");
  }

  static async findByUserId(userId: string) {
    try {
      const pipeline = [
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "Products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
      ];

      const result = await this.collection().aggregate(pipeline).toArray();

      return result;
    } catch (error) {
      console.log(error, "<<<<< error modelll");
      throw new Error("Failed to find wishlist by user id modelll");
    }
  }

  static async create(payload: WishlistType) {
    try {
      const newData = {
        userId: new ObjectId(payload.userId),
        productId: new ObjectId(payload.productId),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const existingWishlist = await this.collection().findOne({
        userId: new ObjectId(payload.userId),
        productId: new ObjectId(payload.productId),
      });
      if (existingWishlist) {
        return "product already exists in wishlist";
      }

      const result = await this.collection().insertOne(newData);
      return "success create wishlist";
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create wishlist");
    }
  }

  static async deleteWishlist(wishlistId: string) {
    try {
      return await this.collection().deleteOne({
        _id: new ObjectId(wishlistId),
      });
    } catch (error) {
      throw new Error("Failed to delete wishlist");
    }
  }
}
