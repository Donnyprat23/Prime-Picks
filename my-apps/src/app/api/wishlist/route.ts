import { Wishlist, WishlistType } from "@/db/models/wishlist";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const wishlist = await Wishlist.findByUserId(userId);

    return Response.json(wishlist, {
      status: 200,
    });
  } catch (error) {
    console.log(error, "<<<<>>>> error api/wishlist/route");
    return Response.json(
      {
        message: "Failed to get wishlist api/wishlist/route",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: WishlistType = await request.json();
    body.userId = new ObjectId(request.headers.get("x-user-id") as string);
    const result = await Wishlist.create(body);
    if (result === "product already exists in wishlist") {
      return Response.json(
        {
          message: "product already exists in wishlist",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        message: "Success create wishlist",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error, "<<<<< api/wishlist/route");
    return Response.json(
      {
        message: "Failed  to create wishlist",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request) {
  try {
      const body = await request.json()        
      const result = await Wishlist.deleteWishlist(body.form._id);
      if (result.deletedCount === 0) {
          return Response.json({ message: 'Product not found' }, { status: 404 });
      }
      return Response.json({ message: 'Wishlist deleted' }, { status: 200 });
  } catch (error) {
      console.log(error, '<<<<< Error api/wishlist delete');
      return Response.json({ message: 'Failed to delete wishlist' }, { status: 500 })
  }
}
