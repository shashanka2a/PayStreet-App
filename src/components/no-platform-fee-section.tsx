import { motion } from "framer-motion";
import { CreditCard, Wallet, Zap } from "lucide-react";

export function NoPlatformFeeSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F0D] via-[#0D1311] to-[#101614]" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 195, 138, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 195, 138, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'meshMove 30s linear infinite reverse'
          }}
        />
      </div>

      {/* Ambient effects */}
      <motion.div 
        className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#00C38A] opacity-10 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            className="space-y-8 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
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
              No platform fee or hidden charges.
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              With no hidden platform fees and transparent pricing, reduce your costs. 
              Use easy-to-manage multi-currency wallets. No minimum balance or number 
              of transactions required.
            </motion.p>

            {/* Benefits list */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                "Zero platform fees",
                "No minimum balance required", 
                "Unlimited transactions",
                "Complete price transparency"
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full bg-[#00C38A]/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(0, 195, 138, 0.3)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-2 h-2 bg-[#00C38A] rounded-full" />
                  </motion.div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-lg mx-auto">
              
              {/* Custom Credit Card Visual */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative bg-gradient-to-br from-[#00C38A] via-[#00E598] to-[#00C38A] rounded-3xl p-8 aspect-[1.6/1] shadow-2xl overflow-hidden">
                  {/* Card Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                          linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                          linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
                        `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                      }}
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between text-white">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm opacity-80 mb-1">PayStreet Card</div>
                        <div className="text-xs opacity-60">Premium Business</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {/* Middle Section - Card Number */}
                    <div className="space-y-2">
                      <div className="flex space-x-2 text-lg font-mono">
                        <span>****</span>
                        <span>****</span>
                        <span>****</span>
                        <span>1234</span>
                      </div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs opacity-60 mb-1">VALID THRU</div>
                        <div className="text-sm font-mono">12/28</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-60 mb-1">PLATFORM FEE</div>
                        <motion.div 
                          className="text-2xl font-bold"
                          animate={{
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          $0
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Chip */}
                  <div className="absolute top-16 left-8 w-8 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded opacity-80" />
                  
                  {/* Glowing overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
                </div>
              </motion.div>

              {/* Floating zero balance indicator */}
              <motion.div
                className="absolute -top-8 -right-8 bg-gradient-to-br from-[#00C38A] to-[#00E598] rounded-2xl p-6 shadow-2xl border border-white/20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-white mb-1"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    $0
                  </motion.div>
                  <div className="text-sm text-white/80">Platform Fee</div>
                </div>
              </motion.div>

              {/* Floating credit card icons */}
              <motion.div
                className="absolute -bottom-6 -left-6 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
                animate={{
                  x: [0, 15, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CreditCard className="w-8 h-8 text-[#00C38A]" />
              </motion.div>

              {/* Wallet icon */}
              <motion.div
                className="absolute top-1/2 -right-12 p-3 bg-[#00E598]/20 backdrop-blur-xl rounded-xl border border-[#00E598]/30"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Wallet className="w-6 h-6 text-[#00E598]" />
              </motion.div>

              {/* Lightning bolt for instant */}
              <motion.div
                className="absolute top-8 -left-8 p-3 bg-yellow-500/20 backdrop-blur-xl rounded-xl border border-yellow-500/30"
                animate={{
                  rotate: [0, 15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-6 h-6 text-yellow-400" />
              </motion.div>

              {/* Orbiting particles */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-[#00C38A] rounded-full opacity-60"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 60}deg) translateX(150px) translateY(-50%)`
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#00C38A]/20 rounded-3xl blur-3xl -z-10 scale-125" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}