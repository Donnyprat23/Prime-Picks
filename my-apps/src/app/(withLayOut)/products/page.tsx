"use client";
import { ProductType } from "@/db/models/product";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";

export const dynamic = 'force-dynamic'

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [Search, setSearch] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?page=${page}&limit=8&search=${Search}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data: ProductType[] = await response.json();
        if (data.length < 8) {
          setHasMore(false);
        }
        setProducts((prevProducts) => {
          const newProducts = data.filter(
            (product) => !prevProducts.some((p) => p.slug === product.slug)
          );
          return [...prevProducts, ...newProducts];
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [page, Search]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
    setPage(1);
    setHasMore(true);
    setProducts([]);
  };

  return (
    <div className="font-[sans-serif] bg-[#856771]">
      <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          Products
        </h2>
        <SearchBar handleSearch={handleSearch} search={Search} />
        <InfiniteScroll dataLength={products.length} next={loadMore} hasMore={hasMore} loader={<h4>Loading...</h4>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {products.map((product) => {
              return <Card key={product.slug} product={product} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
