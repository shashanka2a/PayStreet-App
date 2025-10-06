import { motion } from "framer-motion";

export function Footer() {
  const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'API Docs', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'About', href: '#' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Compliance', href: '#' }
  ];

  return (
    <footer className="bg-[#0A0F0D] relative overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00C38A] to-transparent" />
      
      {/* Glowing line accent */}
      <motion.div 
        className="absolute top-1 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-[#00C38A] blur-sm"
        initial={{ width: 0 }}
        whileInView={{ width: 128 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo and tagline */}
          <div className="space-y-4">
            <motion.h3 
              className="text-3xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Paystreet.io
            </motion.h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Seamless global finance for the modern business
            </p>
          </div>

          {/* Navigation */}
          <motion.nav 
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-[#00C38A] transition-colors duration-300 text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>

          {/* Legal links */}
          <motion.div 
            className="border-t border-gray-800 pt-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap justify-center gap-6">
              {legal.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            
            <div className="text-gray-500 text-sm">
              © 2024 Paystreet.io. All rights reserved.
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background glow effects */}
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-[#00C38A] opacity-5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-[#00C38A] opacity-3 blur-2xl rounded-full" />
    </footer>
  );
}