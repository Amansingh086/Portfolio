import { useState } from 'react';
import { ExternalLink, Layers, ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Projects({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Extract unique categories from projects
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Filter projects based on selection
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyber-violet/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-emerald font-sans">
            My Portfolio
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-100">
            Featured Projects
          </h3>
          <div className="w-12 h-1 bg-cyber-emerald rounded-full mx-auto" />
          <p className="text-slate-400 font-sans text-sm font-light leading-relaxed">
            A curated showcase of applications I have built, displaying product engineering, architecture structure, and interface designs.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 font-sans tracking-wide ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyber-emerald to-cyber-teal text-slate-950 hover:brightness-110 shadow-glow-emerald'
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group glass-panel bg-cyber-slate-900/35 border border-slate-800/90 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-glow-violet transition-all duration-300 flex flex-col justify-between"
            >
              {/* Dynamic decorative illustration block */}
              <div className="h-44 relative bg-gradient-to-br from-cyber-slate-950 via-cyber-slate-900 to-slate-950 p-6 flex flex-col justify-between overflow-hidden border-b border-slate-800/80">
                {/* Floating graphic grids */}
                <div className="absolute inset-0 bg-[radial-gradient(#8080800d_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-tr from-cyber-emerald/10 to-cyber-violet/10 blur-xl group-hover:scale-125 transition-transform duration-500" />
                
                {/* Upper Tag */}
                <div className="inline-flex max-w-fit items-center space-x-1.5 px-2.5 py-1 rounded bg-cyber-violet/10 border border-cyber-violet/20 text-3xs font-extrabold text-cyber-violet uppercase tracking-wide">
                  <Layers size={10} />
                  <span>{project.category}</span>
                </div>

                {/* Simulated IDE terminal graphics */}
                <div className="relative text-3xs text-slate-500 font-mono space-y-1">
                  <div>$ init --source {project.title.toLowerCase().replace(' ', '-')}</div>
                  <div className="text-cyber-emerald font-semibold">✓ Architecture loaded successfully</div>
                </div>

                {/* Reveal Arrow hover indicator */}
                <div className="absolute top-4 right-4 p-2 rounded-lg bg-cyber-slate-950/80 border border-slate-800/40 text-slate-400 group-hover:text-cyber-emerald group-hover:scale-115 transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              {/* Core card details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-sans font-bold text-lg text-slate-200 group-hover:text-cyber-emerald transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-slate-400 font-sans text-xs font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.slice(0, 3).map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded text-3xs font-medium bg-slate-900 border border-slate-800/80 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-3xs font-medium bg-slate-900 border border-slate-800/80 text-slate-500">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 font-sans text-sm">No projects found in this category.</p>
          </div>
        )}

      </div>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-cyber-slate-950/90 backdrop-blur-md no-print">
          <div className="glass-panel w-full max-w-2xl bg-cyber-slate-900/95 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative animate-float-fast max-h-[90vh]">
            
            {/* Upper Banner */}
            <div className="p-6 bg-gradient-to-r from-cyber-slate-950 via-cyber-slate-900 to-cyber-slate-950 border-b border-slate-800/80 relative flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles size={16} className="text-cyber-emerald" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                  Project Deep-Dive
                </span>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Core Scrollable content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1 scrollbar-thin">
              
              {/* Title & Category */}
              <div className="space-y-1">
                <div className="text-2xs font-extrabold uppercase tracking-widest text-cyber-emerald">
                  {selectedProject.category}
                </div>
                <h3 className="text-2xl font-black font-sans text-slate-100">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-350 leading-relaxed font-sans font-light text-sm">
                {selectedProject.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-slate-300 font-sans tracking-wide">
                  Architectural Deliverables & Features
                </h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-400 font-sans font-light">
                      <CheckCircle2 size={14} className="text-cyber-emerald mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete Tech Stack */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-slate-300 font-sans tracking-wide">
                  Engineered Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-cyber-slate-950/80 border border-slate-800 text-slate-300 font-sans"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Action Bar */}
            <div className="p-4 bg-cyber-slate-950/80 border-t border-slate-800/80 flex items-center justify-end space-x-3">
              {selectedProject.codeUrl && (
                <a 
                  href={selectedProject.codeUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-slate-850 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 text-slate-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>Repository</span>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyber-emerald to-cyber-teal hover:brightness-110 text-slate-950 transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Launch App</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
