"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Shield } from "lucide-react";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-lg">
          {/* Replaced <img src="/logo.svg"> with a Lucide Icon for immediate visual */}
          <Shield className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">
          BrokerFlow
        </span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
        <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
        <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {!session ? (
          <>
            <a
              href="/auth"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors hidden sm:block"
            >
              Sign In
            </a>
            <a
              href="/auth"
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </a>
          </>
        ) : (
        <button
          className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center gap-2"
          onClick={() => signOut()}
        >
          {/* Replaced manual SVG with Lucide LogOut */}
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
        )}
      </div>
    </nav>
  );
};