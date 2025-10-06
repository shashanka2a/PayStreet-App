import { motion } from "framer-motion";
import { Code, Zap, Shield, Globe } from "lucide-react";
import { Button } from "./ui/button";

export function ApiSection() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Enhanced dark gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#0A0F0D] via-[#0D1311] to-[#101614]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 195, 138, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0A0F0D 0%, #0D1311 50%, #101614 100%)'
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#00C38A]/10 border border-[#00C38A]/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Code className="w-4 h-4 text-[#00C38A] mr-2" />
            <span className="text-sm text-[#00C38A] font-medium">Developer-First API</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Build with our{" "}
            <span className="bg-gradient-to-r from-[#00C38A] to-[#00E598] bg-clip-text text-transparent">
              powerful API
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Integrate Paystreet's financial infrastructure into your applications with our 
            comprehensive RESTful API. Built for developers, trusted by enterprises.
          </p>
        </div>

        {/* API features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Sub-second response times" },
            { icon: Shield, title: "Secure", desc: "Bank-grade encryption" },
            { icon: Globe, title: "Global", desc: "Worldwide coverage" },
            { icon: Code, title: "RESTful", desc: "Easy integration" }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <feature.icon className="w-8 h-8 text-[#00C38A] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Code example */}
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Quick Start</h3>
            <p className="text-gray-400">Get started with just a few lines of code</p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <div className="text-gray-500 mb-2">// Initialize Paystreet SDK</div>
            <div className="text-blue-400">import</div>
            <div className="text-white"> PaystreetSDK </div>
            <div className="text-blue-400">from</div>
            <div className="text-green-400"> '@paystreet/sdk'</div>
            <div className="text-white">;</div>
            <br />
            <div className="text-blue-400 mt-4">const</div>
            <div className="text-white"> paystreet = </div>
            <div className="text-blue-400">new</div>
            <div className="text-yellow-400"> PaystreetSDK</div>
            <div className="text-white">(</div>
            <div className="text-green-400">'your-api-key'</div>
            <div className="text-white">);</div>
            <br />
            <div className="text-gray-500 mt-4">// Create a payment</div>
            <div className="text-blue-400">const</div>
            <div className="text-white"> payment = </div>
            <div className="text-blue-400">await</div>
            <div className="text-white"> paystreet.payments.</div>
            <div className="text-yellow-400">create</div>
            <div className="text-white">(&#123;</div>
            <div className="text-white ml-4">amount: </div>
            <div className="text-orange-400">1000</div>
            <div className="text-white">,</div>
            <div className="text-white ml-4">currency: </div>
            <div className="text-green-400">'USD'</div>
            <div className="text-white">&#125;);</div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-[#00C38A] hover:bg-[#00b37a] text-white px-10 py-6 text-lg transition-all duration-300 shadow-2xl shadow-[#00C38A]/25 rounded-2xl"
            >
              View API Documentation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}