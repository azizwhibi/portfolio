import { portfolioData } from "./portfolio-data";

function normalize(question: string): string {
  return question.toLowerCase().trim().replace(/[.?!\s]+/g, " ").trim();
}

function getTopic(normalizedQ: string): string | null {
  if (normalizedQ.includes("who is aziz") || (normalizedQ.includes("who is") && normalizedQ.includes("ouhibi"))) return "generalProfile";
  if (normalizedQ.includes("technolog") || normalizedQ.includes("what tech") || normalizedQ.includes("skills") || normalizedQ.includes("tools")) return "skillsProgramming";
  if (normalizedQ.includes("cicd") || normalizedQ.includes("ci/cd") || normalizedQ.includes("anomaly") || normalizedQ.includes("devops") || normalizedQ.includes("tunisie")) return "ciCdAiAnomaly";
  if (normalizedQ.includes("mobile app") || normalizedQ.includes("what mobile") || normalizedQ.includes("arabsoft")) return "arabsoft";
  if (normalizedQ.includes("karhebti")) return "karhebti";
  if (normalizedQ.includes("vetai") || normalizedQ.includes("animalia")) return "vetaiAnimalia";
  if (normalizedQ.includes("blockchain")) return "blockchain";
  if (normalizedQ.includes("backend technol")) return "backendApis";
  if (normalizedQ.includes("contact")) return "contact";
  if (normalizedQ.includes("education") || normalizedQ.includes("certified") || normalizedQ.includes("aws certified")) return "generalProfile";
  if (normalizedQ.includes("language")) return "languages";
  if (normalizedQ.includes("planvent")) return "planvent";
  if (normalizedQ.includes("what did aziz build") || normalizedQ.includes("what did aziz")) return "wehacklabs";
  return null;
}

function formatTopic(topic: string): string | null {
  const kb = portfolioData.chatbotKnowledgeBase;
  switch (topic) {
    case "generalProfile": return kb.generalProfile;
    case "wehacklabs": return kb.wehacklabs;
    case "tunisietelecom": return kb.tunisietelecom;
    case "ciCdAiAnomaly": return kb.ciCdAiAnomaly;
    case "arabsoft": return kb.arabsoft;
    case "karhebti": return kb.karhebti;
    case "vetaiAnimalia": return kb.vetaiAnimalia;
    case "blockchain": return kb.blockchain;
    case "blockchainDetailsUnavailable": return kb.blockchainDetailsUnavailable;
    case "planvent": return kb.planvent;
    case "skillsProgramming": return kb.skills.programming;
    case "backendApis": return kb.skills.backend;
    case "languages": return kb.languages;
    case "contact": return kb.contact;
    default: return null;
  }
}

export function getChatResponse(question: string): string {
  const normalized = normalize(question);
  const topic = getTopic(normalized);
  if (topic) {
    const text = formatTopic(topic);
    if (text) return text;
  }
  if (normalized.includes("what backend")) return portfolioData.chatbotKnowledgeBase.skills.backend;
  if (normalized.includes("what skills") || normalized.includes("list your skills")) {
    return Object.values(portfolioData.chatbotKnowledgeBase.skills).join(" ");
  }
  if (normalized.includes("what did aziz do with blockchain") || normalized.includes("blockchain vetai")) return portfolioData.chatbotKnowledgeBase.blockchainDetailsUnavailable;
  return getFallbackResponse();
}

export function getFallbackResponse(): string {
  return "I can answer questions about Aziz Ouhibi's background, skills, projects, experience, education, certification, and career interests.";
}

export { portfolioData };
