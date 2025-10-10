import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CFO, TechCorp",
    company: "TechCorp International",
    content: "Payflow has transformed our cross-border payments. Zero hidden fees and instant settlements have saved us thousands monthly.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "Finance Director",
    company: "Global Ventures",
    content: "The transparency and speed of Payflow's platform is unmatched. Our international operations run seamlessly now.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emma Thompson",
    role: "Treasury Manager",
    company: "InnovateLtd",
    content: "Enterprise-grade security with consumer-level simplicity. Payflow delivers on every promise.",
    rating: 5,
    avatar: "ET"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0A0F0D] to-[#101614] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 195, 138, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 195, 138, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-[#00C38A]">10,000+</span> businesses globally
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join companies worldwide who trust Payflow for their cross-border financial operations
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
            >
              {/* Quote icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-[#00C38A] opacity-60" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#00C38A] fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#00C38A] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-[#00C38A] text-sm">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Countries Supported", value: "190+" },
            { label: "Monthly Volume", value: "$2.4B+" },
            { label: "Active Users", value: "50K+" },
            { label: "Success Rate", value: "99.9%" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-[#00C38A] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}