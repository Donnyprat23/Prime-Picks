import { cookies } from 'next/headers';
import { verifyToken } from './helpers/jwt';
import { UserType } from './db/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function auth(request: NextRequest){ 
    try {
        const authCookie = cookies().get('Authorization')
        if(!authCookie) {
           throw new Error ("Invalid Token")
        }

        const [type, token] = authCookie.value.split(" ")
        if(type !== "Bearer") {
            throw new Error ("Invalid Token")
        }

        const result = await verifyToken<UserType>(token)

        const requestHeader = new Headers(request.headers)
        requestHeader.set("x-user-id", result._id.toString())
        requestHeader.set("x-user-name", result.name.toString())
        requestHeader.set("x-user-email", result.email.toString())
        return requestHeader
    } catch (error) {
        throw error
    }
}

export async function middleware(request: NextRequest){
    try {
        const headers = await auth(request)
        return NextResponse.next({
            request: {
                headers: headers
            }
        })
    } catch (error) {
        console.log(error);
    
        if (error instanceof Error) {
            return NextResponse.json<{error: string}>({
                error: error.message
            }, {status: 401})
        }

        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        })
    }
}
export const config = {
    matcher:[ 
        "/api/wishlist",
        "/api/wishlist/:path*"
    ]
}
