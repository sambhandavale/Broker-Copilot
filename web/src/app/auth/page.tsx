"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { postAction } from "@/lib/utils/apiRequests";
import { Logo } from "@/components/shared/logo";

// 1. We move the Logic into a separate component
function AuthContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");

  useEffect(() => {
    const qp = searchParams.get("variant");
    if (qp && qp.toLowerCase() === "register") {
      setVariant("REGISTER");
    }
  }, [searchParams]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVariant = () => {
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (variant === "REGISTER") {
        // 1. Register user
        const data = await postAction("/api/auth/register", {
          name,
          email,
          password,
        });

        // 2. Auto-login after success
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/connectorwiz",
        });

        if (!loginRes?.error) {
          router.push(loginRes.url || "/connectorwiz");
        } else {
          throw new Error("Account created, but auto-login failed. Please sign in manually.");
        }
      } else {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/connectorwiz",
        });

        if (!res?.error) {
          router.push(res.url || "/connectorwiz");
        } else {
          throw new Error("Invalid email or password");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      
      <div className="hidden lg:flex w-1/2 bg-[#F0F6FF] flex-col justify-between p-12 relative overflow-hidden">
        <Logo/>

        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="relative w-full max-w-lg aspect-[4/3]">
             {/* Custom SVG Illustration imitating the reference */}
             <img src="/icons/finance_app.svg" alt="" height="300" />
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
                placeholder="eg. name@work.com"
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
                <button type="button" className="cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : variant === "LOGIN" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            {variant === "LOGIN" ? "Not registered yet?" : "Already have an account?"}{" "}
            <button
              onClick={toggleVariant}
              className="cursor-pointer font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
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

// 2. The Main Page Component wraps the content in Suspense
export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-blue-600 rounded-lg mb-4"></div>
          <p className="text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}