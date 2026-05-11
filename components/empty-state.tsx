'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <motion.div
          className="mb-4 p-3 rounded-full bg-primary/10"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {icon}
        </motion.div>
      )}
      <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
        {title}
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <motion.button
          onClick={action.onClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 font-medium transition-all"
        >
          {action.label}
          <ArrowRight size={18} />
        </motion.button>
      )}
    </motion.div>
  );
}
