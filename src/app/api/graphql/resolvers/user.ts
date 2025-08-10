import { getUserFromCookies } from "@/helper";
import { createToken } from "@/services/jwt";
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
        if(!user)return false;
        const token = createToken(user.id);
        if(user?.password==password){
            cookieStore.set("token", token);
            return true;
        }
        return false;
    }catch(error){
        console.error(error);
        return false;
    }
}

export async function currentUserBlogs (){
    try{
        const user = await getUserFromCookies();
        if(!user) return [];
        const blogs = await db.blog.findMany({
            where: {
                user_id: user.id,
            }
        });
        return blogs;
    }catch(error){
        console.error(error);
        return [];
    }
}

export async function logoutUser (){
    try{
        const user = await getUserFromCookies();

    }catch(error){

    }
}