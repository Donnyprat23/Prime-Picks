import { rupiahFormat } from "@/helpers/rupiah";
import { ProductType } from "../../db/models/product";
import Link from "next/link";
import WhislistButton from "./WishlistButton";
type Props = {
  product: ProductType;
};
export default function Card({ product }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
      <Link href={`/products/${product.slug}`}>
      <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
        <img
          src={product.thumbnail}
          alt="Product 1"
          className="h-full w-full object-contain"
        />
      </div>
      </Link>

      <div>
        <h3 className="text-lg font-extrabold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <h4 className="text-lg text-gray-800 font-bold mt-4">
          {rupiahFormat(product.price)}
        </h4>
      </div>

    <WhislistButton product={product} />
    </div>
  );
}
