"use client";
import React from "react";
import { useSelector } from "react-redux";
import { isActive } from "@/slices/editor";

function InActivityIndicator() {
  const inactive = useSelector(isActive);

  if (!inactive) return null;

  return (
    <div className="fixed top-16 left-0 right-0 bg-yellow-500 text-white px-4 py-2 text-center z-50">
      <p className="text-sm">You are inactive. Please interact with the editor.</p>
    </div>
  );
}

export default InActivityIndicator;

