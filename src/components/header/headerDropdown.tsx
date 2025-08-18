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
import gqlClient from "@/services/graphql"
import { gql } from "graphql-request"
import { MenuIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from "sonner"

const LOGOUT_USER = gql`
mutation Mutation {
  logoutUser
}
`

export function HeaderDropdown() {
  const context = useContext(UserContext);
  const user = context?.user;
  const router = useRouter();

  async function handleLogout() {
    const res: {
      logoutUser: boolean
    } = await gqlClient.request(LOGOUT_USER);

    if (res) {
      toast.success("Logged Out!");
      window.location.href = "/";
    } else {
      toast.error("Error occurred!");
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><MenuIcon /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {
            user &&
            <DropdownMenuItem className="text-muted-foreground">
              <p onClick={() => handleLogout()}>
                {user.name}
              </p>
            </DropdownMenuItem>
          }
          {
            user ?
            <>
              <DropdownMenuItem>
                <p onClick={() => router.push("/profile")} className="w-full">My Profile</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p onClick={() => router.push("/my-blogs")} className="w-full">My Blogs</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p onClick={() => router.push("/add-blog")} className="w-full">Add Blog</p>
              </DropdownMenuItem>
            </>
              :
              <DropdownMenuItem>
                <p onClick={() => router.push("/login")} className="w-full">Login</p>
              </DropdownMenuItem>
          }
          {
            user &&
            <DropdownMenuItem onClick={() => handleLogout()}>
              <p>Logout</p>
            </DropdownMenuItem>
          }

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
