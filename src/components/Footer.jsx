import { ArrowUp } from 'lucide-react';

export default function Footer({ name }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-cyber-slate-950 border-t border-slate-900 overflow-hidden no-print">
      {/* Subtle bottom grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808005_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-xs text-slate-500 font-sans">
            &copy; {currentYear} {name || 'Portfolio'}. All rights reserved.
          </p>
          <p className="text-3xs text-slate-650 font-sans">
            Engineered with React.js &amp; Tailwind CSS.
          </p>
        </div>

        {/* Right Side: Back to Top Button */}
        <button 
          onClick={scrollToTop}
          className="group flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-cyber-emerald hover:border-cyber-emerald/30 transition-all duration-300"
          title="Back to Top"
        >
          <span>Scroll to Top</span>
          <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>

      </div>
    </footer>
  );
}
