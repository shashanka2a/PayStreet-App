import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - CEO photo */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Soft lighting effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C38A]/20 to-transparent rounded-3xl blur-xl" />
              
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1754704631226-c5613ac5abb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMENFTyUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTc2MzQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="CEO of Paystreet"
                  className="w-full h-[600px] object-cover"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
              
              {/* Floating quote */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                  "Every business deserves transparent, global banking."
                </p>
                <p className="text-xs text-[#00C38A] mt-2 font-medium">- Alex Thompson, CEO</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Mission text */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.h2 
                className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                style={{ fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Built for growing businesses
              </motion.h2>
              
              <motion.div 
                className="w-20 h-1 bg-[#00C38A] rounded-full mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>

            <motion.div 
              className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>
                At Paystreet, we believe that financial borders shouldn't limit business growth. 
                Founded by a team of fintech veterans and former banking executives, we've experienced 
                firsthand the frustrations of opaque fees and slow international transfers.
              </p>
              
              <p>
                Our mission is simple: create a transparent, intelligent banking platform that 
                empowers businesses to operate globally without compromise. Every feature we build, 
                every partnership we forge, and every line of code we write serves this vision.
              </p>
              
              <p>
                Today, we're proud to serve thousands of businesses across 40+ countries, 
                processing billions in transactions with complete transparency and zero hidden fees.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-8 pt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00C38A] mb-2">40+</div>
                <div className="text-gray-600 dark:text-gray-400">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00C38A] mb-2">$2B+</div>
                <div className="text-gray-600 dark:text-gray-400">Processed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}