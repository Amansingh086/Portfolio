import React from 'react';
import { Code, CheckCircle, Terminal, Layers, AppWindow } from 'lucide-react';

export default function Skills({ skills }) {
  
  // Dynamic icons helper for different categories
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <AppWindow size={16} className="text-cyber-emerald" />;
      case 'backend':
        return <Terminal size={16} className="text-cyber-teal" />;
      case 'cloud & devops':
      case 'tools':
        return <Layers size={16} className="text-cyber-violet" />;
      default:
        return <Code size={16} className="text-pink-500" />;
    }
  };

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-cyber-emerald/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-emerald font-sans">
            Technical Stack
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-100">
            Professional Skillsets
          </h3>
          <div className="w-12 h-1 bg-cyber-emerald rounded-full mx-auto" />
          <p className="text-slate-400 font-sans text-sm font-light leading-relaxed">
            A comprehensive overview of tools, languages, and technical frameworks I leverage to design robust, state-of-the-art architectures.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-6 rounded-2xl glass-card-hover border border-slate-800 bg-cyber-slate-900/40 relative overflow-hidden transition-all duration-300"
            >
              {/* Glass background gradient overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />

              {/* Header Category */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner flex items-center justify-center">
                  {getCategoryIcon(skillGroup.category)}
                </div>
                <h4 className="font-sans font-bold text-base text-slate-200 tracking-wide">
                  {skillGroup.category}
                </h4>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2.5">
                {skillGroup.list.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyber-slate-950/70 border border-slate-800/80 text-xs font-medium text-slate-350 hover:border-cyber-emerald/30 hover:text-cyber-emerald hover:bg-cyber-emerald/5 transition-all duration-300 group cursor-default"
                  >
                    <CheckCircle size={10} className="text-slate-500 group-hover:text-cyber-emerald transition-colors" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
