import Link from "next/link"
import { Logo } from "./logo"

export const Footer = () => {
  return (
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo/>
          <div className="flex gap-8 text-sm font-medium text-slate-600">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms
            </Link>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
  )
}