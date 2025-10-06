import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet } from "lucide-react";

export function PlatformPreview() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      <div className="absolute inset-0 dotted-grid opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#00C38A]/10 border border-[#00C38A]/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm text-[#00C38A] font-medium">Multi-Device Experience</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-[#00C38A] to-[#00b37a] bg-clip-text text-transparent">
              Multi-Platform Experience
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access your Paystreet account seamlessly across all your devices. 
            Same experience, same security, unlimited possibilities.
          </p>
        </div>

        {/* Device showcase */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { icon: Monitor, title: "Desktop", desc: "Full-featured platform" },
            { icon: Tablet, title: "Tablet", desc: "Optimized for touch" },
            { icon: Smartphone, title: "Mobile", desc: "On-the-go banking" }
          ].map((device, index) => (
            <motion.div
              key={device.title}
              className="text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <device.icon className="w-12 h-12 text-[#00C38A] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {device.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {device.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}