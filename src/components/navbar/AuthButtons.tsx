"use client";
import React from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/constants";

export default function AuthButtons() {
  return (
    <Link
      href={ROUTES.AUTH.LOGIN}
      className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
    >
      Login
    </Link>
  );
}

