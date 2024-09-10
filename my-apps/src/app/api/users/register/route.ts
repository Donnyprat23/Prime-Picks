import { User, UserType } from "@/db/models/user"
import { ZodError } from "zod"
export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json() as UserType
        await User.create(body)
        return new Response("User created successfully", {status: 201})
    } catch (error) {
        if(error instanceof ZodError) {
            const format = error.issues.map(issue => {
                return issue.path[0] + ": " + issue.message.toLowerCase()
            })
            return new Response(format.join("\n"), {status: 400})
        }
        return Response.json(error)
    }
}