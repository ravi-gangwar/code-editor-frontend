"use client";
import React from "react";
import ExecutionButton from "./ExecutionButton";
import { TExecutionResponse } from "@/types";

interface HeaderProps {
  executionRes?: TExecutionResponse | null;
}

function Header({}: HeaderProps) {
  return (
    <div className="border-b dark:border-dark-700 p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Code Editor
      </h1>
      <ExecutionButton />
    </div>
  );
}

export default Header;

