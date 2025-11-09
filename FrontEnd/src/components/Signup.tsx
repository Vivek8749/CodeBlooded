import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SignupProps {
  onNavigateBack: () => void;
  isDark: boolean;
}

export function Signup({ onNavigateBack, isDark }: SignupProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup submitted:", { username, email, password });
    // TODO: hook up to API
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[#020402]' : 'bg-gradient-to-br from-[#A9C5A0] via-[#C5EFCB] to-[#FFD166]'}`} />
      </div>

      {/* Back Button */}
      <button
        onClick={onNavigateBack}
        className={`absolute top-6 left-6 z-50 p-3 rounded-full backdrop-blur-xl ${
          isDark 
            ? 'bg-[#1A1F1A]/70 hover:bg-[#3A463A]/70 border-[#3A463A]/50' 
            : 'bg-white/40 hover:bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(169,197,160,0.2)]'
        } border transition-all duration-300 group relative overflow-hidden`}
      >
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-white/5 to-transparent' : 'bg-gradient-to-br from-white/60 to-transparent'}`} />
        <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-[#C5EFCB]' : 'text-[#758173]'} group-hover:translate-x-[-2px] transition-transform relative z-10`} />
      </button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl ${
            isDark 
              ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]' 
              : 'bg-white/30 border-white/60 shadow-[0_8px_32px_0_rgba(169,197,160,0.37)]'
          } border relative overflow-hidden`}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-white/5 via-transparent to-transparent' : 'bg-gradient-to-br from-white/80 via-white/40 to-transparent'} pointer-events-none`} />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`text-4xl mb-2 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}
              >
                Create account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}
              >
                Enter your details to sign up
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                  Username
                </Label>
                <div className="relative mt-2">
                  <div className={`absolute inset-0 rounded-lg backdrop-blur-md ${isDark ? 'bg-gradient-to-br from-[#1A1F1A]/60 to-[#020402]/40 border-[#3A463A]/50' : 'bg-gradient-to-br from-white/50 to-white/30 border-white/60'} border`} />
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder="Choose a username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="pl-4 relative z-10 bg-transparent border-transparent" 
                    required 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                  Email
                </Label>
                <div className="relative mt-2">
                  <div className={`absolute inset-0 rounded-lg backdrop-blur-md ${isDark ? 'bg-gradient-to-br from-[#1A1F1A]/60 to-[#020402]/40 border-[#3A463A]/50' : 'bg-gradient-to-br from-white/50 to-white/30 border-white/60'} border`} />
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#758173]' : 'text-[#F4B400]'} z-20`} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="pl-10 relative z-10 bg-transparent border-transparent" 
                    required 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                  Password
                </Label>
                <div className="relative mt-2">
                  <div className={`absolute inset-0 rounded-lg backdrop-blur-md ${isDark ? 'bg-gradient-to-br from-[#1A1F1A]/60 to-[#020402]/40 border-[#3A463A]/50' : 'bg-gradient-to-br from-white/50 to-white/30 border-white/60'} border`} />
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#758173]' : 'text-[#F4B400]'} z-20`} />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Create a password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="pl-10 relative z-10 bg-transparent border-transparent" 
                    required 
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className={`w-full py-4 rounded-full ${isDark ? 'bg-[#F4B400] text-[#020402]' : 'bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-[#020402]'} transition-all`}>Sign up</Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
