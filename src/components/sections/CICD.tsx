"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { portfolioData } from "@/lib/portfolio-data";
import { Check, ArrowRight } from "lucide-react";

export function CICD() {
  return (
    <section id="cicd" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            {portfolioData.cicd.title}
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-3xl">
            {portfolioData.cicd.description}
          </p>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-8 mb-12 min-w-0">
          {/* Pipeline visualization */}
          <BlurFade delay={0.1} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Delivery Pipeline</h3>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
                {portfolioData.cicd.pipelineStages.map((stage, index) => (
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 min-w-0"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-blue-400">{index + 1}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-white font-medium whitespace-nowrap">{stage}</span>
                    {index < portfolioData.cicd.pipelineStages.length - 1 && (
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Tunisie Telecom highlights */}
          <BlurFade delay={0.2} inView>
            <div className="bg-white/[0.03] border border-blue-600/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                Tunisie Telecom Internship Highlights
              </h3>
              <ul className="space-y-3">
                {portfolioData.cicd.tunisieTelecomHighlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-blue-600/[0.1] rounded-lg border border-blue-600/20">
                <p className="text-blue-300 text-sm font-semibold">
                  ⏱ ~15 hours/month saved through automation
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
