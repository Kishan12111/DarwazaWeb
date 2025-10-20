"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Link from "next/link";

const subjects = [
  "Electrical Engineering (EE)",
  "Electronics & Communication (ECE)",
  "Computer Science (CSE)",
  "Mechanical Engineering (ME)",
  "Civil Engineering (CE)",
  "Instrumentation Engineering (IN)",
  "Physics (PH)",
];

const opportunities = [
  "M.Tech and MS admissions in IITs, NITs, IISc",
  "PSU recruitment (BHEL, NTPC, IOCL, ONGC, etc.)",
  "Fellowships like DAAD, Commonwealth, and ISRO programs",
  "Research positions in DRDO and other institutes",
  "Higher studies abroad using GATE score",
];

export default function GatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* 🌟 Hero Section */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-primary/20 to-background text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-primary"
        >
          GATE 2025 Examination
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground"
        >
          The Graduate Aptitude Test in Engineering (GATE) is your gateway to
          higher education, research, and PSU careers. Let’s explore what it
          offers in 2025.
        </motion.p>
      </section>

      {/* 🗓️ Dates */}
      <section className="py-16 px-6 bg-secondary/10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Important Dates (Tentative)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Application Opens", "August 2024"],
              ["Last Date to Apply", "September 2024"],
              ["Exam Dates", "February 2025"],
            ].map(([title, date]) => (
              <div
                key={title}
                className="p-6 border border-border rounded-xl shadow hover:shadow-lg transition bg-background"
              >
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-primary font-bold">{date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 🎓 Subjects */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Subjects Offered</h2>
        <motion.div
          className="flex overflow-x-auto gap-6 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {subjects.map((subj) => (
            <div
              key={subj}
              className="min-w-[260px] flex-shrink-0 text-center p-6 border border-border rounded-xl bg-secondary/10 hover:bg-secondary/20 transition"
            >
              <h3 className="text-lg font-semibold">{subj}</h3>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 🚀 Opportunities */}
      <section className="py-16 px-6 bg-muted/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Opportunities After GATE</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((op) => (
              <motion.div
                key={op}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-background border border-border rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <p className="text-lg">{op}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💡 Extra Info */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why You Should Prepare for GATE</h2>
          <p className="text-muted-foreground mb-8">
            Beyond just a test, GATE is a career-defining opportunity. It opens
            doors to India’s best institutes, top PSUs, and global research
            programs.
          </p>
          <Link
            href="/resources/gate-preparation"
            className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Explore Preparation Guides
          </Link>
        </div>
      </section>

      {/* 🧭 Footer */}
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p>© 2025 SSC Prep — Empowering Engineers for the Future</p>
      </footer>
    </div>
  );
}
