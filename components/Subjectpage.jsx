"use client";
import { GateSubjects } from '@/data/GateSubjects';
import React from 'react';
import { Button } from "@/components/ui/button";
import { PYQYears } from '@/data/QuestionBankYears';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function SubjectPage({ activeItem, gateSubjects }) {
  const subject = GateSubjects[activeItem];

  const router = useRouter();

  // theme handled globally via ThemeProvider

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-red-50 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-500">
      {/* Theme toggle removed here; use global header toggle */}

      {/* Subject Title */}
      <motion.div
        className="flex justify-center text-4xl font-extrabold text-red-600 dark:text-red-400 mb-6 tracking-wide"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {subject.code} — {subject.title}
      </motion.div>

      {/* Subject Description */}
      <motion.p
        className="max-w-3xl mx-auto text-center text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {subject.details}
      </motion.p>

      {/* Year Cards Grid */}
      <motion.div
        className="grid gap-8 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {PYQYears.map((year) => (
          <motion.div
            key={year}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="transition-all"
          >
            <Item
              variant="outline"
              className="bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300"
            >
              <ItemContent className="text-center py-6">
                <ItemTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {year}
                </ItemTitle>
                <ItemDescription className="text-gray-500 dark:text-gray-400 text-sm">
                  Previous Year Question Set
                </ItemDescription>
              </ItemContent>
              <ItemActions className="flex justify-center pb-4">
                <Button
                  onClick={() => router.push(`/pyqs/${GateSubjects[activeItem].code}/${year}`, "_blank")}
                  variant="default"
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-all duration-300 rounded-lg px-4"
                >
                  Take Test
                </Button>
              </ItemActions>
            </Item>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default SubjectPage;
