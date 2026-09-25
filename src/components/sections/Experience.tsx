"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { portfolioData } from "@/lib/portfolio-data";
import { ChevronRight } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-12">Experience</h2>
        </BlurFade>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <BlurFade key={exp.company} delay={0.1 + index * 0.15} inView>
                <motion.div
                  className="relative flex gap-4 sm:gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5 ring-4 ring-black" />
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-blue-600/30 transition-colors flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                        <p className="text-blue-400 text-sm font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-gray-500 text-xs mb-3">{exp.location}</p>
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <ChevronRight className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
