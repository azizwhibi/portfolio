"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react"
import { GithubIcon } from "@/components/ui/Icons";
import { BlurFade } from "@/components/ui/blur-fade";
import { portfolioData } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.03] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <BlurFade delay={0.1} inView>
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Available for opportunities
              </motion.div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {portfolioData.name}
              </h1>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <h2 className="text-lg sm:text-xl text-gray-400 font-medium">
                {portfolioData.title}
              </h2>
            </BlurFade>

            <BlurFade delay={0.35} inView>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                {portfolioData.location}
              </div>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                {portfolioData.hero.description}
              </p>
            </BlurFade>

            <BlurFade delay={0.45} inView>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/25 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
                >
                  {portfolioData.hero.ctaPrimary}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
                >
                  {portfolioData.hero.ctaSecondary}
                </a>
              </div>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <div className="flex gap-3">
                <a
                  href={portfolioData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  aria-label="Visit Aziz's GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  aria-label="Visit Aziz's LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  aria-label="Email Aziz"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Right visual with profile image */}
          <BlurFade delay={0.3} inView>
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-600/20 via-gray-900 to-gray-900 shadow-2xl shadow-blue-600/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0,_transparent_70%)]" />
                {/* Skill badges above the image */}
                <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-1.5 justify-center">
                  <span className="px-2.5 py-1 bg-blue-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg">Mobile</span>
                  <span className="px-2.5 py-1 bg-blue-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg">CI/CD</span>
                  <span className="px-2.5 py-1 bg-blue-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg">Developer</span>
                </div>
                <Image
                  src="/aziz.png"
                  alt="Aziz - Software Engineer"
                  width={500}
                  height={500}
                  className="relative z-10 object-cover w-full h-full"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectPosition: "center" }}
                />
                {/* Animated grid overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                  backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }} />
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
              </div>
              {/* Name overlay at bottom */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                <p className="text-white text-sm font-semibold">{portfolioData.name}</p>
                <p className="text-gray-400 text-xs">{portfolioData.title}</p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
