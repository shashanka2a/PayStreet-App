import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, TrendingDown, DollarSign, BarChart3 } from "lucide-react";

interface CoreValueSectionProps {
  onEnterPWA?: () => void;
}

export function CoreValueSection({ onEnterPWA }: CoreValueSectionProps = {}) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F0E] via-[#0D1311] to-[#101614]" />
      
      {/* Dotted overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 195, 138, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 195, 138, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Ambient lighting */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00C38A] opacity-5 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Spend less and reduce costs.
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get low-cost smart financial payment solutions tailored to your business needs. 
              Save money and fuel your business growth. We are a fintech platform like your 
              digital bank — at your fingertips and accessible from anywhere on the planet!
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { icon: TrendingDown, text: "Lower fees", color: "#00C38A" },
                { icon: DollarSign, text: "Save money", color: "#00E598" },
                { icon: BarChart3, text: "Grow faster", color: "#00C38A" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex flex-col items-center text-center space-y-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="p-3 rounded-xl bg-[#00C38A]/20"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-[#00C38A]" />
                  </motion.div>
                  <span className="text-white font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#00C38A] hover:bg-[#00b37a] text-white px-10 py-6 text-lg transition-all duration-500 relative overflow-hidden group shadow-2xl shadow-[#00C38A]/25 rounded-2xl"
                  onClick={onEnterPWA}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00E598] to-[#00C38A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  <span className="relative z-10 flex items-center">
                    Open an Account
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
            </motion.div>
          </motion.div>

          {/* Right Dashboard Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative perspective-1000">
              {/* Main dashboard container */}
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl p-8 aspect-[4/3]"
                whileHover={{ rotateY: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Custom Dashboard Illustration */}
                <div className="relative w-full h-full">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-[#00C38A] text-sm font-medium">PayFlow Dashboard</div>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/10">
                    <div className="flex items-end justify-between h-24 space-x-1">
                      {[40, 65, 85, 45, 70, 90, 60, 75].map((height, i) => (
                        <motion.div
                          key={i}
                          className="bg-gradient-to-t from-[#00C38A] to-[#00E598] rounded-t-lg flex-1"
                          style={{ height: `${height}%` }}
                          animate={{
                            height: [`${height}%`, `${height + 10}%`, `${height}%`]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#00C38A]/10 rounded-lg p-3 border border-[#00C38A]/20">
                      <div className="text-[#00C38A] text-lg font-bold">$12.5K</div>
                      <div className="text-gray-400 text-xs">Saved This Month</div>
                    </div>
                    <div className="bg-[#00E598]/10 rounded-lg p-3 border border-[#00E598]/20">
                      <div className="text-[#00E598] text-lg font-bold">48%</div>
                      <div className="text-gray-400 text-xs">Cost Reduction</div>
                    </div>
                  </div>
                </div>
                
                {/* Overlay with animated elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E]/20 to-transparent pointer-events-none" />
                
                {/* Floating currency symbols */}
                {['$', '€', '¥', '£'].map((symbol, index) => (
                  <motion.div
                    key={symbol}
                    className="absolute text-[#00C38A] font-bold text-2xl"
                    style={{
                      top: `${20 + index * 15}%`,
                      right: `${10 + index * 8}%`
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {symbol}
                  </motion.div>
                ))}

                {/* Animated data points */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-[#00C38A]/20 backdrop-blur-sm rounded-xl p-3 border border-[#00C38A]/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#00C38A] rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">Live Exchange</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating elements around dashboard */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#00C38A]/20 rounded-full backdrop-blur-sm border border-[#00C38A]/30 flex items-center justify-center"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <TrendingDown className="w-8 h-8 text-[#00C38A]" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#00E598]/20 rounded-full backdrop-blur-sm border border-[#00E598]/30 flex items-center justify-center"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <DollarSign className="w-6 h-6 text-[#00E598]" />
              </motion.div>

              {/* Ambient glow */}
              <div className="absolute inset-0 bg-[#00C38A]/10 rounded-3xl blur-3xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}