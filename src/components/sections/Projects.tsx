"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { ExternalLink, Search, Filter } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Project } from "@/lib/markdown-loader";

const categories = ["All", "Mobile", "Backend", "DevOps", "AI/AIOps", "Testing", "Security", "Cloud"];

export function Projects({ initialProjects }: { initialProjects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = initialProjects
    .filter((p) => filter === "All" || p.category === filter)
    .filter((p) =>
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Featured Projects</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            A selection of my recent work spanning mobile development, backend services, CI/CD, and AI-powered automation.
          </p>
        </BlurFade>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
              aria-label="Search projects"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Filter className="w-4 h-4 text-gray-500 self-center hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                  filter === cat
                    ? "bg-blue-600/20 border-blue-600/30 text-blue-400"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <BlurFade key={project.id} delay={0.05 + index * 0.1} inView>
                <motion.div
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-blue-600/30 transition-all flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    {project.date && (
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-lg whitespace-nowrap flex-shrink-0">
                        {project.date}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  {project.keyFeatures.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {project.keyFeatures.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-400">
                            <span className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-400 border border-blue-600/20">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500">+{project.technologies.length - 5} more</span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                    {!project.github && !project.demo && (
                      <span className="text-sm text-gray-600 italic">Link coming soon</span>
                    )}
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
