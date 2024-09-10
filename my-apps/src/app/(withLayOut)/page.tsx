import { ProductType } from "@/db/models/product";
import Image from "next/image";
import Link from "next/link";
import Card from "../components/Card";
import CardFitur from "../components/CardFitur";

export const dynamic = 'force-dynamic'

const fetchProducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    const data: ProductType[] = await response.json();
    return(data);
  } catch (error) {
    console.log(error);
  }
};



export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="relative font-sans before:absolute before:w-full h-[70vh] before:inset-0 before:bg-black before:opacity-50 before:z-10">
    <img
      src="https://plus.unsplash.com/premium_photo-1672883551967-ab11316526b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Banner Image"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
      <h2 className="sm:text-4xl text-2xl font-bold mb-6">Welcome to Prime Picks</h2>
      <p className="sm:text-lg text-base text-center text-gray-200">
        Experience the Best of Shopping with Our Curated Collection,
                Offering You Personalized Choices and Unmatched Quality for
                Every Occasion
      </p>
      <Link
        href="/products"
        type="button"
        className="mt-12 bg-transparent text-white text-base py-3 px-6 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300"
      >
        Shopping Now
      </Link>
    </div>

    <div className="font-[sans-serif] bg-[#856771] py-8 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="md:text-2xl text-3xl font-bold md:!leading-[55px] text-white">
      Best Products
    </h2>
  </div>
  <div className="xl:max-w-5xl max-w-5xl mx-auto mt-12">
    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
    {products?.slice(0, 8).map((product) => {
            return <CardFitur key={product.slug} product={product} />;
          })}
    </div>
  </div>
</div>
 </div>
  

  )
}
