import { motion } from "motion/react";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Github,
  Heart
} from "lucide-react";

interface FooterProps {
  isDark: boolean;
  onNavigate?: (page: string) => void;
}

export function Footer({ isDark, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Rides", value: "rides" },
      { label: "Food Orders", value: "food" },
      { label: "How It Works", value: "how-it-works" },
      { label: "Pricing", value: "pricing" },
    ],
    company: [
      { label: "About Us", value: "about" },
      { label: "Careers", value: "careers" },
      { label: "Blog", value: "blog" },
      { label: "Press Kit", value: "press" },
    ],
    support: [
      { label: "Help Center", value: "help" },
      { label: "Safety", value: "safety" },
      { label: "Community", value: "community" },
      { label: "Contact Us", value: "contact" },
    ],
    legal: [
      { label: "Privacy Policy", value: "privacy" },
      { label: "Terms of Service", value: "terms" },
      { label: "Cookie Policy", value: "cookies" },
      { label: "Guidelines", value: "guidelines" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: Twitter, label: "Twitter", url: "#" },
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: Linkedin, label: "LinkedIn", url: "#" },
    { icon: Github, label: "GitHub", url: "#" },
  ];

  return (
    <footer className={`relative mt-auto px-6 py-12 ${isDark ? 'bg-[#020402]' : 'bg-gradient-to-b from-transparent to-[#A9C5A0]/20'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className={`rounded-3xl backdrop-blur-xl ${
          isDark 
            ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
            : 'bg-white/30 border-white/60'
        } border shadow-lg relative overflow-hidden p-8 md:p-12`}>
          {/* Glass shine effect */}
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-white/5 via-transparent to-transparent' 
              : 'bg-gradient-to-br from-white/80 via-white/40 to-transparent'
          } pointer-events-none`} />
          
          <div className="relative z-10">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-10 h-10 rounded-full ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#F4B400] to-[#FFD166]' 
                        : 'bg-gradient-to-br from-[#F4B400] to-[#FF7F50]'
                    } flex items-center justify-center shadow-lg`}>
                      <span className="text-[#020402]">R</span>
                    </div>
                    <span className={`text-xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      Riden'Byte
                    </span>
                  </div>
                  <p className={`mb-6 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'} max-w-xs`}>
                    Connect with fellow students to share rides and food orders. Save money, reduce waste, and build community.
                  </p>
                  
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isDark ? 'bg-[#3A463A]/30' : 'bg-white/50'
                      }`}>
                        <Mail className={`w-4 h-4 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                      </div>
                      <span className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        hello@ridenbyte.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isDark ? 'bg-[#3A463A]/30' : 'bg-white/50'
                      }`}>
                        <Phone className={`w-4 h-4 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                      </div>
                      <span className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        +1 (555) 123-4567
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isDark ? 'bg-[#3A463A]/30' : 'bg-white/50'
                      }`}>
                        <MapPin className={`w-4 h-4 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                      </div>
                      <span className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        Campus Hub, University District
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Links Sections */}
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className={`mb-4 capitalize ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.value}>
                        <button
                          onClick={() => onNavigate?.(link.value)}
                          className={`${
                            isDark 
                              ? 'text-[#758173] hover:text-[#F4B400]' 
                              : 'text-[#020402]/70 hover:text-[#FF7F50]'
                          } transition-colors duration-300 text-left`}
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className={`h-px ${isDark ? 'bg-[#3A463A]/50' : 'bg-[#A9C5A0]/30'} mb-8`} />

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex items-center gap-2 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}
              >
                © {currentYear} Riden'Byte. Made with <Heart className="w-4 h-4 text-[#FF7F50] fill-[#FF7F50]" /> for students
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-full backdrop-blur-md ${
                      isDark 
                        ? 'bg-[#3A463A]/30 hover:bg-[#3A463A]/60 border-[#3A463A]/50' 
                        : 'bg-white/40 hover:bg-white/60 border-white/60'
                    } border transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <social.icon className={`w-4 h-4 ${
                      isDark ? 'text-[#C5EFCB]' : 'text-[#758173]'
                    }`} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* App Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 pt-8 border-t border-[#3A463A]/30 flex flex-wrap items-center justify-center gap-4"
            >
              <div className={`px-6 py-3 rounded-xl backdrop-blur-md ${
                isDark 
                  ? 'bg-[#020402]/40 border-[#3A463A]/50' 
                  : 'bg-white/40 border-white/60'
              } border flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300`}>
                <div className="w-8 h-8 bg-[#020402] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">🍎</span>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-[#758173]' : 'text-[#020402]/60'}`}>
                    Download on the
                  </p>
                  <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                    App Store
                  </p>
                </div>
              </div>
              
              <div className={`px-6 py-3 rounded-xl backdrop-blur-md ${
                isDark 
                  ? 'bg-[#020402]/40 border-[#3A463A]/50' 
                  : 'bg-white/40 border-white/60'
              } border flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300`}>
                <div className="w-8 h-8 bg-[#020402] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">▶</span>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-[#758173]' : 'text-[#020402]/60'}`}>
                    Get it on
                  </p>
                  <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                    Google Play
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
