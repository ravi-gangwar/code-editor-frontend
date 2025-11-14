"use client";
import React from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@radix-ui/themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

interface UserDropdownProps {
  userName: string;
  onLogout: () => void;
}

export default function UserDropdown({ userName, onLogout }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <User className="w-6 h-6" />
          <span>{userName || "User"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

