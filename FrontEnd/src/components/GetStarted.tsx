import { motion } from "motion/react";
import { Car, UtensilsCrossed, Users, Sparkles, MessageSquare, DollarSign, MapPin, Shield, TrendingDown, Clock, Code, Palette, PresentationIcon, Linkedin, Github, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useRef } from "react";

interface GetStartedProps {
  onNavigateToLogin: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  scrollToFeatures?: boolean;
}

export function GetStarted({ onNavigateToLogin, isDark, toggleTheme, scrollToFeatures }: GetStartedProps) {
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Scroll to features when requested
  if (scrollToFeatures && featuresRef.current) {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const handleScrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col">
      {/* Header */}
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        isAuthenticated={false}
        onScrollToFeatures={handleScrollToFeatures}
        onScrollToHowItWorks={handleScrollToHowItWorks}
        onScrollToAbout={handleScrollToAbout}
      />
      
      <div className="flex-1 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[#020402]' : 'bg-gradient-to-br from-[#A9C5A0] via-[#C5EFCB] to-[#FFD166]'}`} />
        
        {/* Floating Orbs */}
        <motion.div
          className={`absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-[#F4B400]/10' : 'bg-[#F4B400]/40'}`}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-[#FF7F50]/10' : 'bg-[#FF7F50]/40'}`}
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-[#1A1F1A]/50' : 'bg-white/60'}`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12">
        {/* Logo/Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-4"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md ${
              isDark ? 'bg-[#1A1F1A]' : 'bg-white/90 shadow-lg'
            } border ${isDark ? 'border-[#3A463A]' : 'border-[#FF7F50]/30'}`}>
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
              <span className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>Welcome to the Future</span>
            </div>
          </motion.div>
          
          <h1 className={`text-6xl md:text-8xl mb-4 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402] drop-shadow-sm'}`}>
            RideN'Byte
          </h1>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-[#758173]' : 'text-[#020402]/80'} max-w-2xl mx-auto`}>
            Share rides, split meals, save money. <br />
            The smart way for students to connect.
          </p>
        </motion.div>

        {/* Features Grid with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-12"
        >
          {[
            {
              icon: Car,
              title: "Shared Rides",
              description: "Find or create rides to the same destination",
              delay: 0.3,
            },
            {
              icon: UtensilsCrossed,
              title: "Food Orders",
              description: "Split delivery costs with fellow students",
              delay: 0.4,
            },
            {
              icon: Users,
              title: "Live Chat",
              description: "Stay connected with group messaging",
              delay: 0.5,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-2xl backdrop-blur-lg ${
                isDark 
                  ? 'bg-[#1A1F1A] border-[#3A463A]' 
                  : 'bg-white/80 border-white shadow-2xl'
              } border`}
            >
              <div className={`w-12 h-12 rounded-full ${
                isDark ? 'bg-[#F4B400]/20' : 'bg-gradient-to-br from-[#F4B400] to-[#FF7F50]'
              } flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${isDark ? 'text-[#F4B400]' : 'text-white'}`} />
              </div>
              <h3 className={`mb-2 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                {feature.title}
              </h3>
              <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={onNavigateToLogin}
            className={`px-8 py-6 rounded-full ${
              isDark 
                ? 'bg-[#F4B400] hover:bg-[#FFD166] text-[#020402]' 
                : 'bg-[#F4B400] hover:bg-[#FFD166] text-[#020402]'
            } transition-all duration-300 shadow-lg hover:shadow-2xl`}
          >
            Get Started
          </Button>
          <Button
            onClick={handleScrollToFeatures}
            variant="outline"
            className={`px-8 py-6 rounded-full backdrop-blur-md ${
              isDark 
                ? 'bg-[#1A1F1A] hover:bg-[#3A463A] border-[#3A463A] text-[#C5EFCB]' 
                : 'bg-[#C6DEC6] hover:bg-[#A9C5A0] border-[#758173]/40 text-[#020402]'
            } transition-all duration-300`}
          >
            Learn More
          </Button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`mt-16 grid grid-cols-3 gap-8 max-w-3xl w-full p-6 rounded-2xl backdrop-blur-lg ${
            isDark 
              ? 'bg-[#1A1F1A] border-[#3A463A]' 
              : 'bg-white/80 border-white shadow-2xl'
          } border`}
        >
          {[
            { number: "500+", label: "Active Users" },
            { number: "1000+", label: "Rides Shared" },
            { number: "50%", label: "Avg. Savings" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl mb-1 bg-gradient-to-r ${
                isDark 
                  ? 'from-[#F4B400] to-[#FFD166]' 
                  : 'from-[#F4B400] to-[#FF7F50]'
              } bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              <div className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className={`relative z-10 px-6 py-24 scroll-mt-24 ${isDark ? 'bg-[#020402]' : 'bg-gradient-to-b from-transparent to-[#A9C5A0]/30'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Problem Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className={`inline-block px-4 py-2 rounded-full backdrop-blur-md mb-6 ${
              isDark ? 'bg-[#FF7F50]/20 text-[#FF7F50]' : 'bg-[#FF7F50]/30 text-[#FF7F50]'
            }`}>
              The Problem
            </span>
            <h2 className={`text-4xl md:text-5xl mb-6 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
              Students Are Overspending
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
              Every day, students book separate rides and food orders to the same destinations and restaurants, 
              leading to <span className={isDark ? 'text-[#FF7F50]' : 'text-[#FF7F50]'}>unnecessary costs</span> and 
              <span className={isDark ? 'text-[#FF7F50]' : 'text-[#FF7F50]'}> environmental waste</span>.
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-20"
          >
            <span className={`inline-block px-4 py-2 rounded-full backdrop-blur-md mb-6 ${
              isDark ? 'bg-[#F4B400]/20 text-[#F4B400]' : 'bg-[#F4B400]/30 text-[#020402]'
            }`}>
              Our Solution
            </span>
            <h2 className={`text-4xl md:text-5xl mb-6 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
              Share, Save, Sustain
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
              Riden'Byte connects students to share rides and group food orders, making it easy to 
              <span className={isDark ? 'text-[#F4B400]' : 'text-[#F4B400]'}> reduce costs</span> and 
              <span className={isDark ? 'text-[#F4B400]' : 'text-[#F4B400]'}> minimize waste</span> while building a stronger campus community.
            </p>
          </motion.div>

          {/* Key Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          >
            {[
              {
                icon: Car,
                title: "Shared Rides",
                description: "Find students going to the same destination and split the ride cost",
                color: isDark ? 'from-[#F4B400] to-[#FFD166]' : 'from-[#F4B400] to-[#FF7F50]',
              },
              {
                icon: UtensilsCrossed,
                title: "Group Food Orders",
                description: "Coordinate orders from the same restaurant and share delivery fees",
                color: isDark ? 'from-[#FF7F50] to-[#FFD166]' : 'from-[#FF7F50] to-[#F4B400]',
              },
              {
                icon: MessageSquare,
                title: "Group Chat",
                description: "Real-time messaging to coordinate with your group members",
                color: isDark ? 'from-[#C5EFCB] to-[#758173]' : 'from-[#A9C5A0] to-[#C6DEC6]',
              },
              {
                icon: DollarSign,
                title: "Smart Payment Splitting",
                description: "Automatically calculate and split costs fairly among all participants",
                color: isDark ? 'from-[#F4B400] to-[#C5EFCB]' : 'from-[#F4B400] to-[#A9C5A0]',
              },
              {
                icon: MapPin,
                title: "Live Tracking",
                description: "Track your ride or delivery in real-time on an interactive map",
                color: isDark ? 'from-[#FF7F50] to-[#F4B400]' : 'from-[#FF7F50] to-[#FFD166]',
              },
              {
                icon: Shield,
                title: "Verified Profiles",
                description: "Connect only with verified students for a safe and trusted experience",
                color: isDark ? 'from-[#758173] to-[#C5EFCB]' : 'from-[#758173] to-[#C6DEC6]',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-8 rounded-2xl backdrop-blur-lg ${
                  isDark 
                    ? 'bg-[#1A1F1A] border-[#3A463A]' 
                    : 'bg-white/80 border-white shadow-xl'
                } border relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl mb-3 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works */}
          <motion.div
            ref={howItWorksRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 scroll-mt-24"
          >
            <h2 className={`text-4xl md:text-5xl text-center mb-16 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Search",
                  description: "Find rides or food orders going to your destination",
                },
                {
                  step: "2",
                  title: "Join",
                  description: "Join an existing group or create your own",
                },
                {
                  step: "3",
                  title: "Connect",
                  description: "Chat with group members and coordinate details",
                },
                {
                  step: "4",
                  title: "Save",
                  description: "Split costs automatically and track your savings",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center relative"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${
                    isDark ? 'from-[#F4B400] to-[#FFD166]' : 'from-[#F4B400] to-[#FF7F50]'
                  } flex items-center justify-center text-2xl text-white shadow-lg`}>
                    {item.step}
                  </div>
                  <h3 className={`text-xl mb-2 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                    {item.title}
                  </h3>
                  <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                    {item.description}
                  </p>
                  {index < 3 && (
                    <div className={`hidden md:block absolute top-8 left-full w-full h-0.5 ${
                      isDark ? 'bg-[#3A463A]' : 'bg-[#758173]/30'
                    }`} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className={`text-4xl md:text-5xl text-center mb-16 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
              Why Students Love Riden'Byte
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingDown,
                  title: "Save Up to 50%",
                  description: "Cut your transportation and food delivery costs in half",
                  stat: "50%",
                },
                {
                  icon: Clock,
                  title: "Save Time",
                  description: "Quick and easy coordination with built-in chat and tracking",
                  stat: "10min",
                },
                {
                  icon: Users,
                  title: "Build Community",
                  description: "Meet fellow students and make new friends on campus",
                  stat: "500+",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`p-8 rounded-2xl backdrop-blur-lg ${
                    isDark 
                      ? 'bg-[#1A1F1A] border-[#3A463A]' 
                      : 'bg-white/80 border-white shadow-xl'
                  } border text-center relative overflow-hidden`}
                >
                  <div className={`absolute top-4 right-4 text-6xl ${
                    isDark ? 'text-[#F4B400]/10' : 'text-[#F4B400]/20'
                  }`}>
                    {benefit.stat}
                  </div>
                  <benefit.icon className={`w-12 h-12 mx-auto mb-4 ${
                    isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'
                  }`} />
                  <h3 className={`text-2xl mb-3 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                    {benefit.title}
                  </h3>
                  <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About / Team Section */}
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 scroll-mt-24"
          >
            <h2 className={`text-4xl md:text-5xl text-center mb-6 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
              Meet Our Team
            </h2>
            <p className={`text-xl text-center mb-16 max-w-3xl mx-auto ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
              The talented individuals behind Riden'Byte, dedicated to making student life easier and more affordable
            </p>
            
            {/* Team Grid - 2x2 Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Vivek Mourya",
                  role: "Team Leader & Backend Developer",
                  skills: ["Express.js", "MongoDB", "Socket.io", "JWT"],
                  icon: Code,
                  color: isDark ? 'from-[#F4B400] to-[#FFD166]' : 'from-[#F4B400] to-[#FF7F50]',
                },
                {
                  name: "Adarsh Raj",
                  role: "Frontend Developer & UI/UX Designer",
                  skills: ["HTML", "CSS", "React", "UI/UX", "Figma"],
                  icon: Palette,
                  color: isDark ? 'from-[#FF7F50] to-[#FFD166]' : 'from-[#FF7F50] to-[#F4B400]',
                },
                {
                  name: "Aryan Kumar",
                  role: "Frontend Developer & Designer",
                  skills: ["HTML", "CSS", "React", "Canva", "Designing"],
                  icon: Palette,
                  color: isDark ? 'from-[#C5EFCB] to-[#758173]' : 'from-[#A9C5A0] to-[#C6DEC6]',
                },
                {
                  name: "Raj Shreya",
                  role: "Frontend Developer & Presenter",
                  skills: ["React", "Frontend", "Presentation", "Documentation"],
                  icon: PresentationIcon,
                  color: isDark ? 'from-[#F4B400] to-[#C5EFCB]' : 'from-[#F4B400] to-[#A9C5A0]',
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className={`p-8 rounded-2xl backdrop-blur-lg ${
                    isDark 
                      ? 'bg-[#1A1F1A] border-[#3A463A]' 
                      : 'bg-white/80 border-white shadow-xl'
                  } border relative overflow-hidden group`}
                >
                  {/* Background Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon Badge */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-6 shadow-lg relative z-10`}>
                    <member.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Team Member Info */}
                  <div className="relative z-10">
                    <h3 className={`text-2xl mb-2 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      {member.name}
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`}>
                      {member.role}
                    </p>
                    
                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDark 
                              ? 'bg-[#3A463A] text-[#C5EFCB]' 
                              : 'bg-[#C6DEC6] text-[#020402]'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-3 pt-4 border-t border-[#3A463A]/30">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-full ${
                          isDark 
                            ? 'bg-[#3A463A] hover:bg-[#F4B400] text-[#C5EFCB] hover:text-[#020402]' 
                            : 'bg-[#C6DEC6] hover:bg-[#F4B400] text-[#020402]'
                        } transition-all duration-300`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-full ${
                          isDark 
                            ? 'bg-[#3A463A] hover:bg-[#F4B400] text-[#C5EFCB] hover:text-[#020402]' 
                            : 'bg-[#C6DEC6] hover:bg-[#F4B400] text-[#020402]'
                        } transition-all duration-300`}
                      >
                        <Github className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-full ${
                          isDark 
                            ? 'bg-[#3A463A] hover:bg-[#F4B400] text-[#C5EFCB] hover:text-[#020402]' 
                            : 'bg-[#C6DEC6] hover:bg-[#F4B400] text-[#020402]'
                        } transition-all duration-300`}
                      >
                        <Mail className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      </div>
      
      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}
