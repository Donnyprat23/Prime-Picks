import { ProductType } from "@/db/models/product";
import { rupiahFormat } from "@/helpers/rupiah";


type ProductDetailProps = {
    params: {
        slug: string;
    }
}

export default async function ProductDetail(props: ProductDetailProps) {
    const { slug } = props.params;
    
    async function getProductBySlug(slug: string): Promise<ProductType | null> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/` + slug);
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const data: ProductType = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const product = await getProductBySlug(slug);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="font-sans bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal">
                                {product?.images.map((image, index) => (
                                    <button
                                        key={index}
                                        className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                    >
                                        <span className="sr-only">Image {index + 1}</span>
                                        <span className="absolute inset-0 rounded-md overflow-hidden">
                                            <img src={image} alt="" className="w-full h-full object-center object-cover" />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full aspect-w-1 aspect-h-1">
                            <img
                                src={product?.thumbnail}
                                alt={product?.name}
                                className="w-full h-full object-center object-cover sm:rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product?.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">{rupiahFormat(product?.price)}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Description</h3>
                            <div className="mt-2 prose prose-sm text-gray-500">
                                <p>{product?.description || "No description available."}</p>
                            </div>
                        </div>

                        <form className="mt-6">
                            {/* Size picker */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                                </div>

                                <div className="grid grid-cols-5 gap-4 mt-2">
                                    {['SM', 'MD', 'LG', 'XL', 'XXL'].map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            className="bg-white border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color picker */}
                            <div className="mt-8">
                                <h2 className="text-sm font-medium text-gray-900">Color</h2>
                                <div className="flex items-center space-x-3 mt-2">
                                    {['bg-black', 'bg-gray-400', 'bg-orange-400', 'bg-red-400'].map((color, index) => (
                                        <button
                                            key={index}
                                            className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${color}`}
                                        >
                                            <span className="sr-only">Color {index + 1}</span>
                                            <span className="h-8 w-8 rounded-full border border-black border-opacity-10" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 flex sm:flex-col1">
                                <button
                                    type="submit"
                                    className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                >
                                    Add to cart
                                </button>

                                <button
                                    type="button"
                                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <svg className="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="sr-only">Add to favorites</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
