'use client';

import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { createContext, ReactNode, useEffect, useState } from "react";


export type UserType = {
    id: string,
    name: string,
    email: string
}
export const UserContext = createContext<{user: (UserType|null)}|null>(null);


const CURR_USER = gql`
query CurrentUserBlogs {
  currentUser {
    name
    id
    email
  }
}
`
export default function CurrUserContext ({children}:{
    children: ReactNode,
}){
    const [user, setUser] = useState<UserType|null>(null);

    useEffect(()=>{
        async function getCurrUser (){
            try{
                const user:{
                    currentUser: UserType,
                } = await gqlClient.request(CURR_USER);
                if(user){
                    setUser(user.currentUser);
                }
            }catch(error){
                console.error(error)
            }
        }
        getCurrUser();
    },[])

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )

}