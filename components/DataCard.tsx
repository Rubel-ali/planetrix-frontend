'use client';

import { motion } from 'framer-motion';

interface DataCardProps {
  label: string;
  value: string;
}

export default function DataCard({ label, value }: DataCardProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm md:text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
