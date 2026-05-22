import { useState } from 'react';
import { X, Briefcase, User, Code, FolderGit2, RotateCcw, Plus, Trash2 } from 'lucide-react';

export default function ResumeDrawer({ isOpen, onClose, resumeData, setResumeData, resetToDefault }) {
  const [activeTab, setActiveTab] = useState('profile');

  if (!isOpen) return null;

  const handleProfileChange = (key, value) => {
    setResumeData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value
      }
    }));
  };

  const handleSkillChange = (catIdx, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[catIdx].list = value.split(',').map(s => s.trim()).filter(Boolean);
    setResumeData(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const handleSkillCategoryChange = (catIdx, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[catIdx].category = value;
    setResumeData(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const addSkillCategory = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: "New Category", list: ["Skill A", "Skill B"] }]
    }));
  };

  const deleteSkillCategory = (catIdx) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== catIdx)
    }));
  };

  const handleExperienceChange = (expId, key, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === expId ? { ...exp, [key]: value } : exp
      )
    }));
  };

  const handleExperienceBulletsChange = (expId, bulletsText) => {
    const bullets = bulletsText.split('\n').filter(b => b.trim() !== '');
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === expId ? { ...exp, description: bullets } : exp
      )
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: "New Job Role",
      company: "Company Name",
      duration: "2024 - Present",
      description: ["Developed core features.", "Improved load speeds."]
    };
    setResumeData(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
  };

  const deleteExperience = (expId) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== expId)
    }));
  };

  const handleProjectChange = (projId, key, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === projId ? { ...proj, [key]: value } : proj
      )
    }));
  };

  const handleProjectArrayChange = (projId, key, text) => {
    const items = text.split(',').map(t => t.trim()).filter(Boolean);
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === projId ? { ...proj, [key]: items } : proj
      )
    }));
  };

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "New Project",
      category: "Full Stack",
      description: "Brief summary of the application and its architectural value.",
      tech: ["React.js", "Tailwind CSS"],
      features: ["Responsive design."],
      liveUrl: "#",
      codeUrl: "#"
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const deleteProject = (projId) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== projId)
    }));
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-cyber-slate-900/95 backdrop-blur-lg border-l border-slate-800 shadow-2xl flex flex-col no-print transition-all duration-300 transform translate-x-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-cyber-slate-950/80">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
          <h2 className="font-semibold text-lg text-slate-100 font-sans tracking-wide">Live Customizer</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={resetToDefault} 
            title="Reset to default data"
            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-cyber-emerald transition-colors"
          >
            <RotateCcw size={16} />
          </button>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex bg-cyber-slate-950/40 border-b border-slate-800 text-xs font-semibold">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 px-2 flex flex-col items-center justify-center border-b-2 gap-1 transition-colors ${activeTab === 'profile' ? 'border-cyber-emerald text-cyber-emerald bg-cyber-emerald/5' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'}`}
        >
          <User size={14} />
          Profile
        </button>
        <button 
          onClick={() => setActiveTab('skills')}
          className={`flex-1 py-3 px-2 flex flex-col items-center justify-center border-b-2 gap-1 transition-colors ${activeTab === 'skills' ? 'border-cyber-emerald text-cyber-emerald bg-cyber-emerald/5' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'}`}
        >
          <Code size={14} />
          Skills
        </button>
        <button 
          onClick={() => setActiveTab('experience')}
          className={`flex-1 py-3 px-2 flex flex-col items-center justify-center border-b-2 gap-1 transition-colors ${activeTab === 'experience' ? 'border-cyber-emerald text-cyber-emerald bg-cyber-emerald/5' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'}`}
        >
          <Briefcase size={14} />
          Experience
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-3 px-2 flex flex-col items-center justify-center border-b-2 gap-1 transition-colors ${activeTab === 'projects' ? 'border-cyber-emerald text-cyber-emerald bg-cyber-emerald/5' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'}`}
        >
          <FolderGit2 size={14} />
          Projects
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin">
        
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-cyber-emerald font-medium uppercase text-xs tracking-wider border-b border-slate-800 pb-1">Personal Details</h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">Full Name</label>
                <input 
                  type="text" 
                  value={resumeData.profile.name} 
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-2 text-slate-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">Professional Title</label>
                <input 
                  type="text" 
                  value={resumeData.profile.title} 
                  onChange={(e) => handleProfileChange('title', e.target.value)}
                  className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-2 text-slate-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-medium">Short Bio / Overview</label>
                <textarea 
                  rows={4}
                  value={resumeData.profile.bio} 
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-2 text-slate-200 font-sans text-xs leading-relaxed resize-y transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Location</label>
                  <input 
                    type="text" 
                    value={resumeData.profile.location} 
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-1.5 text-slate-200 transition-all text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    value={resumeData.profile.email} 
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-1.5 text-slate-200 transition-all text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Phone Number</label>
                  <input 
                    type="text" 
                    value={resumeData.profile.phone} 
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-1.5 text-slate-200 transition-all text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">GitHub Account</label>
                  <input 
                    type="text" 
                    value={resumeData.profile.github} 
                    onChange={(e) => handleProfileChange('github', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-1.5 text-slate-200 transition-all text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">LinkedIn Link</label>
                  <input 
                    type="text" 
                    value={resumeData.profile.linkedin} 
                    onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-1.5 text-slate-200 transition-all text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Profile Image URL</label>
                  <input 
                    type="text" 
                    value={resumeData.profile.avatar} 
                    onChange={(e) => handleProfileChange('avatar', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-3 py-1.5 text-slate-200 transition-all text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <h3 className="text-cyber-emerald font-medium uppercase text-xs tracking-wider">Skills Categories</h3>
              <button 
                onClick={addSkillCategory}
                className="flex items-center space-x-1 text-xs text-cyber-emerald hover:text-emerald-400 transition-colors"
              >
                <Plus size={14} />
                <span>Add Category</span>
              </button>
            </div>
            {resumeData.skills.map((skillGroup, catIdx) => (
              <div key={catIdx} className="p-3 bg-cyber-slate-950/60 rounded border border-slate-800 space-y-2 relative group/item">
                <button 
                  onClick={() => deleteSkillCategory(catIdx)}
                  className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 transition-colors"
                  title="Delete category"
                >
                  <Trash2 size={14} />
                </button>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Category Name</label>
                  <input 
                    type="text" 
                    value={skillGroup.category} 
                    onChange={(e) => handleSkillCategoryChange(catIdx, e.target.value)}
                    className="w-3/4 bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1 text-slate-200 text-xs transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Skills (Comma-separated)</label>
                  <input 
                    type="text" 
                    value={skillGroup.list.join(', ')} 
                    onChange={(e) => handleSkillChange(catIdx, e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs transition-all font-sans"
                    placeholder="e.g. React, Next.js, Redux"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <h3 className="text-cyber-emerald font-medium uppercase text-xs tracking-wider">Work Experience</h3>
              <button 
                onClick={addExperience}
                className="flex items-center space-x-1 text-xs text-cyber-emerald hover:text-emerald-400 transition-colors"
              >
                <Plus size={14} />
                <span>Add Job</span>
              </button>
            </div>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-3 bg-cyber-slate-950/60 rounded border border-slate-800 space-y-3 relative group/item">
                <button 
                  onClick={() => deleteExperience(exp.id)}
                  className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 transition-colors"
                  title="Delete job"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-2 gap-2 pr-6">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Role / Title</label>
                    <input 
                      type="text" 
                      value={exp.role} 
                      onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                      className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1 text-slate-200 text-xs transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Company Name</label>
                    <input 
                      type="text" 
                      value={exp.company} 
                      onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                      className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1 text-slate-200 text-xs transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Timeline / Duration</label>
                  <input 
                    type="text" 
                    value={exp.duration} 
                    onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
                    className="w-1/2 bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1 text-slate-200 text-xs transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Responsibilities (one per line)</label>
                  <textarea 
                    rows={4}
                    value={exp.description.join('\n')} 
                    onChange={(e) => handleExperienceBulletsChange(exp.id, e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs font-sans leading-relaxed resize-y transition-all"
                    placeholder="Enter each achievement/bullet on a separate line"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <h3 className="text-cyber-emerald font-medium uppercase text-xs tracking-wider">Projects</h3>
              <button 
                onClick={addProject}
                className="flex items-center space-x-1 text-xs text-cyber-emerald hover:text-emerald-400 transition-colors"
              >
                <Plus size={14} />
                <span>Add Project</span>
              </button>
            </div>
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="p-3 bg-cyber-slate-950/60 rounded border border-slate-800 space-y-3 relative group/item">
                <button 
                  onClick={() => deleteProject(proj.id)}
                  className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 transition-colors"
                  title="Delete project"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-2 gap-2 pr-6">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Project Title</label>
                    <input 
                      type="text" 
                      value={proj.title} 
                      onChange={(e) => handleProjectChange(proj.id, 'title', e.target.value)}
                      className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1 text-slate-200 text-xs transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Category</label>
                    <input 
                      type="text" 
                      value={proj.category} 
                      onChange={(e) => handleProjectChange(proj.id, 'category', e.target.value)}
                      className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1 text-slate-200 text-xs transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Short Description</label>
                  <textarea 
                    rows={3}
                    value={proj.description} 
                    onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs font-sans leading-relaxed resize-y transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Tech Stack (Comma-separated)</label>
                  <input 
                    type="text" 
                    value={proj.tech.join(', ')} 
                    onChange={(e) => handleProjectArrayChange(proj.id, 'tech', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs transition-all font-sans"
                    placeholder="e.g. React.js, Tailwind, Node.js"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Key Features (Comma-separated)</label>
                  <input 
                    type="text" 
                    value={proj.features.join(', ')} 
                    onChange={(e) => handleProjectArrayChange(proj.id, 'features', e.target.value)}
                    className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2.5 py-1.5 text-slate-200 text-xs transition-all font-sans"
                    placeholder="e.g. Real-time updates, Drag-and-drop"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Live URL</label>
                    <input 
                      type="text" 
                      value={proj.liveUrl} 
                      onChange={(e) => handleProjectChange(proj.id, 'liveUrl', e.target.value)}
                      className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2 py-1 text-slate-200 text-xs transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Code Repository URL</label>
                    <input 
                      type="text" 
                      value={proj.codeUrl} 
                      onChange={(e) => handleProjectChange(proj.id, 'codeUrl', e.target.value)}
                      className="w-full bg-cyber-slate-950 border border-slate-800 focus:border-cyber-emerald focus:ring-1 focus:ring-cyber-emerald/30 outline-none rounded px-2 py-1 text-slate-200 text-xs transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
