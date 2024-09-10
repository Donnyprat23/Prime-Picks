"use client";
import { WishlistId } from "@/db/models/wishlist";
import Swal from "sweetalert2";

type Props = {
  product: WishlistId;
  onRemove: (_id: string) => void;
};

export default function DeleteWishlist({ product, onRemove }: Props) {
  const handleDelete = async (_id: string) => {
    try {
      const form = {
        _id,
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "DELETE",
        body: JSON.stringify({ form }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { message: string };
        throw new Error(errorBody.message);
      }
      await response.json();
      Swal.fire({
        title: "Success",
        text: "Product removed from wishlist",
        icon: "success",
        confirmButtonText: "OK",
      });
      onRemove(_id);
    } catch (error) {
      console.log(error, "<<< button delete wishlist");
      Swal.fire({
        title: "Error",
        text: "Failed to remove product from wishlist",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleDelete(product._id.toString());
      }}
      className="text-[#4AC419] p-3 rounded-full shadow-[3px_3px_6px_#d9d9d9,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d9d9d9,inset_-3px_-3px_6px_#ffffff] transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
}
