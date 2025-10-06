import { motion } from "framer-motion";
import { Cloud, Lock, Shield, Database, FileText, Key } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DataPrivacySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F0E] via-[#0D1311] to-[#101614]" />
      
      {/* Encrypted grid pattern */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 195, 138, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 195, 138, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '45px 45px',
            animation: 'meshMove 25s linear infinite reverse'
          }}
        />
      </div>

      {/* Data flow ambient effects */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00C38A] opacity-6 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.06, 0.12, 0.06],
          x: [0, -30, 0]
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
              Your data is stored safely.
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Customer privacy is paramount and we never share your information with anyone, 
              unless mandated by law or legal compliance. Our encryption and access protocols 
              meet the highest global standards to ensure your data remains secure.
            </motion.p>

            {/* Privacy features */}
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
                  title: "Advanced Encryption", 
                  description: "Military-grade encryption for all data storage and transmission"
                },
                { 
                  icon: FileText, 
                  title: "Privacy Compliance", 
                  description: "Full GDPR and international privacy law compliance"
                },
                { 
                  icon: Database, 
                  title: "Secure Data Centers", 
                  description: "Data stored in certified, highly secure facilities"
                },
                { 
                  icon: Key, 
                  title: "Access Controls", 
                  description: "Strict access protocols and audit trails for all data access"
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

            {/* Compliance badges */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {["GDPR", "SOC 2", "ISO 27001", "PCI DSS"].map((standard, index) => (
                <motion.div
                  key={standard}
                  className="px-4 py-2 bg-gradient-to-r from-[#00C38A]/20 to-[#00E598]/10 backdrop-blur-sm border border-[#00C38A]/30 rounded-xl text-sm text-[#00C38A] font-medium"
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {standard}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Cloud Animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-lg mx-auto perspective-1000">
              
              {/* Main cloud container */}
              <motion.div
                className="relative aspect-square"
                whileHover={{ scale: 1.05, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Background cloud security image */}
                <motion.div
                  className="relative w-full h-full rounded-3xl overflow-hidden"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1667372283496-893f0b1e7c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHNlY3VyaXR5JTIwZW5jcnlwdGlvbiUyMGRhdGF8ZW58MXx8fHwxNzU5NzY1NzE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Cloud Security Encryption"
                    className="w-full h-full object-cover filter brightness-30"
                  />
                  
                  {/* Cloud data overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00C38A]/20 via-transparent to-[#00E598]/15" />
                </motion.div>

                {/* Central cloud icon with encryption glow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="p-8 bg-gradient-to-br from-[#00C38A]/30 to-[#00E598]/20 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(0, 195, 138, 0.3)",
                        "0 0 60px rgba(0, 195, 138, 0.6)",
                        "0 0 30px rgba(0, 195, 138, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Cloud className="w-16 h-16 text-[#00C38A]" />
                  </motion.div>
                </motion.div>

                {/* Floating encryption icons */}
                {[
                  { icon: Lock, top: "15%", left: "25%", delay: 0 },
                  { icon: Key, top: "20%", right: "20%", delay: 0.5 },
                  { icon: Shield, bottom: "25%", left: "20%", delay: 1 },
                  { icon: Database, bottom: "20%", right: "25%", delay: 1.5 }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{ top: item.top, left: item.left, bottom: item.bottom, right: item.right }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div
                        className="p-3 bg-gradient-to-br from-[#00C38A]/25 to-[#00E598]/15 backdrop-blur-xl rounded-2xl border border-[#00C38A]/30"
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <IconComponent className="w-5 h-5 text-[#00C38A]" />
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Data stream particles */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-[#00C38A] rounded-full opacity-40"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 30}deg) translateX(140px) translateY(-50%)`
                      }}
                      animate={{
                        scale: [0.5, 1.5, 0.5],
                        opacity: [0.2, 0.8, 0.2]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Encryption scan effect */}
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="absolute w-full h-2 bg-gradient-to-r from-transparent via-[#00C38A]/60 to-transparent blur-sm"
                    animate={{ y: ["0%", "100%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Pulsing data protection rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#00C38A]/20"
                    style={{
                      width: `${120 + i * 40}%`,
                      height: `${120 + i * 40}%`
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3],
                      borderWidth: ["2px", "4px", "2px"]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                {/* Privacy compliance badge */}
                <motion.div
                  className="absolute -top-6 -right-6 bg-gradient-to-br from-[#00C38A] to-[#00E598] rounded-2xl p-4 shadow-2xl border border-white/20"
                  animate={{
                    rotate: [0, -5, 0],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{
                    duration: 5,
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
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      GDPR
                    </motion.div>
                    <div className="text-xs text-white/80">COMPLIANT</div>
                  </div>
                </motion.div>

                {/* Ambient data glow */}
                <div className="absolute inset-0 bg-[#00C38A]/12 rounded-3xl blur-3xl -z-10 scale-130" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}