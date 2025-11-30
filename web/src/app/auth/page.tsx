"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to home/dashboard
    }
  }, [status, router]);

  const toggleVariant = () => {
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
    setError(""); // Clear errors when switching
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (variant === "REGISTER") {
        // 1. Register Logic
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Registration failed");
        }

        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginRes?.error) {
          throw new Error("Account created, but auto-login failed. Please sign in manually.");
        }

        router.push("/");
      } else {
        // 1. Login Logic
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          throw new Error("Invalid email or password");
        }

        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already authenticated, we can show a loader or nothing while redirecting
  if (status === "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-blue-600 rounded-lg mb-4"></div>
          <p className="text-slate-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-900">
      
      {/* LEFT PANEL - Illustration & Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#F0F6FF] flex-col justify-between p-12 relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.339-.292-2.611-.835-3.985a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM12 17.25a.75.75 0 100-1.5.75.75 0 000 1.5zm-1.636-4.677a1.125 1.125 0 111.59.002l.002.002a2.625 2.625 0 003.703-3.301 1.125 1.125 0 111.955-1.13 4.875 4.875 0 01-6.879 6.133l-.002-.002a1.125 1.125 0 01-1.59-.002l-.002-.002L8.72 13.8a2.625 2.625 0 00-3.703 3.301 1.125 1.125 0 11-1.955 1.13 4.875 4.875 0 016.879-6.133l.002.002z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">PolicyAI</span>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="relative w-full max-w-lg aspect-[4/3]">
             {/* Custom SVG Illustration imitating the reference */}
             <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
                {/* Laptop Base */}
                <rect x="50" y="50" width="300" height="200" rx="20" fill="white" stroke="#1e293b" strokeWidth="4"/>
                <rect x="70" y="70" width="260" height="160" rx="10" fill="#eff6ff"/>
                {/* Screen Content - Charts */}
                <rect x="200" y="90" width="110" height="80" rx="4" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                <path d="M210 150 L230 140 L250 155 L270 130 L290 140" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                {/* Big Rupee Symbol */}
                <text x="130" y="160" fontSize="80" fontWeight="bold" fill="#3b82f6" opacity="0.2">₹</text>
                {/* People Shake Hands */}
                <circle cx="120" cy="180" r="30" fill="#3b82f6" />
                <circle cx="280" cy="180" r="30" fill="#10b981" />
                <rect x="120" y="180" width="160" height="60" rx="30" fill="#e2e8f0" opacity="0.5"/>
             </svg>
          </div>
          <div className="text-center mt-8">
            <p className="text-slate-500 font-medium mb-2 uppercase tracking-wider text-xs">Get started for free & integrate in minutes</p>
            <h1 className="text-3xl font-bold text-slate-900">Your Autonomous Agent to never lose a client</h1>
          </div>
        </div>

        {/* Background Gradient Decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/60 to-transparent pointer-events-none"></div>
      </div>

      {/* RIGHT PANEL - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-24 relative">

        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {variant === "LOGIN" ? "Welcome" : "Create Account"}
            </h2>
            <p className="text-slate-500">
              {variant === "LOGIN" ? "Sign into your account." : "Enter your details to get started."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center border border-red-100">
                {error}
              </div>
            )}

            {variant === "REGISTER" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                placeholder="johndoe@work.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                placeholder="••••••••••••"
              />
            </div>

            {variant === "LOGIN" && (
              <div className="flex justify-end">
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : variant === "LOGIN" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Or {variant === "LOGIN" ? "Signin" : "Signup"} with</span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            {variant === "LOGIN" ? "Not registered yet?" : "Already have an account?"}{" "}
            <button
              onClick={toggleVariant}
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
            >
              {variant === "LOGIN" ? "Sign Up Now" : "Sign In"}
            </button>
          </p>
          
          <div className="mt-12 flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 pt-6">
             <span>All rights reserved.</span>
             <div className="flex gap-4">
                <a href="#" className="hover:text-slate-600 transition-colors">Terms of Use</a>
                <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}