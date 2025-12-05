import { Shield, Linkedin, Twitter, Github, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-slate-50/40 to-white border-t border-muted/30 backdrop-blur-xl">

      {/* Soft gradient decor */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 bg-indigo-500/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* CTA LINE */}
        <div className="mb-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-[1px] shadow-2xl">
          <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                Ready to supercharge your brokerage?
              </h3>
              <p className="text-slate-600 mt-2">
                Join thousands of brokers already using AI to grow faster.
              </p>
            </div>

            <Button className="px-8 py-6 text-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 transition">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* BRAND */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-xl text-foreground">BrokerFlow</span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Intelligent insurance brokerage platform powered by AI. Automate, analyze, and grow your agency with confidence.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 pt-2">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted/40 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wide">Product</h4>
            <ul className="space-y-3 text-sm">
              {["Features", "Pricing", "Security", "Roadmap"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm">
              {["About", "Blog", "Careers", "Contact"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wide">Stay Updated</h4>

            <p className="text-sm text-muted-foreground mb-4">
              Get product updates & AI insights directly in your inbox.
            </p>

            <form className="flex items-center gap-2">
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Your email"
                  className="pl-9"
                />
              </div>
              <Button size="icon" className="bg-gradient-to-r from-indigo-600 to-blue-600">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-muted/30 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">

          <p className="text-muted-foreground">
            © {currentYear} BrokerFlow Inc. All rights reserved.
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            {["Privacy Policy", "Terms of Service", "Cookies", "Compliance"].map((item, i) => (
              <a key={i} href="#" className="text-muted-foreground hover:text-primary transition">
                {item}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}