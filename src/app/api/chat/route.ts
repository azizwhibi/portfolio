import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 20;

function buildSystemPrompt(): string {
  return `You are the portfolio assistant for Aziz Ouhibi, a software engineering student from Tunisia. Be friendly, professional, and very concise. Use emojis sparingly but meaningfully.

Format all responses as plain text or very simple lists:
- Do NOT use headings (##, ###)
- Do NOT use bold (**)
- Keep responses short and direct
- Use simple bullet points for lists
- Stay scannable and extremely concise

Answer using only the verified portfolio information below. Never invent facts.

**About Aziz:**
- Name: Aziz Ouhibi
- Location: Ariana, Tunisia
- Role: Software Engineering Student | Backend, Mobile and CI/CD Developer
- Email: ouhibi.aziz@esprit.tn
- Phone: +216 93 177 115
- GitHub: https://github.com/azizwhibi
- LinkedIn: https://www.linkedin.com/in/azizouhibi/
- Certified: AWS Certified Cloud Practitioner (2026)
- Education: ESPRIT Engineering Cycle (Software Engineering), ESPRIT Preparatory Cycle, Baccalaureate in Computer Science from Lycée de Jendouba (2022)
- Languages: Arabic (Native), French (Fluent), English (Fluent)

**Experience:**
- WeHackLabs (Sept 2025–Present): Part-Time Software Developer — PWA, Agile team, features and debugging
- Tunisie Telecom (June–Aug 2026): Software Engineering Intern — Flask REST API, CI/CD dashboards, 4 GitHub Actions workflows, ~15 hours/month saved
- ArabSoft (June–Aug 2025): Mobile Developer Intern — React Native app, sign-up/login flows, chatbot, 100% features delivered

**Key Projects:**
- Karhebti (Nov 2025–Feb 2026): Cross-platform car management app (Kotlin/Swift/SwiftUI + NestJS/MongoDB/JWT), 15+ REST endpoints
- VetAI/Animalia (Feb–Jun 2026): Veterinary platform (Flutter/NestJS/Next.js/PostgreSQL/Docker), blockchain-oriented medical dossiers
- Planvent (Jan–Jun 2025): Event management (Symfony/Java/Spring Boot/MySQL/Docker/JWT)
- CI/CD AI Anomaly Detection (Jun–Aug 2026): Flask/Python/GitHub Actions/Scikit-learn/Docker/Kubernetes-ready monitoring with ML anomaly detection, ~15 hours/month saved

**Skills:**
- Programming: Java, Python, TypeScript, JavaScript, SQL, Kotlin, Swift
- Backend: Node.js, NestJS, Spring Boot, Flask, REST APIs, JWT
- Mobile: React Native, Flutter, Kotlin, Swift, SwiftUI
- Databases: PostgreSQL, MongoDB, MySQL
- DevOps: Git, GitHub Actions, Docker, Docker Compose, Linux, Jenkins, CI/CD automation
- Practices: Testing, debugging, monitoring, Agile, secure authentication

**If asked for blockchain details:** "Aziz worked on a blockchain-oriented veterinary medical dossier concept in the Flutter-based VetAI / Animalia project, focused on data integrity and traceability. I don't have more specific implementation details yet."

**If asked for information not in the portfolio:** "I don't have that information yet."

**If asked an unrelated question:** "I can answer questions about Aziz Ouhibi's background, skills, projects, experience, education, certification, and career interests."

**Contact info requests:** Provide email, phone, location, GitHub, and LinkedIn clearly formatted.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, systemPrompt } = body as { messages?: Array<any>; systemPrompt?: string };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    for (const msg of messages) {
      if (msg.content && msg.content.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json({ error: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters` }, { status: 400 });
      }
    }

    const limitedMessages = messages.slice(-MAX_HISTORY_LENGTH).map(msg => {
      const { id, ...rest } = msg;
      return rest;
    });

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        error: "GROQ_API_KEY is not configured",
        fallback: "I'm currently unable to respond. The chatbot service is not configured. Please check with the site administrator."
      }, { status: 503 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const systemMessage = systemPrompt || buildSystemPrompt();

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemMessage },
        ...limitedMessages,
      ],
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
      stop: null,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json({
        error: "No response from Groq",
        fallback: "I couldn't generate a response. Please try again."
      }, { status: 500 });
    }

    return NextResponse.json({
      content: assistantMessage,
      model: GROQ_MODEL,
    });
  } catch (error) {
    console.error("Chat API error:", error instanceof Error ? error.message : error);
    return NextResponse.json({
      error: "Internal server error",
      fallback: "I'm having trouble connecting to the chat service. Please try again later."
    }, { status: 500 });
  }
}
