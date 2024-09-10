import { Product } from '@/db/models/product';

type SecondParam = {
    params: {
        slug: string
    }
}
export async function GET(request:Request, {params}: SecondParam) {
    const product = await Product.findOne(params);
    return Response.json(product);
}