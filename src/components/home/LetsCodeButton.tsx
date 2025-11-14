"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { nanoid } from "nanoid";

export default function LetsCodeButton() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex justify-center mt-8 mb-8"
    >
      <Link href={`/${nanoid(8)}`}>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
          
          <motion.div
            className="absolute inset-0 -left-full group-hover:left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700"
            initial={false}
          />
          
          <span className="relative z-10">Let&apos;s Code</span>
          <motion.div
            className="relative z-10"
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
          
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl bg-blue-400 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </Link>
    </motion.div>
  );
}

