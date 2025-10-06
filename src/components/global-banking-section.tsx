import { motion } from "framer-motion";
import { Globe, DollarSign, Euro, PoundSterling } from "lucide-react";

const currencies = [
  { code: "USD", icon: DollarSign, position: { top: "20%", left: "15%" } },
  { code: "GBP", icon: PoundSterling, position: { top: "30%", right: "20%" } },
  { code: "EUR", icon: Euro, position: { bottom: "30%", left: "20%" } },
  { code: "JPY", icon: DollarSign, position: { bottom: "25%", right: "15%" } },
  { code: "SGD", icon: DollarSign, position: { top: "60%", left: "70%" } },
  { code: "HKD", icon: DollarSign, position: { top: "40%", left: "50%" } }
];

export function GlobalBankingSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F0E] via-[#0D1311] to-[#101614]" />
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 195, 138, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 195, 138, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'meshMove 35s linear infinite'
          }}
        />
      </div>

      {/* Ambient lighting effects */}
      <motion.div 
        className="absolute top-1/4 right-1/3 w-80 h-80 bg-[#00C38A] opacity-5 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.05, 0.12, 0.05]
        }}
        transition={{
          duration: 12,
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
              Get local and global bank accounts.
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Fulfil business requirements from anywhere in the world by opening bank accounts 
              in multiple currencies including USD, GBP, EUR, CNY, JPY, SGD, and HKD. 
              Yes — all without visiting a bank or handling excessive paperwork.
            </motion.p>

            {/* Currency grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {["USD", "GBP", "EUR", "CNY", "JPY", "SGD", "HKD"].map((currency, index) => (
                <motion.div
                  key={currency}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#00C38A]/10 to-[#00E598]/5 backdrop-blur-sm border border-white/10 text-center transition-all duration-300 group-hover:border-[#00C38A]/30 group-hover:bg-[#00C38A]/15"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      className="text-2xl font-bold text-[#00C38A] mb-1"
                      animate={index < 3 ? {
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={index < 3 ? {
                        duration: 2 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : {}}
                    >
                      {currency}
                    </motion.div>
                    <div className="text-xs text-gray-400">Available</div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Key benefits */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                "No bank visits required",
                "Minimal paperwork",
                "Multi-currency support",
                "Global accessibility"
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-[#00C38A] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Interactive Globe */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-lg mx-auto perspective-1000">
              
              {/* Main globe container */}
              <motion.div
                className="relative aspect-square"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Custom Globe Illustration */}
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0B1F1A] via-[#0D2B1F] to-[#0F3524]"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {/* Globe Grid Pattern */}
                  <div className="absolute inset-0 rounded-full">
                    {/* Longitude lines */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`long-${i}`}
                        className="absolute top-0 left-1/2 w-px h-full bg-[#00C38A]/20"
                        style={{
                          transform: `translateX(-50%) rotateZ(${i * 22.5}deg)`,
                          transformOrigin: '50% 50%'
                        }}
                      />
                    ))}
                    
                    {/* Latitude lines */}
                    {[25, 50, 75].map((top) => (
                      <div
                        key={`lat-${top}`}
                        className="absolute left-1/2 w-full h-px bg-[#00C38A]/20"
                        style={{
                          top: `${top}%`,
                          transform: 'translateX(-50%)',
                          borderRadius: '50%'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Continents Representation */}
                  <div className="absolute inset-0 rounded-full">
                    {/* North America */}
                    <div className="absolute top-[25%] left-[15%] w-8 h-6 bg-[#00C38A]/30 rounded-full" />
                    
                    {/* Europe */}
                    <div className="absolute top-[30%] left-[45%] w-4 h-4 bg-[#00C38A]/30 rounded-full" />
                    
                    {/* Asia */}
                    <div className="absolute top-[35%] right-[20%] w-12 h-8 bg-[#00C38A]/30 rounded-full" />
                    
                    {/* Africa */}
                    <div className="absolute top-[45%] left-[40%] w-6 h-10 bg-[#00C38A]/30 rounded-full" />
                    
                    {/* Australia */}
                    <div className="absolute bottom-[25%] right-[25%] w-4 h-3 bg-[#00C38A]/30 rounded-full" />
                  </div>
                  
                  {/* Globe overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00C38A]/10 via-transparent to-[#00E598]/10 rounded-full" />
                  
                  {/* Glowing rim */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#00C38A]/30 shadow-inner" />
                </motion.div>

                {/* Orbiting currency icons */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {currencies.map((currency, index) => {
                    const Icon = currency.icon;
                    return (
                      <motion.div
                        key={currency.code}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={currency.position}
                        animate={{
                          y: [0, -15, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 3 + index * 0.5,
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        <motion.div
                          className="p-3 bg-gradient-to-br from-[#00C38A]/20 to-[#00E598]/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Icon className="w-6 h-6 text-[#00C38A]" />
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
                            {currency.code}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Central globe icon */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-gradient-to-br from-[#00C38A]/30 to-[#00E598]/20 backdrop-blur-2xl rounded-full border border-white/30"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Globe className="w-12 h-12 text-[#00C38A]" />
                </motion.div>

                {/* Pulsing rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00C38A]/20"
                    style={{
                      width: `${120 + i * 40}%`,
                      height: `${120 + i * 40}%`
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                {/* 3D depth effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-[#00C38A]/10 pointer-events-none" />
              </motion.div>

              {/* Floating connection lines */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-px h-20 bg-gradient-to-t from-transparent via-[#00C38A]/30 to-transparent"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 45}deg) translateY(-60px)`,
                      transformOrigin: "bottom"
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scaleY: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Ambient glow */}
              <div className="absolute inset-0 bg-[#00C38A]/15 rounded-full blur-3xl -z-10 scale-150" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}