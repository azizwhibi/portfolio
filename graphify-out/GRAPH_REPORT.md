# Graph Report - testtest  (2026-10-29)

## Corpus Check
- 38 files · ~274,579 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ico 1, .css 1)

## Summary
- 181 nodes · 316 edges · 20 communities (13 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c792e22e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- UI Components & Sections
- markdown-loader.ts
- Dependencies & Linting
- TypeScript Configuration
- Development Dependencies
- Next.js Framework & API
- Core Dependencies
- Hero.tsx
- Karhebti Platform
- Projects.tsx
- npm Scripts
- Chatbot Logic
- Blockchain Projects (Vet)
- PostCSS Config
- AI Assistant (Arabsoft)
- AI Anomaly Detection

## God Nodes (most connected - your core abstractions)
1. `BlurFade()` - 17 edges
2. `compilerOptions` - 16 edges
3. `framer-motion` - 13 edges
4. `Home()` - 13 edges
5. `GithubIcon()` - 11 edges
6. `lucide-react` - 10 edges
7. `portfolioData` - 10 edges
8. `react` - 9 edges
9. `next` - 7 edges
10. `scripts` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `Footer()`  [EXTRACTED]
  src/app/page.tsx → src/components/sections/Footer.tsx
- `Home()` --calls--> `Navigation()`  [EXTRACTED]
  src/app/page.tsx → src/components/sections/Navigation.tsx
- `Home()` --calls--> `loadProjects()`  [EXTRACTED]
  src/app/page.tsx → src/lib/markdown-loader.ts
- `Contact()` --calls--> `GithubIcon()`  [EXTRACTED]
  src/components/sections/Contact.tsx → src/components/ui/Icons.tsx
- `Hero()` --calls--> `GithubIcon()`  [EXTRACTED]
  src/components/sections/Hero.tsx → src/components/ui/Icons.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Karhebti Platform** — src_projects_desc_karhebti_android_karhebti_android, src_projects_desc_karhebti_backend_karhebti_backend, src_projects_desc_karhebti_ios_karhebti_ios [INFERRED 0.95]

## Communities (20 total, 7 thin omitted)

### Community 0 - "UI Components & Sections"
Cohesion: 0.18
Nodes (20): framer-motion, Home(), Chatbot(), Message, About(), CICD(), Contact(), FormErrors (+12 more)

### Community 1 - "markdown-loader.ts"
Cohesion: 0.43
Nodes (4): determineCategory(), findMarkdownFiles(), loadProjects(), parseMarkdownFile()

### Community 2 - "Dependencies & Linting"
Cohesion: 0.10
Nodes (20): engines, node, name, private, version, eslint, eslint-config-next, eslint-plugin-jsx-a11y (+12 more)

### Community 3 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "Development Dependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, eslint-plugin-jsx-a11y, eslint-plugin-react, eslint-plugin-react-hooks, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 5 - "Next.js Framework & API"
Cohesion: 0.17
Nodes (8): nextConfig, groq-sdk, next, buildSystemPrompt(), POST(), geistMono, geistSans, metadata

### Community 7 - "Core Dependencies"
Cohesion: 0.18
Nodes (11): dependencies, clsx, framer-motion, gray-matter, groq-sdk, lucide-react, next, react (+3 more)

### Community 8 - "Hero.tsx"
Cohesion: 0.27
Nodes (9): lucide-react, react, Footer(), Navigation(), navLinks, DotPattern(), DotPatternProps, GithubIcon() (+1 more)

### Community 9 - "Karhebti Platform"
Cohesion: 0.25
Nodes (8): Karhebti Android, Material Design 3, MVVM Architecture, Karhebti Backend, MongoDB, NestJS, Karhebti iOS, SwiftUI

### Community 10 - "Projects.tsx"
Cohesion: 0.19
Nodes (11): clsx, react-icons, tailwind-merge, categories, ProjectCard(), ProjectCardProps, SkillGrid(), cn() (+3 more)

### Community 11 - "npm Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, typecheck

### Community 12 - "Chatbot Logic"
Cohesion: 0.60
Nodes (5): formatTopic(), getChatResponse(), getFallbackResponse(), getTopic(), normalize()

### Community 13 - "Blockchain Projects (Vet)"
Cohesion: 0.67
Nodes (3): IPFS, Solidity, Veterinary Health Events Contract

## Knowledge Gaps
- **20 isolated node(s):** `gray-matter`, `react-dom`, `@tailwindcss/postcss`, `@types/node`, `@types/react` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 97 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Development Dependencies` to `Dependencies & Linting`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **What connects `gray-matter`, `react-dom`, `@tailwindcss/postcss` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dependencies & Linting` be split into smaller, more focused modules?**
  _Cohesion score 0.10144927536231885 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Next.js Framework & API` to `UI Components & Sections`, `Hero.tsx`, `Dependencies & Linting`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `framer-motion` connect `UI Components & Sections` to `Hero.tsx`, `Dependencies & Linting`, `Projects.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `Development Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._