import { Product } from "@/db/models/product";

// GET /api/products
export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = 8
      const search = url.searchParams.get("search") || undefined

      const products = await Product.findAll(page, limit, search)

      return Response.json(products, {
          status: 200
      })
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
    }
    
}