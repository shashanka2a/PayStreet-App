"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ChevronDown, Menu, X, LogIn } from "lucide-react";

const navigationItems = [
  {
    title: "Products",
    items: [
      { label: "Payment Processing", href: "#" },
      { label: "Global Transfers", href: "#" },
      { label: "Business Cards", href: "#" },
      { label: "Expense Management", href: "#" }
    ]
  },
  {
    title: "Solutions", 
    items: [
      { label: "For Startups", href: "#" },
      { label: "For Enterprises", href: "#" },
      { label: "For Marketplaces", href: "#" },
      { label: "For E-commerce", href: "#" }
    ]
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" }
    ]
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" }
    ]
  }
];

interface NavbarProps {
  onEnterPWA?: () => void;
}

export function Navbar({ onEnterPWA }: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0B0F0E]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="#" className="flex items-center">
                <div className="text-2xl font-bold text-white">
                  Pay<span className="text-[#00C38A]">Flow</span>
                </div>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.title} className="relative group">
                  <button
                    className="flex items-center space-x-1 text-white hover:text-[#00C38A] transition-colors duration-300 py-2"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="font-medium">{item.title}</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-56 bg-[#0B0F0E]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setActiveDropdown(item.title)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="py-2">
                          {item.items.map((subItem, index) => (
                            <motion.a
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm text-gray-300 hover:text-[#00C38A] hover:bg-white/5 transition-all duration-200"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ x: 5 }}
                            >
                              {subItem.label}
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-[#00C38A] hover:bg-white/5 transition-all duration-300"
                  onClick={onEnterPWA}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Log in
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-[#00C38A] hover:bg-[#00b37a] text-white px-6 py-2 rounded-xl transition-all duration-500 shadow-lg shadow-[#00C38A]/25 hover:shadow-xl hover:shadow-[#00C38A]/40"
                  onClick={onEnterPWA}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden text-white hover:text-[#00C38A] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-[#0B0F0E]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-6 pt-20">
                {/* Mobile Navigation Items */}
                <div className="space-y-4 mb-8">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        className="flex items-center justify-between w-full text-left text-white hover:text-[#00C38A] transition-colors duration-300 py-2"
                        onClick={() => handleDropdownToggle(item.title)}
                      >
                        <span className="font-medium">{item.title}</span>
                        <motion.div
                          animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.title && (
                          <motion.div
                            className="ml-4 mt-2 space-y-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.items.map((subItem, subIndex) => (
                              <motion.a
                                key={subItem.label}
                                href={subItem.href}
                                className="block text-sm text-gray-300 hover:text-[#00C38A] transition-colors duration-200 py-1"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.label}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Actions */}
                <motion.div
                  className="space-y-4 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:text-[#00C38A] hover:bg-white/5 transition-all duration-300"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onEnterPWA?.();
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Log in
                  </Button>
                  
                  <Button 
                    className="w-full bg-[#00C38A] hover:bg-[#00b37a] text-white transition-all duration-500 shadow-lg shadow-[#00C38A]/25"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onEnterPWA?.();
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}