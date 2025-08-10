import db from "@/services/prisma";
import { cookies } from "next/headers";

export async function signupUser(x: any, args: {
    name: string,
    email: string,
    password: string
}) {
    try {
        await db.user.create({
            data: args
        })
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function loginUser (x: any, args: {
    email : string,
    password: string
}){
    const {email, password}= args;

    const cookieStore = await cookies();
    try{
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        if(user?.password==password){
            cookieStore.set("token", user.id);
            return true;
        }
        return false;
    }catch(error){
        console.error(error);
        return false;
    }
}