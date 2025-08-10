'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { UserContext } from "@/context/userContext"
import { MenuIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export function HeaderDropdown() {
  const context = useContext(UserContext);
  const user = context?.user;
  const router = useRouter();

  async function handleLogout(){
    
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><MenuIcon/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {
              user? 
              <p onClick={()=>router.push("/my-blogs")}>My Blogs</p>
              :
              <p onClick={()=>router.push("/login")}>Login</p>
          }
          </DropdownMenuItem>
          <DropdownMenuItem>
            {
              user&&
              <p onClick={()=>handleLogout()}>Logout</p>
          }
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
