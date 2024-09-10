
import { boolean, z } from 'zod'
import { db } from '../config';
import { hash } from 'bcryptjs';
import { WithId } from 'mongodb';

const UserSchema = z.object({
    name: z.string(),
    username: z.string().refine(
        async (username): Promise<boolean> => {
            const existedUser =  await User.col().findOne({username})
            return !existedUser
        },
        {
            message: "username already exist!"
        }
    ),
    email: z.string().email().refine(
        async (email): Promise<boolean> => {
            const existedUser = await User.col().findOne({email})
            return !existedUser
        }
    ),
    password: z.string().min(5),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
})

export type UserType = WithId<z.infer<typeof UserSchema>>

export class User{
    static col() {
        return db.collection("Users");
    }

    static async create(newUser: UserType) {
        await UserSchema.parseAsync(newUser)
        newUser.password = await hash(newUser.password, 10)
        newUser.createdAt = newUser.updatedAt = new Date()

        const result = await this.col().insertOne(newUser)

        const {password, ...userMinPass} = newUser

        return {
            ...userMinPass,
            _id: result.insertedId,
        }
    }

    static async login(existedUser: UserType) {
        const result = await this.col().findOne({ username: existedUser.username })

        return result

    }

    static async findOne(filter: Partial<UserType>){
        try {
            const result = await this.col().findOne(filter)
            return result
        } catch (error) {
            console.log(error);
        }
    }


}