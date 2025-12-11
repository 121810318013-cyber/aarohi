import { motion } from 'framer-motion';
import { ReactNode, memo } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.2,
  ease: "easeOut" as const,
};

export const PageTransition = memo(({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full will-change-[opacity]"
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';
