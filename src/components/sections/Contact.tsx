"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { GithubIcon } from "@/components/ui/Icons";
import { portfolioData } from "@/lib/portfolio-data";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validate = useCallback((data: FormState): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Enter a valid email";
    if (!data.message.trim()) errs.message = "Message is required";
    else if (data.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    // Simulate submission delay
    setTimeout(() => {
      // Developer note: Connect to a form backend or email API (e.g., Resend, Formspree, SMTP)
      console.log("Contact form submitted (no backend connected):", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  }, [form, validate]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            Have a project or question? Feel free to reach out.
          </p>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <BlurFade delay={0.1} inView>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <a href={`mailto:${portfolioData.email}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                  {portfolioData.email}
                </a>
              </div>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-gray-300">{portfolioData.phone}</span>
              </div>
            </BlurFade>
            <BlurFade delay={0.3} inView>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-gray-300">{portfolioData.location}</span>
              </div>
            </BlurFade>
            <BlurFade delay={0.4} inView>
              <div className="flex gap-3">
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400" aria-label="Visit GitHub">
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400" aria-label="Visit LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Contact form */}
          <BlurFade delay={0.3} inView>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-green-600/10 border border-green-600/20 rounded-xl text-green-400 text-sm"
                  >
                    Message sent! (Note: No backend connected — this is a demo. Connect a form service to actually send messages.)
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.name ? "border-red-500" : "border-white/10"}`}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p id="name-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs mt-1">{errors.name}</motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? "border-red-500" : "border-white/10"}`}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p id="email-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs mt-1">{errors.email}</motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${errors.message ? "border-red-500" : "border-white/10"}`}
                  placeholder="Tell me about your project..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p id="message-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs mt-1">{errors.message}</motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {status === "loading" ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-xs text-gray-600">
                {/* Developer note: Connect a form backend or email API (e.g., Resend, Formspree, SMTP) here to actually send messages. */}
                This is a demo form. A server-side email service must be connected to send messages.
              </p>
            </form>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
