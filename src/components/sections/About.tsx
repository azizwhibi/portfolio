"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { portfolioData } from "@/lib/portfolio-data";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-12">About Me</h2>
        </BlurFade>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile image card */}
          <BlurFade delay={0.1} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-white/10 mb-4 shadow-xl shadow-blue-600/10">
                <Image
                  src="/aziz.png"
                  alt="Aziz - Software Engineer"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center" }}
                />
              </div>
              <h3 className="text-lg font-semibold text-white">{portfolioData.name}</h3>
              <p className="text-blue-400 text-sm">{portfolioData.title}</p>
              <p className="text-gray-500 text-xs mt-1">{portfolioData.location}</p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">My Background</h3>
              <p className="text-gray-400 leading-relaxed">{portfolioData.about.summary}</p>
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Experience</h3>
              <p className="text-gray-400 leading-relaxed">{portfolioData.about.experience}</p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm md:col-span-2">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">What Interests Me</h3>
              <p className="text-gray-400 leading-relaxed">{portfolioData.about.interests}</p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
