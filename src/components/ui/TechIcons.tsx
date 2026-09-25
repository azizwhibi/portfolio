"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiC,
  SiCplusplus,
  SiPhp,
  SiSpringboot,
  SiNodedotjs,
  SiNestjs,
  SiReact,
  SiAngular,
  SiHtml5,
  SiCss,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiAndroid,
  SiFirebase,
  SiJenkins,
  SiFlutter,
  SiGithubactions,
  SiSwift,
  SiKotlin,
  SiEthereum,
  SiNextdotjs,
  SiSymfony,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";
import { BsFiletypeSql } from "react-icons/bs";
import { BiLogoFlask } from "react-icons/bi";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SiAmazonAws = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);

export const ICON_MAP: Record<string, React.ElementType> = {
  "Java": FaJava,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Python": SiPython,
  "C": SiC,
  "C++": SiCplusplus,
  "PHP": SiPhp,
  "Spring Boot": SiSpringboot,
  "Node.js": SiNodedotjs,
  "NestJS": SiNestjs,
  "React": SiReact,
  "Angular": SiAngular,
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "MySQL": SiMysql,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "Docker": SiDocker,
  "Git": SiGit,
  "GitHub": SiGithub,
  "AWS": SiAmazonAws,
  "Android": SiAndroid,
  "Firebase": SiFirebase,
  "Jenkins": SiJenkins,
  "GitHub Actions": SiGithubactions,
  "Flutter": SiFlutter,
  "React Native": TbBrandReactNative,
  "Swift": SiSwift,
  "Kotlin": SiKotlin,
  "SQL": BsFiletypeSql,
  "Flask": BiLogoFlask,
  "Blockchain-oriented medical dossier concepts": SiEthereum,
  "Next.js": SiNextdotjs,
  "Symfony": SiSymfony,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) return null;

  return (
    <div className="relative group flex items-center justify-center">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        className={cn(
          "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200",
          "bg-white/[0.04] border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5",
          className
        )}
      >
        <IconComponent className="w-7 h-7" aria-label={name} />
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded border border-white/10 whitespace-nowrap pointer-events-none z-50 shadow-xl"
          >
            {name}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
