'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SocialProof() {
  const testimonials = [
    {
      quote: "Found a non-compete clause that would've prevented me from freelancing for 2 years. Saved my career.",
      author: "Marcus Rodriguez",
      role: "Freelance Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    },
    {
      quote: "My agency was about to sign a contract with unlimited liability. Contract Guard caught it. Dodged a $50k bullet.",
      author: "Jennifer Walsh",
      role: "Marketing Agency Owner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    },
    {
      quote: "I used to skim contracts and hope. Now I actually know what I'm signing. Worth every penny.",
      author: "David Okonkwo",
      role: "Tech Startup Founder",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-4">
          Don't Just Take Our Word For It
        </h2>
        <p className="text-zinc-400 text-center mb-16">
          Real stories from real people who avoided real disasters
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-xl hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-3 rounded-full overflow-hidden ring-2 ring-blue-500/50">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-zinc-500">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-zinc-300 italic leading-relaxed">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-4 glass px-8 py-4 rounded-full">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=faces',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces',
              ].map((avatar, i) => (
                <div key={i} className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-zinc-900">
                  <Image
                    src={avatar}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-semibold">1,247+ contracts analyzed</div>
              <div className="text-sm text-zinc-500">3,891 red flags caught</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
