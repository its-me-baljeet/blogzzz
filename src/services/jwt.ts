import jwt, { JwtPayload } from 'jsonwebtoken'

export function createToken(id:string){
    const token = jwt.sign(id, process.env.JWT_SECRET as string);
    return token;
}

export function verifytoken(token: string){
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET as string);
        return data as string;
    }catch(error){
        return null;
    }
}