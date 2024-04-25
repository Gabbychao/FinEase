import { getByAuth } from "@/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./auth/logout-button";
import { TbLogout } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

export default async function ProfileMenu() {
  const result = await getByAuth();
  console.log(result);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return (
    <div >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-white bg-[#103438] rounded-[10px] border-transparent" align="end">
          <DropdownMenuItem className="text-[18px] font-medium">
            <span>Manage Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-[18px] font-medium">
            <CgProfile className="mr-2" />
            <Link href="/manage-account/change-user-details">Change User Details</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-[18px] font-medium">
            <RiLockPasswordFill className="mr-2"/> 
            <Link href="/manage-account/change-password">Change Password</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-black" />
          <DropdownMenuItem className="text-[18px] font-medium">
            <TbLogout className="mr-2" />
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
