import { ChevronsUpDown, Github, LifeBuoy, LogOut, Settings, User as UserIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { User } from "next-auth";
import React, { FC } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui";
import { logout } from "~/lib";

interface IAccountMenuProps {
  user?: User;
}

export const AccountMenu: FC<IAccountMenuProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="dark:border-slate-700/60 group relative flex w-full items-center justify-between rounded-md border p-2 hover:cursor-pointer hover:bg-slate-50 dark:hover:border-transparent dark:hover:bg-slate-800">
          <div className="flex items-center space-x-4">
            <Avatar>
              {user?.image && <AvatarImage src={user?.image} alt={user?.name || "User Avatar"} />}
              <AvatarFallback>{user?.name?.substring(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-flex-col">
              <p className="w-[90%] text-[14px] font-medium">
                {user?.name?.slice(0, 8) + ":" + user?.name?.slice(-8)}
                {/* {user?.name?.split("@")[0]} */}
              </p>
              <p className=" lg:max-w-[160px] max-w-[120px] truncate text-[12.5px] text-slate-600 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="absolute right-2 top-auto">
            <ChevronsUpDown size={18} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuItem>
          <Link href="/account" className="inline-flex w-full items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="https://discord.gg/hzt6cAtwGE" target="_blank" className="inline-flex w-full items-center">
            <Users2 className="mr-2 h-4 w-4" />
            <span>Community</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="https://github.com/neurofusioninc" target="_blank" className="inline-flex w-full items-center">
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="mailto:contact@usefusion.app" target="_blank" className="inline-flex w-full items-center">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 hover:bg-red-50 focus:bg-red-50" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
