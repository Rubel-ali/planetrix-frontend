"use client";

import { motion } from "framer-motion";

interface DataCardProps {
  label: string;
  value: string;
  isLoading?: boolean;
}

export default function DataCard({
  label,
  value,
  isLoading = false,
}: DataCardProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-w-22.5 sm:min-w-27.5">

      <div className="h-6 flex items-center justify-center mb-2">
        {isLoading ? (
          <div className="h-4 w-16 sm:w-20 bg-white/10 rounded-md animate-pulse" />
        ) : (
          <p className="text-sm sm:text-base md:text-lg font-semibold text-muted-foreground uppercase tracking-widest">
            {label}
          </p>
        )}
      </div>

      <div className="h-6 flex items-center justify-center">
        {isLoading ? (
          <div className="h-4 w-12 sm:w-16 bg-white/10 rounded-md animate-pulse" />
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-xs sm:text-sm md:text-base font-medium text-foreground"
          >
            {value}
          </motion.p>
        )}
      </div>
    </div>
  );
}