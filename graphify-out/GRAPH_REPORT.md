# Graph Report - testtest  (2026-09-24)

## Corpus Check
- 54 files · ~153,456 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .ico 1, .css 1)

## Summary
- 184 nodes · 280 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Components & Sections
- Page Layout & Project Loader
- Dependencies & Linting
- TypeScript Configuration
- Development Dependencies
- Next.js Framework & API
- Graphify Knowledge Base
- Core Dependencies
- UI Utilities & Styling
- Karhebti Platform
- System Settings
- npm Scripts
- Chatbot Logic
- Blockchain Projects (Vet)
- PostCSS Config
- AI Assistant (Arabsoft)
- AI Anomaly Detection

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `framer-motion` - 12 edges
3. `lucide-react` - 11 edges
4. `portfolioData` - 10 edges
5. `BlurFade()` - 9 edges
6. `graphify skill` - 9 edges
7. `react` - 7 edges
8. `scripts` - 6 edges
9. `next` - 6 edges
10. `GithubIcon()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `loadProjects()`  [EXTRACTED]
  src/app/page.tsx → src/lib/markdown-loader.ts
- `DotPattern()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dot-pattern.tsx → src/lib/utils.ts
- `graphify skill` --references--> `add-watch reference`  [EXTRACTED]
  .claude/skills/graphify/SKILL.md → .claude/skills/graphify/references/add-watch.md
- `graphify skill` --references--> `exports reference`  [EXTRACTED]
  .claude/skills/graphify/SKILL.md → .claude/skills/graphify/references/exports.md
- `graphify skill` --references--> `github-and-merge reference`  [EXTRACTED]
  .claude/skills/graphify/SKILL.md → .claude/skills/graphify/references/github-and-merge.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Karhebti Platform** — src_projects_desc_karhebti_android_karhebti_android, src_projects_desc_karhebti_backend_karhebti_backend, src_projects_desc_karhebti_ios_karhebti_ios [INFERRED 0.95]

## Communities (18 total, 4 thin omitted)

### Community 0 - "UI Components & Sections"
Cohesion: 0.21
Nodes (13): framer-motion, lucide-react, react, Contact(), FormErrors, FormState, FormStatus, navLinks (+5 more)

### Community 1 - "Page Layout & Project Loader"
Cohesion: 0.12
Nodes (19): ref_fs, ref_path, Home(), Chatbot(), Message, About(), CICD(), Education() (+11 more)

### Community 2 - "Dependencies & Linting"
Cohesion: 0.11
Nodes (20): name, private, version, eslint, eslint-config-next, ref_eslint_js, eslint-plugin-jsx-a11y, eslint-plugin-react (+12 more)

### Community 3 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "Development Dependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, eslint-plugin-jsx-a11y, eslint-plugin-react, eslint-plugin-react-hooks, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 5 - "Next.js Framework & API"
Cohesion: 0.17
Nodes (9): nextConfig, groq-sdk, next, buildSystemPrompt(), POST(), src_app_globals, geistMono, geistSans (+1 more)

### Community 6 - "Graphify Knowledge Base"
Cohesion: 0.17
Nodes (9): add-watch reference, exports reference, github-and-merge reference, hooks reference, query reference, transcribe reference, update reference, graphify skill (+1 more)

### Community 7 - "Core Dependencies"
Cohesion: 0.20
Nodes (10): dependencies, clsx, framer-motion, gray-matter, groq-sdk, lucide-react, next, react (+2 more)

### Community 8 - "UI Utilities & Styling"
Cohesion: 0.32
Nodes (6): clsx, tailwind-merge, Navigation(), DotPattern(), DotPatternProps, cn()

### Community 9 - "Karhebti Platform"
Cohesion: 0.25
Nodes (8): Karhebti Android, Material Design 3, MVVM Architecture, Karhebti Backend, MongoDB, NestJS, Karhebti iOS, SwiftUI

### Community 10 - "System Settings"
Cohesion: 0.29
Nodes (6): env, ANTHROPIC_AUTH_TOKEN, ANTHROPIC_BASE_URL, ANTHROPIC_MODEL, ANTHROPIC_SMALL_FAST_MODEL, $schema

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
- **93 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+88 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 105 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Development Dependencies` to `Dependencies & Linting`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `next` connect `Next.js Framework & API` to `UI Components & Sections`, `Dependencies & Linting`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `framer-motion` connect `UI Components & Sections` to `Page Layout & Project Loader`, `Dependencies & Linting`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _93 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Layout & Project Loader` be split into smaller, more focused modules?**
  _Cohesion score 0.1225296442687747 - nodes in this community are weakly interconnected._
- **Should `Dependencies & Linting` be split into smaller, more focused modules?**
  _Cohesion score 0.11255411255411256 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._