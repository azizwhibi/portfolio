"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import Image from "next/image";
import espritImg from "@/esprit.jpg";
import { portfolioData } from "@/lib/portfolio-data";
import { GraduationCap, Award, X } from "lucide-react";

export function Education() {
  const edu = portfolioData.education;
  const [showEspritModal, setShowEspritModal] = useState(false);

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Education & Certification</h2>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left column: Education timeline */}
          <div className="space-y-6">
            <BlurFade delay={0.1} inView>
              <div className="relative overflow-hidden group">
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 group-hover:border-blue-600/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">ESPRIT</h3>
                      <p className="text-blue-400 text-sm">{edu.espretEngineering.program}</p>
                      <p className="text-gray-500 text-xs">{edu.espretEngineering.location} • {edu.espretEngineering.period}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {edu.espretEngineering.coursework.map((course) => (
                          <span key={course} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center cursor-pointer"
                  onClick={() => setShowEspritModal(true)}
                >
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to view</span>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">ESPRIT</h3>
                    <p className="text-blue-400 text-sm">{edu.espretPreparatory.program}</p>
                    <p className="text-gray-500 text-xs">{edu.espretPreparatory.location} • {edu.espretPreparatory.period}</p>
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-gray-400">B</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Lycée de Jendouba</h3>
                    <p className="text-blue-400 text-sm">{edu.lyceeJendouba.qualification}</p>
                    <p className="text-gray-500 text-xs">{edu.lyceeJendouba.location} • {edu.lyceeJendouba.year}</p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Right column: Certification */}
          <BlurFade delay={0.4} inView>
            <a
              href="https://cp.certmetrics.com/amazon/en/public/verify/credential/acc28ea1e9034413802a68609c1efd89"
              target="_blank"
              rel="noopener noreferrer"
              className="block outline-none"
            >
              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-2xl p-6 h-fit hover:border-blue-600/40 hover:bg-blue-600/15 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.certification.name}</h3>
                    <p className="text-blue-400 text-sm mt-1">Earned in {edu.certification.year}</p>
                    <p className="text-gray-400 text-sm mt-3">
                      Cloud computing certification validating foundational knowledge of cloud services, security, architecture, and pricing models.
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </BlurFade>
        </div>

        {/* ESPRIT Image Modal */}
        <AnimatePresence>
          {showEspritModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowEspritModal(false)}
            >
              <motion.div
                className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowEspritModal(false)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <Image src={espritImg} alt="ESPRIT" fill className="object-contain" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Languages */}
        <BlurFade delay={0.5} inView>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
            <div className="flex flex-wrap gap-4">
              {portfolioData.languages.map((lang) => (
                <div key={lang.language} className="flex items-center gap-2">
                  <span className="text-white font-medium">{lang.language}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-400 border border-blue-600/20">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
