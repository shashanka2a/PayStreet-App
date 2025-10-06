import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface CtaSectionProps {
  onEnterPWA?: () => void;
}

export function CtaSection({ onEnterPWA }: CtaSectionProps = {}) {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Headline */}
          <motion.h2 
            className="font-clash text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to revolutionize your payments?{" "}
            <span className="text-paystreet-green">Launch the Paystreet app now.</span>
          </motion.h2>
          
          {/* Animated arrow leading to CTAs */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-paystreet-green"
            >
              <ArrowRight className="w-8 h-8" />
            </motion.div>
          </motion.div>
          
          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-paystreet-green hover:bg-[var(--paystreet-green-hover)] text-white px-10 py-6 text-lg rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-paystreet-green/25 group"
              onClick={onEnterPWA}
            >
              Launch PWA
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-10 py-6 text-lg rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:border-paystreet-green hover:text-paystreet-green"
            >
              Talk to Us
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-paystreet-green rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-30 animate-bounce" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-ping" />
      </div>
    </section>
  );
}