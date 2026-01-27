
import React, { useState, useEffect } from 'react';
import { CV_DATA, EXPERIENCES, PROJECTS, SKILL_MATRIX } from './constants';
import { PortfolioView, Project } from './types';
import TerminalView from './components/TerminalView';
import Assistant from './components/Assistant';

/**
 * Using a constant for the custom element to avoid global JSX namespace pollution
 */
// @ts-ignore
const SplineViewer = 'spline-viewer' as any;

const ProjectImageGallery: React.FC<{ images: string[], title: string }> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900">
      {images.map((img, idx) => (
        <div 
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={img} 
            className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-100 transition-all duration-1000" 
            alt={`${title} - view ${idx + 1}`} 
          />
        </div>
      ))}
      {/* HUD Overlay for Gallery */}
      <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 transition-all duration-500 ${idx === currentIndex ? 'w-6 bg-primary shadow-glow' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-bold text-4xl opacity-20 select-none pointer-events-none uppercase">
        {title}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<PortfolioView>(PortfolioView.MODERN);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'stats', 'experience', 'projects', 'skills', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5) {
            setActiveSection(id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'OVERVIEW', icon: 'home' },
    { id: 'stats', label: 'METRICS', icon: 'analytics' },
    { id: 'experience', label: 'TIMELINE', icon: 'history' },
    { id: 'projects', label: 'ARCHIVE', icon: 'rocket_launch' },
    { id: 'skills', label: 'STRIKE_FORCE', icon: 'bolt' },
    { id: 'contact', label: 'CHANNEL', icon: 'chat' },
  ];

  return (
    <div className="min-h-screen text-white selection:bg-primary/30 font-sans bg-dark">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <SplineViewer 
          url="https://prod.spline.design/eBO7I-xKw00YnaYL/scene.splinecode"
          loading-library="lazy"
          className="w-full h-full scale-125 lg:scale-110 opacity-40 lg:opacity-100"
        />
        <div className="absolute inset-0 bg-dark/80 lg:bg-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 lg:via-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
      </div>

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-[60] p-4 lg:p-6 lg:px-12 flex justify-between items-center bg-dark/40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="hud-border bg-panel/95 p-2 lg:p-3 flex items-center gap-3 lg:gap-4 shadow-2xl">
             <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-sm flex items-center justify-center font-bold text-dark italic text-xl lg:text-2xl shadow-[0_0_20px_#00F0FF]">B</div>
             <div className="flex flex-col leading-none">
                <span className="text-[8px] lg:text-[10px] font-mono font-bold text-primary tracking-tighter uppercase">Status: Online</span>
                <span className="text-[11px] lg:text-[13px] font-mono text-white font-bold uppercase tracking-widest">Bassam Al-Jazzar</span>
             </div>
          </div>
        </div>
        <button 
          onClick={() => setView(PortfolioView.TERMINAL)}
          className="hud-border bg-panel/95 px-4 lg:px-6 py-2 lg:py-3 text-[9px] lg:text-[11px] font-mono font-bold hover:text-primary transition-all flex items-center gap-2 lg:gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="hidden sm:inline">SYSTEM_ACCESS</span>
          <span className="sm:hidden">OS</span>
        </button>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] xl:hidden bg-dark/90 backdrop-blur-xl border-t border-white/10 p-2 flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex flex-col items-center p-2 transition-all ${activeSection === item.id ? 'text-primary' : 'text-zinc-500'}`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-[8px] font-mono font-bold mt-1 uppercase tracking-tighter">
              {item.label.split('_')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-[70] hidden xl:flex flex-col items-start pointer-events-none">
         <div className="flex flex-col gap-8 pointer-events-auto">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className={`side-link group flex flex-col items-start gap-2 transition-all text-left ${activeSection === item.id ? 'text-primary' : 'text-zinc-500'}`}
              >
                 <span className={`text-[11px] font-mono font-bold tracking-[0.25em] uppercase transition-all duration-300 ${activeSection === item.id ? 'opacity-100 translate-x-3 text-primary-glow' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-1'}`}>
                   {item.label}
                 </span>
                 <div className={`h-[3px] rounded-full transition-all duration-500 ${activeSection === item.id ? 'w-20 bg-primary shadow-[0_0_20px_#00F0FF]' : 'w-8 bg-zinc-800'}`}></div>
              </button>
            ))}
         </div>
      </aside>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 pb-24 lg:pb-0">
        
        {/* HERO */}
        <section id="hero" className="min-h-screen flex flex-col justify-center lg:w-3/5 pt-20">
          <div className="space-y-6 lg:space-y-10">
            <div className="inline-flex items-center gap-3 lg:gap-4 px-4 py-2 lg:px-5 lg:py-2.5 hud-border bg-panel/95 text-primary text-[10px] lg:text-[12px] font-mono font-bold tracking-[0.2em] lg:tracking-[0.3em] uppercase">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-ping"></span>
              Innovation Lead @ Tatweer MEA
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter leading-[1] text-white text-glow">
              BASSAM <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-[gradient_8s_ease_infinite] text-primary-glow">
                AL-JAZZAR
              </span>
            </h1>

            <p className="text-lg lg:text-2xl text-zinc-100 max-w-xl font-medium leading-relaxed bg-dark/40 backdrop-blur-sm p-4 rounded-lg border-l-4 border-primary/40">
              Strategic <span className="text-primary font-bold">Mechatronics Engineer</span>. 
              Specializing in Human-Robot Interaction, Embedded Systems, and AI-driven automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-6">
               <button 
                 onClick={() => window.open(CV_DATA.contact.linkedin, '_blank')}
                 className="hud-border bg-primary text-dark font-bold px-8 lg:px-10 py-4 lg:py-5 text-xs lg:text-sm hover:scale-105 transition-all shadow-lg uppercase tracking-widest flex items-center justify-center gap-3"
               >
                  <span className="material-symbols-outlined text-sm">download</span>
                  DOWNLOAD_CV
               </button>
               <button 
                 onClick={() => scrollToSection('contact')}
                 className="hud-border bg-panel/90 px-8 lg:px-10 py-4 lg:py-5 text-xs lg:text-sm text-white hover:text-primary transition-all font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-3 border-white/10"
               >
                  <span className="material-symbols-outlined text-sm">send</span>
                  CONTACT_ME
               </button>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section id="stats" className="py-16 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 lg:w-4/5">
             {CV_DATA.highlights.map((h, i) => (
               <div key={i} className="glass-panel p-6 lg:p-10 hud-border hover:bg-panel transition-all group border-white/5">
                  <span className="material-symbols-outlined text-3xl lg:text-5xl text-primary/70 mb-4 lg:mb-8">{h.icon}</span>
                  <div className="text-4xl lg:text-6xl font-bold mb-1 tracking-tighter text-white">{h.value}</div>
                  <div className="text-[10px] lg:text-xs font-mono text-zinc-300 font-bold uppercase tracking-widest">{h.label}</div>
                  <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-primary font-mono font-bold uppercase">{h.sub}</div>
               </div>
             ))}
          </div>
        </section>

        {/* PROJECTS / ARCHIVE */}
        <section id="projects" className="py-16 lg:py-32">
           <div className="flex items-center gap-4 lg:gap-6 mb-12 lg:mb-24">
              <h2 className="text-3xl lg:text-6xl font-bold italic tracking-tighter uppercase text-white">Archives</h2>
              <div className="h-[2px] lg:h-[3px] flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="hud-border glass-panel overflow-hidden group border-white/5 bg-panel/40 flex flex-col">
                   <div className="h-64 lg:h-96 relative group">
                      <ProjectImageGallery images={proj.images} title={proj.title} />
                      <div className="absolute top-4 right-4 z-30">
                         <span className="text-[10px] font-mono font-bold text-primary bg-dark/90 px-3 py-1 hud-border border-primary/40 uppercase tracking-widest">{proj.category}</span>
                      </div>
                   </div>
                   <div className="p-6 lg:p-10 flex-1 flex flex-col">
                      <h3 className="text-2xl lg:text-4xl font-bold mb-4 tracking-tighter text-white group-hover:text-primary transition-colors">{proj.title}</h3>
                      <p className="text-zinc-300 text-sm lg:text-base mb-8 leading-relaxed font-medium">{proj.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-auto mb-8">
                         {proj.stats?.map((s, idx) => (
                           <div key={idx} className="border-l-2 border-primary pl-4 py-1 bg-white/5">
                              <div className="text-[9px] text-zinc-400 font-mono font-bold uppercase mb-1">{s.label}</div>
                              <div className="text-lg font-bold font-mono text-white">{s.value}</div>
                           </div>
                         ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                         {proj.tags.map((t, i) => (
                           <span key={i} className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest px-2 py-1 bg-dark/50 border border-white/5">#{t}</span>
                         ))}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-16 lg:py-32">
           <div className="flex items-center gap-4 lg:gap-6 mb-12 lg:mb-24">
              <h2 className="text-3xl lg:text-6xl font-bold italic tracking-tighter uppercase text-white">Experience</h2>
              <div className="h-[2px] lg:h-[3px] flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
           </div>
           <div className="space-y-12 lg:space-y-20 lg:w-11/12">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="group relative pl-8 lg:pl-20 border-l border-zinc-800">
                   <div className="absolute left-[-5px] lg:left-[-8px] top-2 w-2.5 h-2.5 lg:w-4 lg:h-4 bg-zinc-800 group-hover:bg-primary transition-all shadow-glow"></div>
                   <div className="flex flex-col gap-2 mb-4 lg:mb-8">
                      <span className="text-primary font-mono font-bold text-[10px] tracking-widest bg-primary/10 w-fit px-3 py-1 hud-border border-primary/20">{exp.period}</span>
                      <h3 className="text-2xl lg:text-4xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                      <span className="text-zinc-400 font-mono text-xs font-bold uppercase">@ {exp.company}</span>
                   </div>
                   <div className="space-y-3 lg:space-y-5 lg:w-3/4">
                      {exp.description.map((d, j) => (
                        <p key={j} className="text-zinc-200 text-sm lg:text-lg leading-relaxed flex gap-3 lg:gap-5 bg-white/5 p-4 lg:p-5 rounded-lg border border-white/5">
                           <span className="text-primary font-bold">»</span> {d}
                        </p>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-16 lg:py-32">
           <div className="flex items-center gap-4 lg:gap-6 mb-12 lg:mb-24">
              <h2 className="text-3xl lg:text-6xl font-bold italic tracking-tighter uppercase text-white">Strike_Force</h2>
              <div className="h-[2px] lg:h-[3px] flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {SKILL_MATRIX.map((cat, i) => (
                <div key={i} className="hud-border p-6 lg:p-10 glass-panel border-white/5">
                   <div className="flex items-center gap-4 mb-6 lg:mb-10">
                      <span className="material-symbols-outlined text-primary text-2xl lg:text-4xl">{cat.icon}</span>
                      <h4 className="text-xs lg:text-sm font-mono font-bold text-white uppercase tracking-widest">{cat.title}</h4>
                   </div>
                   <div className="space-y-4 lg:space-y-6">
                      {cat.skills.map((s, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                           <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-zinc-200">{s}</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                           </div>
                           <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-primary shadow-glow" style={{ width: `${85 + Math.random() * 15}%` }}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* CONTACT */}
        <footer id="contact" className="py-24 lg:py-40 border-t-2 border-primary">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-8 lg:space-y-12">
                 <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter leading-none text-white">CONTACT <br/> BASSAM</h2>
                 <p className="text-lg lg:text-2xl text-zinc-200 max-w-lg font-medium leading-relaxed bg-white/5 p-6 rounded-lg border-l-4 border-primary">
                    Available for strategic engineering roles and innovation consultancy in the UAE.
                 </p>
                 <div className="flex flex-col gap-4">
                    <a href={CV_DATA.contact.linkedin} target="_blank" className="group flex items-center gap-4 text-zinc-300 hover:text-primary transition-all font-mono font-bold text-sm lg:text-lg no-underline">
                       <span className="w-8 lg:w-16 h-[2px] bg-zinc-800 group-hover:bg-primary"></span>
                       LINKEDIN
                    </a>
                    <a href={`mailto:${CV_DATA.contact.email}`} className="group flex items-center gap-4 text-zinc-300 hover:text-primary transition-all font-mono font-bold text-sm lg:text-lg no-underline">
                       <span className="w-8 lg:w-16 h-[2px] bg-zinc-800 group-hover:bg-primary"></span>
                       EMAIL_ME
                    </a>
                 </div>
              </div>
              
              <div className="hud-border p-6 lg:p-12 glass-panel bg-panel/95">
                 <div className="space-y-8 lg:space-y-12">
                    <div className="group">
                       <label className="text-[10px] font-mono text-primary font-bold uppercase block mb-2 tracking-[0.2em]">Network Node</label>
                       <div className="text-lg lg:text-3xl font-bold font-mono text-white tracking-tighter border-b border-white/10 pb-4">{CV_DATA.contact.email}</div>
                    </div>
                    <div className="group">
                       <label className="text-[10px] font-mono text-primary font-bold uppercase block mb-2 tracking-[0.2em]">Secure Line</label>
                       <div className="text-lg lg:text-3xl font-bold font-mono text-zinc-100 tracking-tighter border-b border-white/10 pb-4">{CV_DATA.contact.phone}</div>
                    </div>
                    <button className="w-full bg-primary text-dark py-4 lg:py-8 font-bold text-sm lg:text-lg uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
                       INITIATE_CONTACT
                    </button>
                 </div>
              </div>
           </div>
        </footer>

      </main>

      {/* Overlays */}
      {view === PortfolioView.TERMINAL && (
        <TerminalView onClose={() => setView(PortfolioView.MODERN)} />
      )}

      {/* Assistant Wrapper */}
      <div className="mb-20 sm:mb-0">
        <Assistant />
      </div>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
        }
      `}</style>
    </div>
  );
};

export default App;
