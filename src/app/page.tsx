"use client";
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import LetsCodeButton from "@/components/home/LetsCodeButton";
import FeaturesSection from "@/components/home/FeaturesSection";
import { useWakeUpCodeExecuteQuery, useWakeUpBackendQuery } from "@/slices/rtk-query/apis";

export default function Home() {
  // Wake up backend services to prevent them from going to sleep
  useWakeUpCodeExecuteQuery(undefined, { skip: false });
  useWakeUpBackendQuery(undefined, { skip: false });

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-dark-900">
      <HeroSection />
      <LetsCodeButton />
      <FeaturesSection />
    </div>
  );
}
