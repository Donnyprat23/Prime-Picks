"use client";
import DeleteWishlist from "@/app/components/DeleteButton";
import { WishlistId, WishlistType } from "@/db/models/wishlist";
import { rupiahFormat } from "@/helpers/rupiah";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic'

type item = {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: {
    _id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    thumbnail: string;
  };
};

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistId[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data: WishlistId[] = await response.json();
        setWishlist(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = (_id: string) => {
    const updatedWishlist = wishlist.filter(
      (item) => item._id.toString() !== _id
    );
    setWishlist(updatedWishlist);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {wishlist.map((item) => {
        return (
          <div
            key={item._id.toString()}
            className="bg-white shadow-lg rounded-xl overflow-hidden w-80 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-48">
              <img
                src={item.product.thumbnail}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-gray-800 text-xl font-bold truncate">
                {item.product.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {item.product.description}
              </p>
              <div className="mt-4 flex justify-between items-center font-extrabold">
                <span className="text-sm text-black">
                  {rupiahFormat(item.product.price)}
                </span>
                <DeleteWishlist onRemove={handleRemove} product={item} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
