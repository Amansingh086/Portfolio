import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ResumeHub from './components/ResumeHub';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeDrawer from './components/ResumeDrawer';
import { defaultResumeData } from './defaultResumeData';

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    // Always clear any old cached mock data and load Aman's real resume
    localStorage.removeItem('custom_resume_portfolio_data');
    return defaultResumeData;
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync resume edits to localStorage
  useEffect(() => {
    localStorage.setItem('custom_resume_portfolio_data', JSON.stringify(resumeData));
  }, [resumeData]);

  // Handle Dark/Light body class transitions
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset all your custom resume details to default mockup details?")) {
      setResumeData(defaultResumeData);
      localStorage.removeItem('custom_resume_portfolio_data');
    }
  };

  return (
    <div className="premium-app-shell relative min-h-screen font-sans antialiased text-slate-350 dark:text-slate-300 transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 z-0 premium-background" />
      
      {/* Floating Header */}
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        toggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
        name={resumeData.profile.name}
      />

      {/* Main Container */}
      <main className="relative z-10">
        <Hero profile={resumeData.profile} />
        
        <ResumeHub resumeData={resumeData} />
        
        <Skills skills={resumeData.skills} />
        
        <Projects projects={resumeData.projects} />
        
        <Contact profile={resumeData.profile} />
      </main>

      {/* Footer copyright and actions */}
      <div className="relative z-10">
        <Footer name={resumeData.profile.name} />
      </div>

      {/* Collapsible Edit Side Panel */}
      <ResumeDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        resumeData={resumeData}
        setResumeData={setResumeData}
        resetToDefault={resetToDefault}
      />
    </div>
  );
}
