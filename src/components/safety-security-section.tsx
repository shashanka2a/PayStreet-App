import { motion } from "framer-motion";
import { Shield, Lock, Eye, Key, CheckCircle } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SafetySecuritySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F0D] via-[#0D1311] to-[#101614]" />
      
      {/* Animated security grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 195, 138, 0.2) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0, 195, 138, 0.2) 2px, transparent 2px)
            `,
            backgroundSize: '80px 80px',
            animation: 'meshMove 40s linear infinite alternate'
          }}
        />
      </div>

      {/* Security-themed ambient lighting */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#00C38A] opacity-8 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, 20, 0]
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
              Safety ensured always.
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your trust in us is our number one priority. Funds move only when YOU move them, 
              thanks to an extra layer of security within the platform. Two-factor authentication 
              blocks unknown access to your account.
            </motion.p>

            {/* Security features */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { 
                  icon: Shield, 
                  title: "Bank-Grade Security", 
                  description: "Advanced encryption and security protocols"
                },
                { 
                  icon: Key, 
                  title: "Two-Factor Authentication", 
                  description: "Extra layer of protection for your account"
                },
                { 
                  icon: Eye, 
                  title: "Real-Time Monitoring", 
                  description: "24/7 fraud detection and prevention"
                },
                { 
                  icon: CheckCircle, 
                  title: "User-Controlled Transfers", 
                  description: "Funds move only when you authorize them"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:border-[#00C38A]/30 group-hover:bg-[#00C38A]/5"
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <motion.div
                      className="p-3 rounded-xl bg-[#00C38A]/20 flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className="w-6 h-6 text-[#00C38A]" />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Shield Animation */}
          <motion.div
            className="relative lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-lg mx-auto perspective-1000">
              
              {/* Main shield container */}
              <motion.div
                className="relative aspect-square"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Background security image */}
                <motion.div
                  className="relative w-full h-full rounded-3xl overflow-hidden"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMHNoaWVsZCUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzU5NjU3NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Security Shield Protection"
                    className="w-full h-full object-cover filter brightness-40"
                  />
                  
                  {/* Security overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00C38A]/20 via-transparent to-[#00E598]/15" />
                </motion.div>

                {/* Central shield icon with glow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="p-8 bg-gradient-to-br from-[#00C38A]/30 to-[#00E598]/20 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(0, 195, 138, 0.3)",
                        "0 0 40px rgba(0, 195, 138, 0.6)",
                        "0 0 20px rgba(0, 195, 138, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Shield className="w-16 h-16 text-[#00C38A]" />
                  </motion.div>
                </motion.div>

                {/* Floating lock icons */}
                {[
                  { top: "20%", left: "20%", delay: 0 },
                  { top: "25%", right: "15%", delay: 0.5 },
                  { bottom: "30%", left: "15%", delay: 1 },
                  { bottom: "25%", right: "20%", delay: 1.5 }
                ].map((position, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={position}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: position.delay,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      className="p-3 bg-[#00C38A]/20 backdrop-blur-xl rounded-2xl border border-[#00C38A]/30"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Lock className="w-5 h-5 text-[#00C38A]" />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Security scan lines */}
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#00C38A] to-transparent"
                    animate={{ y: ["0%", "100%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Pulsing security rings */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00C38A]/20"
                    style={{
                      width: `${100 + i * 30}%`,
                      height: `${100 + i * 30}%`
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.4, 0.1, 0.4]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                {/* 3D security badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-gradient-to-br from-[#00C38A] to-[#00E598] rounded-2xl p-4 shadow-2xl border border-white/20"
                  animate={{
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-white font-bold text-sm mb-1"
                      animate={{
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      100%
                    </motion.div>
                    <div className="text-xs text-white/80">SECURE</div>
                  </div>
                </motion.div>

                {/* Ambient security glow */}
                <div className="absolute inset-0 bg-[#00C38A]/15 rounded-3xl blur-3xl -z-10 scale-125" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}