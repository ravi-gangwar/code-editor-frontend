"use client";
import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const languages = [
  { name: "JavaScript", code: "JS", color: "bg-yellow-400", textColor: "text-yellow-900", borderColor: "border-yellow-400" },
  { name: "Python", code: "PY", color: "bg-blue-500", textColor: "text-blue-900", borderColor: "border-blue-500" },
  { name: "Lua", code: "LUA", color: "bg-blue-600", textColor: "text-blue-50", borderColor: "border-blue-600" },
  { name: "PHP", code: "PHP", color: "bg-indigo-600", textColor: "text-indigo-50", borderColor: "border-indigo-600" },
  { name: "C", code: "C", color: "bg-gray-700", textColor: "text-gray-50", borderColor: "border-gray-700" },
  { name: "C++", code: "C++", color: "bg-blue-700", textColor: "text-blue-50", borderColor: "border-blue-700" },
  { name: "Rust", color: "bg-orange-600", textColor: "text-orange-50", borderColor: "border-orange-600", code: "RS" },
  { name: "Go", code: "GO", color: "bg-cyan-500", textColor: "text-cyan-900", borderColor: "border-cyan-500" },
  { name: "Zig", code: "ZG", color: "bg-amber-600", textColor: "text-amber-50", borderColor: "border-amber-600" },
  { name: "Java", code: "JAVA", color: "bg-red-600", textColor: "text-red-50", borderColor: "border-red-600" },
];

export default function MultipleLanguagesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12 p-8 bg-gray-100 dark:bg-dark-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Multiple Languages
        </h3>
      </div>
      <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg">
        Support for 11+ programming languages with real-time syntax highlighting and execution.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-6">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.15, y: -8 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-20 h-20 ${lang.color} ${lang.borderColor} border-2 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <span className={`font-bold text-sm ${lang.textColor} relative z-10`}>
                {lang.code}
              </span>
            </motion.div>
            <span className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {lang.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

