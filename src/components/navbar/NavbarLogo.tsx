"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code2 } from "lucide-react";

export default function NavbarLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          CodeEditor
        </span>
      </Link>
    </motion.div>
  );
}

