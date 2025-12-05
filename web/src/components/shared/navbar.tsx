"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Shield, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      
      {/* LEFT SECTION */}
      <a className="flex items-center gap-2" href="/">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-lg">
          <Shield className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">
          BrokerFlow
        </span>
      </a>

      {/* CENTER LINKS */}
      <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
        <a href="#features" className="hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all">Features</a>
        <a href="#solutions" className="hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all">Solutions</a>
        <a href="#testimonials" className="hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all">Testimonials</a>
        <a href="#faq" className="hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all">FAQ</a>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="hidden md:flex items-center gap-4">
        {!session ? (
          <>
            <a
              href="/auth"
              className="text-sm font-semibold text-slate-600 hover:text-primary transition"
            >
              Sign in
            </a>

            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md hover:shadow-xl hover:scale-105 transition">
              <a href="/auth" className="flex items-center gap-2">
                Get started
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </>
        ) : (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm font-semibold text-slate-700 border border-muted rounded-xl hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        )}
      </div>

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-full left-0 w-full md:hidden bg-white border-t border-muted px-6 py-6 space-y-4 text-sm font-medium shadow-md">
          
          <a href="#features" className="block text-slate-700 hover:text-primary">Features</a>
          <a href="#solutions" className="block text-slate-700 hover:text-primary">Solutions</a>
          <a href="#testimonials" className="block text-slate-700 hover:text-primary">Testimonials</a>
          <a href="#faq" className="block text-slate-700 hover:text-primary">FAQ</a>

          {!session && (
            <>
              <a href="/auth" className="block pt-4 text-slate-700">Sign in</a>

              <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 mt-3">
                <a href="/auth" className="flex items-center justify-center gap-2">
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </>
          )}

          {session && (
            <button
              onClick={() => signOut()}
              className="w-full mt-4 px-4 py-3 text-sm border border-muted rounded-xl hover:text-red-600 hover:bg-red-50 flex justify-center items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          )}

        </div>
      )}
    </nav>
  );
};
