"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { portfolioData } from "@/lib/portfolio-data";
import { TechIcon } from "@/components/ui/TechIcons";

function SkillGrid({ title, items, isTextOnly = false }: { title: string; items: readonly string[]; isTextOnly?: boolean }) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-blue-400 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-3">
        {isTextOnly ? (
          items.map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-default"
            >
              {skill}
            </span>
          ))
        ) : (
          items.map((skill) => (
            <TechIcon key={skill} name={skill} />
          ))
        )}
      </div>
    </div>
  );
}

export function Skills() {
  const skills = portfolioData.skills;

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Skills</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            Technologies and practices I work with across backend, mobile, and DevOps.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlurFade delay={0.1} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">
              <SkillGrid title="Programming Languages" items={skills.programmingLanguages} />
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">
              <SkillGrid title="Backend & APIs" items={skills.backendAndApis} />
              <SkillGrid title="Web Development" items={skills.webDevelopment} />
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">
              <SkillGrid title="Mobile Development" items={skills.mobileDevelopment} />
            </div>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">
              <SkillGrid title="Databases & Data" items={skills.databases} />
            </div>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">
              <SkillGrid title="CI/CD & DevOps" items={skills.cicdAndDevops} />
            </div>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">
              <SkillGrid
                title="Engineering Practices"
                items={skills.engineeringPractices}
                isTextOnly
              />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
