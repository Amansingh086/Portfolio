import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Printer, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function ResumeHub({ resumeData }) {
  const [activeSubTab, setActiveSubTab] = useState('timeline');
  const [expandedJob, setExpandedJob] = useState(resumeData.experience[0]?.id || null);

  const toggleJobExpansion = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="relative py-20 overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-[40%] left-[10%] w-[350px] h-[350px] rounded-full bg-cyber-teal/5 blur-3xl" />

      {/* Screen Interactive Wrapper (hidden during print, unless printing) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 no-print">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyber-emerald font-sans">
            Curriculum Vitae
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-100">
            Interactive Resume Hub
          </h3>
          <div className="w-12 h-1 bg-cyber-emerald rounded-full mx-auto" />
          <p className="text-slate-400 font-sans text-sm font-light leading-relaxed">
            Navigate through my professional progression timeline, credentials, or launch the optimized printing layout to save a hardcopy.
          </p>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex justify-center border-b border-slate-800/80 max-w-md mx-auto mb-10 text-xs sm:text-sm font-bold">
          <button 
            onClick={() => setActiveSubTab('timeline')}
            className={`flex-1 pb-4 flex items-center justify-center space-x-2 border-b-2 transition-all ${
              activeSubTab === 'timeline'
                ? 'border-cyber-emerald text-cyber-emerald'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase size={16} />
            <span>Timeline</span>
          </button>
          <button 
            onClick={() => setActiveSubTab('certifications')}
            className={`flex-1 pb-4 flex items-center justify-center space-x-2 border-b-2 transition-all ${
              activeSubTab === 'certifications'
                ? 'border-cyber-emerald text-cyber-emerald'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award size={16} />
            <span>Credentials</span>
          </button>
          <button 
            onClick={() => setActiveSubTab('print-preview')}
            className={`flex-1 pb-4 flex items-center justify-center space-x-2 border-b-2 transition-all ${
              activeSubTab === 'print-preview'
                ? 'border-cyber-emerald text-cyber-emerald'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Printer size={16} className="text-cyber-teal" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-emerald to-cyber-teal">Print Engine</span>
          </button>
        </div>

        {/* TAB 1: WORK TIMELINE */}
        {activeSubTab === 'timeline' && (
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Timeline Experience block */}
            <div className="space-y-8 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-4 top-2 bottom-2 w-0.5 timeline-line rounded opacity-40" />

              {resumeData.experience.map((exp, index) => {
                const isExpanded = expandedJob === exp.id;
                return (
                  <div key={exp.id} className="relative pl-12 group">
                    {/* Timeline Node circular marker */}
                    <div className={`absolute left-2.5 w-3.5 h-3.5 rounded-full border-2 border-cyber-slate-900 bg-cyber-emerald z-10 transition-transform duration-300 group-hover:scale-130 ${
                      isExpanded ? 'ring-4 ring-cyber-emerald/20 scale-120' : ''
                    }`} />

                    <div 
                      onClick={() => toggleJobExpansion(exp.id)}
                      className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-cyber-slate-900/25 hover:bg-cyber-slate-900/40 transition-all cursor-pointer select-none space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-sans font-bold text-base text-slate-200 group-hover:text-cyber-emerald transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-xs text-slate-400 font-sans">{exp.company}</p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-850 text-3xs font-extrabold tracking-wide uppercase text-slate-350 font-mono">
                            {exp.duration}
                          </span>
                          {isExpanded ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                        </div>
                      </div>

                      {/* Expandable detailed content */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-850 space-y-2 animate-pulse-slow">
                          {exp.description.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start space-x-2 text-xs text-slate-450 leading-relaxed font-sans font-light">
                              <span className="text-cyber-emerald mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyber-emerald" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Academic Section */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div className="space-y-6 pt-6">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <GraduationCap size={18} className="text-cyber-emerald" />
                  <h4 className="font-sans font-bold text-lg text-slate-200 tracking-wide">Academic Background</h4>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="glass-panel p-5 rounded-2xl border border-slate-800/80 bg-cyber-slate-900/15">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h5 className="font-sans font-bold text-sm text-slate-200">{edu.degree}</h5>
                          <p className="text-xs text-slate-450 font-sans">{edu.school}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-3xs font-extrabold text-cyber-emerald font-mono uppercase bg-cyber-emerald/10 border border-cyber-emerald/20 px-2 py-0.5 rounded-md">
                            {edu.duration}
                          </span>
                          <p className="text-4xs text-slate-500 font-mono mt-1">{edu.grade}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CERTIFICATIONS */}
        {activeSubTab === 'certifications' && (
          <div className="max-w-3xl mx-auto">
            {resumeData.certifications && resumeData.certifications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {resumeData.certifications.map((cert) => (
                  <div 
                    key={cert.id}
                    className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-cyber-slate-900/25 glass-card-hover flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-cyber-violet">
                        <Award size={18} />
                      </div>
                      <div>
                        <h5 className="font-sans font-bold text-sm text-slate-200 leading-snug">{cert.title}</h5>
                        <p className="text-2xs text-slate-450 font-sans">{cert.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-850/80 pt-4 mt-4">
                      <span className="text-3xs font-bold text-slate-500 font-mono">{cert.date}</span>
                      <a 
                        href={cert.url} 
                        className="inline-flex items-center space-x-1 text-2xs font-extrabold text-cyber-emerald hover:underline"
                      >
                        <span>Verify Credential</span>
                        <ArrowRight size={10} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 font-sans text-sm">No certifications listed currently.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRINT INTERACTIVE VIEW PREVIEW */}
        {activeSubTab === 'print-preview' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Instruction Panel */}
            <div className="glass-panel p-5 rounded-2xl border border-cyber-emerald/20 bg-cyber-emerald/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h5 className="font-sans font-bold text-sm text-cyber-emerald">Engineered PDF Rendering Layout</h5>
                <p className="text-2xs text-slate-400 font-sans max-w-md font-light leading-relaxed">
                  The document model layout displayed below is compiled using strict print styles. Click the button to trigger your system's print utility and export as a PDF.
                </p>
              </div>
              <button 
                onClick={triggerPrint}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-emerald to-cyber-teal hover:shadow-glow-emerald text-slate-950 font-bold text-xs tracking-wide transition-all"
              >
                <Printer size={14} />
                <span>Trigger Print Utility</span>
              </button>
            </div>

            {/* Document preview viewport wrapper */}
            <div className="w-full bg-slate-900/30 border border-slate-800 p-4 sm:p-8 rounded-2xl overflow-x-auto shadow-inner">
              <div className="w-full min-w-[650px] bg-white text-slate-800 p-8 rounded shadow-2xl font-sans text-left text-xs leading-relaxed leading-normal border border-slate-300">
                
                {/* Header Profile */}
                <div className="border-b-2 border-slate-800 pb-4 flex justify-between items-end">
                  <div className="space-y-1.5">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 font-sans">{resumeData.profile.name}</h1>
                    <h2 className="text-xs font-bold text-slate-600 font-sans tracking-wide uppercase">{resumeData.profile.title}</h2>
                    <p className="text-slate-500 text-3xs max-w-lg leading-relaxed font-light">{resumeData.profile.bio}</p>
                  </div>
                  <div className="text-right text-3xs text-slate-500 font-mono space-y-0.5">
                    <div>{resumeData.profile.location}</div>
                    <div>{resumeData.profile.email}</div>
                    <div>{resumeData.profile.phone}</div>
                    <div>{resumeData.profile.github}</div>
                  </div>
                </div>

                {/* Main section partitions */}
                <div className="grid grid-cols-12 gap-6 pt-4">
                  
                  {/* Left Column: Experience */}
                  <div className="col-span-8 space-y-4">
                    
                    <div className="space-y-3">
                      <h3 className="text-2xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">Professional Experience</h3>
                      
                      <div className="space-y-4">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id} className="space-y-1">
                            <div className="flex justify-between items-center text-3xs font-bold">
                              <span className="text-slate-900 font-sans text-2xs">{exp.role}</span>
                              <span className="text-slate-500 font-mono">{exp.duration}</span>
                            </div>
                            <div className="text-4xs text-slate-500 font-bold">{exp.company}</div>
                            <ul className="list-disc pl-4 space-y-0.5 pt-1 text-slate-600 font-light text-4xs leading-relaxed">
                              {exp.description.map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Skills, Education, Certs */}
                  <div className="col-span-4 space-y-4">
                    
                    {/* Skills */}
                    <div className="space-y-2">
                      <h3 className="text-2xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">Skills Matrix</h3>
                      <div className="space-y-2">
                        {resumeData.skills.map((skillGroup, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="text-4xs font-bold text-slate-800 uppercase tracking-wide">{skillGroup.category}</div>
                            <p className="text-4xs text-slate-600 font-light font-sans leading-tight">
                              {skillGroup.list.join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    {resumeData.education && resumeData.education.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <h3 className="text-2xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">Education</h3>
                        {resumeData.education.map((edu) => (
                          <div key={edu.id} className="space-y-0.5 text-4xs">
                            <div className="font-bold text-slate-800">{edu.degree}</div>
                            <div className="text-slate-600 font-light">{edu.school}</div>
                            <div className="text-slate-500 font-mono flex items-center justify-between">
                              <span>{edu.duration}</span>
                              <span>{edu.grade}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Credentials */}
                    {resumeData.certifications && resumeData.certifications.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <h3 className="text-2xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">Credentials</h3>
                        <div className="space-y-1.5">
                          {resumeData.certifications.map((cert) => (
                            <div key={cert.id} className="text-4xs space-y-0.5 leading-normal">
                              <div className="font-bold text-slate-800">{cert.title}</div>
                              <div className="text-slate-500 flex justify-between font-mono">
                                <span>{cert.provider}</span>
                                <span>{cert.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* RAW STATIC PRINT BLOCK (Completely hidden on screen, displays ONLY during window.print()) */}
      <div className="hidden print:block absolute inset-0 bg-white text-slate-850 p-6 sm:p-12 font-sans text-xs leading-normal">
        
        {/* Print Header */}
        <div className="border-b-2 border-slate-850 pb-4 flex justify-between items-end print-card">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{resumeData.profile.name}</h1>
            <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wide">{resumeData.profile.title}</h2>
            <p className="text-slate-550 text-4xs max-w-2xl font-light">{resumeData.profile.bio}</p>
          </div>
          <div className="text-right text-4xs text-slate-500 font-mono leading-relaxed">
            <div>{resumeData.profile.location}</div>
            <div>{resumeData.profile.email}</div>
            <div>{resumeData.profile.phone}</div>
            <div>{resumeData.profile.github}</div>
          </div>
        </div>

        {/* Print Content Panels */}
        <div className="grid grid-cols-12 gap-8 pt-6 print-grid">
          
          {/* Left Panel */}
          <div className="col-span-8 space-y-6 print-card">
            
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">Professional Experience</h3>
              
              <div className="space-y-5">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-center text-3xs font-bold">
                      <span className="text-slate-900 text-2xs">{exp.role}</span>
                      <span className="text-slate-500 font-mono">{exp.duration}</span>
                    </div>
                    <div className="text-4xs text-slate-550 font-bold">{exp.company}</div>
                    <ul className="list-disc pl-4 space-y-1 pt-1 text-slate-600 font-light text-4xs">
                      {exp.description.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel */}
          <div className="col-span-4 space-y-6 print-card">
            
            {/* Skills */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">Skills Matrix</h3>
              <div className="space-y-2">
                {resumeData.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-4xs font-bold text-slate-800 uppercase tracking-wide">{skillGroup.category}</div>
                    <p className="text-4xs text-slate-600 font-light leading-tight">
                      {skillGroup.list.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">Education</h3>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="space-y-1 text-4xs">
                    <div className="font-bold text-slate-800">{edu.degree}</div>
                    <div className="text-slate-600 font-light">{edu.school}</div>
                    <div className="text-slate-500 font-mono flex items-center justify-between">
                      <span>{edu.duration}</span>
                      <span>{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Credentials */}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">Credentials</h3>
                <div className="space-y-2">
                  {resumeData.certifications.map((cert) => (
                    <div key={cert.id} className="text-4xs space-y-0.5">
                      <div className="font-bold text-slate-800">{cert.title}</div>
                      <div className="text-slate-500 flex justify-between font-mono">
                        <span>{cert.provider}</span>
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}
