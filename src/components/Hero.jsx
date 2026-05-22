import React, { useState, useEffect } from 'react';
import { FileText, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ profile }) {
  const [typedTitle, setTypedTitle] = useState('');
  const [titleIdx, setTitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = [
    profile.title,
    "Full-Stack Architect",
    "Creative Problem Solver",
    "UI/UX Dev Craftsman"
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenTitles = 2000;

  useEffect(() => {
    let timer;
    const currentFullTitle = titles[titleIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedTitle(currentFullTitle.substring(0, typedTitle.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedTitle(currentFullTitle.substring(0, typedTitle.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && typedTitle === currentFullTitle) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenTitles);
    } else if (isDeleting && typedTitle === '') {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, titleIdx, profile.title]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Premium Ambient Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tr from-cyber-emerald/10 to-cyan-500/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-gradient-to-tr from-cyber-violet/10 to-pink-500/10 blur-3xl animate-float-medium" />
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Tag */}
            <div className="inline-flex items-center space-x-2 bg-cyber-emerald/10 border border-cyber-emerald/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyber-emerald animate-pulse mx-auto lg:mx-0">
              <Sparkles size={12} />
              <span>Available for New Initiatives</span>
            </div>

            {/* Title / Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold font-sans tracking-tight text-slate-100 leading-tight">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-emerald via-cyber-teal to-cyber-violet">
                  {profile.name}
                </span>
              </h1>
              
              {/* Typewriter subtitle */}
              <div className="h-8 sm:h-10 text-lg sm:text-2xl font-semibold font-sans text-slate-300 flex justify-center lg:justify-start items-center">
                <span>{typedTitle}</span>
                <span className="w-1 h-6 sm:h-8 ml-1 bg-cyber-emerald animate-pulse rounded-full" />
              </div>
            </div>

            {/* Bio */}
            <p className="text-slate-400 max-w-xl text-base sm:text-lg leading-relaxed mx-auto lg:mx-0 font-sans font-light">
              {profile.bio}
            </p>

            {/* Social handles */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 text-slate-400 pt-2">
              {profile.github && (
                <a 
                  href={`https://${profile.github}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-cyber-emerald transition-colors p-2 rounded-lg bg-slate-900/50 border border-slate-800"
                >
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              )}
              {profile.linkedin && (
                <a 
                  href={`https://${profile.linkedin}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-cyber-emerald transition-colors p-2 rounded-lg bg-slate-900/50 border border-slate-800"
                >
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}
              {profile.twitter && (
                <a 
                  href={`https://${profile.twitter}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-cyber-emerald transition-colors p-2 rounded-lg bg-slate-900/50 border border-slate-800"
                >
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#projects" 
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-emerald to-cyber-teal hover:shadow-glow-emerald hover:brightness-110 text-slate-950 font-bold text-sm tracking-wide transition-all"
              >
                <span>View Portfolio</span>
                <ArrowRight size={16} />
              </a>

              <a 
                href="#resume" 
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-cyber-emerald/50 hover:bg-slate-800/50 text-slate-200 font-semibold text-sm tracking-wide transition-all"
              >
                <FileText size={16} className="text-cyber-emerald" />
                <span>Resume Hub</span>
              </a>
            </div>

          </div>

          {/* Profile Interactive Avatar Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              
              {/* Outer rotating decorative mesh */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyber-emerald via-cyber-teal to-cyber-violet opacity-75 blur-md group-hover:opacity-100 group-hover:scale-105 transition duration-500 animate-pulse-slow" />
              
              {/* Background solid offset circle */}
              <div className="absolute inset-0 rounded-full bg-cyber-slate-950" />

              {/* Core Avatar frame */}
              <div className="relative w-56 sm:w-72 h-56 sm:h-72 rounded-full overflow-hidden border-4 border-cyber-slate-900 bg-cyber-slate-900 flex items-center justify-center shadow-2xl">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                ) : (
                  <span className="text-5xl font-black text-slate-700 select-none">
                    {profile.name ? profile.name.charAt(0) : "A"}
                  </span>
                )}
              </div>

              {/* Cyber floating badges */}
              <div className="absolute -bottom-2 -right-2 bg-cyber-slate-900/90 border border-slate-800 backdrop-blur px-3 py-1.5 rounded-lg shadow-xl text-2xs font-extrabold tracking-wide uppercase text-slate-100 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-ping" />
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
