import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface QuoteScreenProps {
  onComplete: () => void;
}

const QuoteScreen = ({ onComplete }: QuoteScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show quote for 3 seconds then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation to complete before calling onComplete
      setTimeout(onComplete, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10"
    >
      <div className="text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="mb-8 flex justify-center">
            <div className="text-8xl">🖤</div>
          </div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight"
          >
            PICK ONE.
          </motion.h1>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            MASTER IT!
          </motion.h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuoteScreen;
