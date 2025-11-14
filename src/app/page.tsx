"use client";
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import LetsCodeButton from "@/components/home/LetsCodeButton";
import FeaturesSection from "@/components/home/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-dark-900">
      <HeroSection />
      <LetsCodeButton />
      <FeaturesSection />
    </div>
  );
}
