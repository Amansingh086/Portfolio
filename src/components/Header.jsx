import { useEffect, useState } from 'react';
import { Sun, Moon, Settings, Menu, X } from 'lucide-react';

export default function Header({ isDarkMode, setIsDarkMode, toggleDrawer, isDrawerOpen, name }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Resume", href: "#resume" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  // Dynamic Logo based on name
  const logoText = name ? name.split(' ')[0].toLowerCase() + '.dev' : 'portfolio.dev';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
      isScrolled 
        ? 'py-3 bg-cyber-slate-950/80 dark:bg-cyber-slate-950/80 backdrop-blur-md border-b border-slate-200/10 shadow-lg' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <span className="font-sans font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyber-emerald via-cyber-teal to-cyber-violet">
              {logoText}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors font-sans"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Live Customizer Gear */}
            <button 
              onClick={toggleDrawer}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-300 ${
                isDrawerOpen
                  ? 'bg-cyber-emerald/10 border-cyber-emerald text-cyber-emerald'
                  : 'bg-slate-800/30 border-slate-800/80 text-slate-300 hover:border-cyber-emerald/50 hover:text-cyber-emerald'
              }`}
            >
              <Settings size={14} className={isDrawerOpen ? 'animate-spin' : ''} />
              <span>Customize Live</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-ping" />
            </button>

            {/* Dark/Light mode toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-slate-800/30 border border-slate-800/80 text-slate-400 hover:text-slate-100 transition-all hover:bg-slate-800/60"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center space-x-3">
            <button 
              onClick={toggleDrawer}
              className={`p-2 rounded-lg border text-slate-300 transition-all ${
                isDrawerOpen 
                  ? 'bg-cyber-emerald/10 border-cyber-emerald text-cyber-emerald' 
                  : 'bg-slate-800/30 border-slate-800/80 hover:text-cyber-emerald'
              }`}
              title="Live Customizer"
            >
              <Settings size={18} className={isDrawerOpen ? 'animate-spin' : ''} />
            </button>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-slate-800/30 border border-slate-800/80 text-slate-400 hover:text-slate-100 transition-all"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/30 border border-slate-800/80 text-slate-400 hover:text-slate-100 transition-all"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyber-slate-900 border-b border-slate-800/80 px-4 py-4 space-y-3 shadow-xl backdrop-blur-md">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
