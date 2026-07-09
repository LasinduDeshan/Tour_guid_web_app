"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-6 bg-neutral-900 overflow-hidden">
      {/* Full-bleed Background Image with Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/anthony-lim-H-qDQSXBBBc-unsplash.jpg" 
          alt="Sri Lanka Travel Background" 
          fill 
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65 z-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-white/95 backdrop-blur-md w-full max-w-[450px] p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/20"
      >
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-light font-montserrat tracking-tight mb-2 block text-black">
            TOUR<span className="font-semibold text-black font-montserrat">GUID</span>
          </Link>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-1 font-montserrat">Welcome Back</h2>
          <p className="text-sm text-neutral-400 font-light font-poppins">Login to manage your bookings and profile</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 px-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium border border-red-100">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span className="font-poppins">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider font-poppins">Email Address</label>
            <div className="flex items-center gap-3.5 p-3.5 px-4 bg-neutral-50 rounded-xl border-2 border-transparent focus-within:border-black focus-within:bg-white transition-all duration-200">
              <Mail size={18} className="text-neutral-400 flex-shrink-0" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="border-none bg-transparent w-full font-light text-sm outline-none text-neutral-800 placeholder-neutral-400 font-poppins"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider font-poppins">Password</label>
            <div className="flex items-center gap-3.5 p-3.5 px-4 bg-neutral-50 rounded-xl border-2 border-transparent focus-within:border-black focus-within:bg-white transition-all duration-200">
              <Lock size={18} className="text-neutral-400 flex-shrink-0" />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border-none bg-transparent w-full font-light text-sm outline-none text-neutral-800 placeholder-neutral-400 font-poppins"
              />
            </div>
          </div>

          <button type="submit" className="bg-black text-white hover:bg-neutral-800 rounded-xl py-3.5 font-semibold text-sm transition-all duration-200 w-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none font-poppins mt-2" disabled={loading}>
            {loading ? "Logging in..." : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-neutral-50 rounded-xl text-[0.8rem] text-neutral-500 font-light font-poppins leading-relaxed border border-neutral-100 flex flex-col gap-1.5">
          <p><strong>Admin:</strong> admin@ceyoratours.com / admin123</p>
          <p><strong>User:</strong> user@example.com / user123</p>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-400 font-light font-poppins">
          Don't have an account? <Link href="/register" className="text-black font-semibold hover:underline ml-1">Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
