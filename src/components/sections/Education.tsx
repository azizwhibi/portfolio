"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import Image from "next/image";
import espritImg from "@/esprit.jpg";
import { portfolioData, CertificateItem } from "@/lib/portfolio-data";
import { GraduationCap, Award, X, ExternalLink, FileText } from "lucide-react";

export function Education() {
  const edu = portfolioData.education;
  const [showEspritModal, setShowEspritModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowEspritModal(false);
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Education & Certification</h2>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left column: Education timeline */}
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Academic Background
            </div>

            <BlurFade delay={0.1} inView>
              <div className="relative overflow-hidden group rounded-xl">
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

          {/* Right column: Certifications */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" /> Professional Certifications
            </div>

            {edu.certifications.map((cert, index) => {
              const hasModal = Boolean(cert.image);
              const cardContent = (
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-xl p-5 group-hover:border-blue-600/40 group-hover:bg-blue-600/15 transition-all duration-200">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-base font-bold text-white truncate">{cert.name}</h3>
                      </div>
                      <p className="text-blue-400 text-xs mt-0.5">
                        {cert.issuer} • {cert.date || cert.year}
                      </p>
                      <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </div>
              );

              return (
                <BlurFade key={cert.id} delay={0.35 + index * 0.08} inView>
                  <div className="relative overflow-hidden group rounded-xl">
                    {hasModal ? (
                      <>
                        {cardContent}
                        <div
                          className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center cursor-pointer"
                          onClick={() => setSelectedCert(cert as CertificateItem)}
                        >
                          <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to view
                          </span>
                        </div>
                      </>
                    ) : cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block outline-none"
                      >
                        {cardContent}
                      </a>
                    ) : (
                      cardContent
                    )}
                  </div>
                </BlurFade>
              );
            })}
          </div>
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

        {/* Certificate Preview Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-zinc-950/95"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02]">
                  <div className="pr-4 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate">{selectedCert.name}</h3>
                    <p className="text-xs text-blue-400 mt-0.5">
                      {selectedCert.issuer} • {selectedCert.date || selectedCert.year}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close modal"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Certificate image display */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[68vh] bg-black/60 overflow-hidden flex items-center justify-center">
                  {selectedCert.image && (
                    <Image
                      src={selectedCert.image}
                      alt={selectedCert.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1000px"
                      className="object-contain p-2 sm:p-4"
                      priority
                    />
                  )}
                </div>

                {/* Footer bar with actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3 border-t border-white/10 bg-white/[0.02]">
                  <p className="text-xs text-gray-400 max-w-md hidden md:block line-clamp-1">
                    {selectedCert.description}
                  </p>
                  <div className="flex items-center gap-2.5 ml-auto">
                    {selectedCert.pdfUrl && (
                      <a
                        href={selectedCert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                        <span>View Original PDF</span>
                      </a>
                    )}
                    {selectedCert.verifyUrl && (
                      <a
                        href={selectedCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Verify Credential</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Languages */}
        <BlurFade delay={0.65} inView>
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
