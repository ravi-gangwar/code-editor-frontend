"use client";
import React from "react";
import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { codeExample } from "@/constants/constants";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            <span className="block">Code Anywhere,</span>
            <span className="block text-blue-600">Execute Everywhere</span>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            A powerful online code editor supporting{" "}
            <span className="font-semibold text-yellow-600 dark:text-yellow-400">JavaScript</span>
            {", "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">Python</span>
            {", "}
            <span className="font-semibold text-blue-700 dark:text-blue-300">Lua</span>
            {", "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">PHP</span>
            {", "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">C</span>
            {", "}
            <span className="font-semibold text-blue-800 dark:text-blue-300">C++</span>
            {", "}
            <span className="font-semibold text-orange-600 dark:text-orange-400">Rust</span>
            {", "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">Go</span>
            {", "}
            <span className="font-semibold text-amber-600 dark:text-amber-400">Zig</span>
            {", and "}
            <span className="font-semibold text-red-600 dark:text-red-400">Java</span>
            . Write, run, and share your code instantly.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl"
        >
          <SyntaxHighlighter
            language="javascript"
            style={atomOneDark}
            className="!bg-dark-600 !p-6"
          >
            {codeExample}
          </SyntaxHighlighter>
        </motion.div>
      </div>
    </motion.section>
  );
}

