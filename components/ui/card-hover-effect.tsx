import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GateSubjects } from "../../data/GateSubjects";

export const HoverEffect = ({
  className,
  activeItem,
  setActiveItem,
  onClick,
}: {
  className?: string;
  activeItem: number | null;
  setActiveItem: React.Dispatch<React.SetStateAction<number | null>>;
  onClick?: (item: typeof GateSubjects[number]) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-16 px-8 bg-gradient-to-br from-white via-rose-50 to-red-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800",
        className
      )}
    >
      {GateSubjects.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group cursor-pointer h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => {
            setActiveItem(idx);
            onClick?.(item);
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Soft Animated Glow */}
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-tr from-red-400/30 via-rose-300/30 to-orange-200/20 dark:from-red-500/30 dark:via-pink-400/20 dark:to-amber-300/20 blur-2xl rounded-3xl"
                layoutId="hoverGlow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          {/* Card */}
          <motion.div
            className="relative z-20 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(255,0,0,0.15)] transition-all duration-300 backdrop-blur-md flex flex-col justify-between h-full"
            whileHover={{ y: -5 }}
          >
            <Card>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                  {item.summary.split(";").map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {point.trim()}
                    </motion.li>
                  ))}
                </ul>
              </CardDescription>
              <motion.div
                className="flex justify-center mt-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <button className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors duration-300 shadow-md">
                  Explore
                </button>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Card Components
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "rounded-3xl h-full w-full p-6 transition-all duration-300 flex flex-col",
      className
    )}
  >
    {children}
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4
    className={cn(
      "text-gray-900 dark:text-white font-bold text-xl text-center tracking-wide mb-3 group-hover:text-red-600 transition-colors duration-300",
      className
    )}
  >
    {children}
  </h4>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "text-sm leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-300 flex-grow",
      className
    )}
  >
    {children}
  </div>
);
