import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { CICD } from "@/components/sections/CICD";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { loadProjects } from "@/lib/markdown-loader";

// Server-side markdown loading
export default async function Home() {
  const projects = loadProjects();

  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects initialProjects={projects} />
      <Skills />
      <CICD />
      <Education />
      <Contact />
      <Footer />
      <Chatbot />
    </>
  );
}
