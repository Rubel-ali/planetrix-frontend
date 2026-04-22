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
    <div className="flex flex-col items-center justify-center text-center min-w-22.5 h-17.5">
      <p className="text-base md:text-lg font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
        {label}
      </p>

      <div className="h-5 flex items-center justify-center">
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-white/80 rounded-full"
            style={{ borderTopColor: "transparent" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-sm md:text-base font-medium text-foreground"
          >
            {value}
          </motion.p>
        )}
      </div>
    </div>
  );
}
