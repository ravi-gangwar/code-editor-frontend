"use client";
import React from "react";
import { Zap, Globe } from "lucide-react";
import MultipleLanguagesSection from "./MultipleLanguagesSection";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MultipleLanguagesSection />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FeatureCard
            icon={Zap}
            title="Instant Execution"
            description="Run your code instantly and see results in real-time with our powerful execution engine."
          />
          <FeatureCard
            icon={Globe}
            title="Cloud Storage"
            description="Save your code snippets and access them from anywhere in the world."
          />
        </div>
      </div>
    </section>
  );
}

