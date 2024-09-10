"use client";

import { ProductType } from "@/db/models/product";
import Swal from "sweetalert2";

type Props = {
  product: ProductType;
};

export default function WhislistButton({ product }: Props) {
  const handleWishlist = async (productId: string) => {
    const form = {
      productId,
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorBody = (await response.json()) as { message: string };
        console.log(errorBody, "errorBody");
        throw new Error(errorBody.message);
      }
      const responseBody = (await response.json())
      Swal.fire({
        title: "Success Add To Wishlist",
        text: responseBody.message,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error: any) {
        // console.log(error)
    //   console.error("Sorry Error Add To Wishlist", error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleWishlist(product._id.toString());
      }}
      type="button"
      className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-green-700 outline-none bg-transparent hover:bg-green-700 text-green-700 hover:text-white transition-all duration-300"
    >
      Add Product
    </button>
  );
}
