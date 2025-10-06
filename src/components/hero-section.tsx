import { Button } from "./ui/button";
import { Play, ArrowRight, Shield, Globe, Zap } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onEnterPWA?: () => void;
}

export function HeroSection({ onEnterPWA }: HeroSectionProps = {}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced dark gradient background with mesh pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#0A0F0D] via-[#0D1311] to-[#101614]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(0, 195, 138, 0.15) 0%, transparent 50%), linear-gradient(135deg, #0A0F0D 0%, #0D1311 50%, #101614 100%)'
        }}
      />
      
      {/* Animated mesh grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 195, 138, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 195, 138, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'meshMove 20s linear infinite'
          }}
        />
      </div>
      
      {/* Multiple layered glows for depth */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00C38A] opacity-10 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#00C38A] opacity-5 blur-2xl rounded-full"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00C38A] rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Content */}
        <motion.div 
          className="text-center space-y-10 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >


          <div className="space-y-6">
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Seamless
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-[#00C38A] via-[#00E598] to-[#00C38A] bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'gradientShift 3s ease-in-out infinite'
                }}
              >
                Global Finance
              </motion.span>
              <motion.span
                className="block text-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                No Boundaries
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Experience the future of cross-border payments with zero hidden fees, 
              instant settlements, and enterprise-grade security. Transform your global 
              financial operations today.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              className="flex flex-wrap gap-6 text-sm justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[
                { icon: Shield, text: "Bank-grade security" },
                { icon: Globe, text: "190+ countries" },
                { icon: Zap, text: "Real-time settlements" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <feature.icon className="w-4 h-4 text-[#00C38A] mr-2" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Enhanced CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-[#00C38A] hover:bg-[#00b37a] text-white px-10 py-7 text-lg transition-all duration-500 relative overflow-hidden group shadow-2xl shadow-[#00C38A]/25 rounded-2xl"
                onClick={onEnterPWA}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00E598] to-[#00C38A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                <span className="relative z-10 flex items-center">
                  Launch App
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-[#00C38A]/50 bg-[#00C38A]/5 backdrop-blur-sm text-[#00C38A] hover:bg-[#00C38A] hover:text-white px-10 py-7 text-lg transition-all duration-500 group rounded-2xl hover:border-[#00C38A] hover:shadow-lg hover:shadow-[#00C38A]/25"
              >
                <Play className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                <span>Watch Demo</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}