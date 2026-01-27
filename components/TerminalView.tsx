
import React, { useState, useEffect, useRef } from 'react';
import { CV_DATA, EXPERIENCES, PROJECTS } from '../constants';

interface TerminalViewProps {
  onClose: () => void;
}

const TerminalView: React.FC<TerminalViewProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'B_ALJAZZAR_OS [Version 1.2.0]',
    '(c) 2024 Bassam Engineering. All rights reserved.',
    '',
    'System Diagnostic: OK',
    'Sensors Status: ONLINE',
    'Type "help" to start system exploration.',
    ''
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    let response = '';

    switch (command) {
      case 'help':
        response = 'SUPPORTED COMMANDS:\n- about: Engineer summary\n- sys_info: Technical hardware profile\n- exp: Career timeline\n- projects: View deployed systems\n- patent: View US Intellectual Property\n- clear: Purge screen\n- exit: Terminate session';
        break;
      case 'about':
        response = CV_DATA.summary;
        break;
      case 'sys_info':
        response = `ENGINEER_ID: Bassam Walid\nEXPERTISE: Mechatronics, Robotics, Embedded Systems\nLOC_NODE: Abu Dhabi, UAE\nIP_PORTFOLIO: Patent US11573635`;
        break;
      case 'exp':
        response = EXPERIENCES.map(e => `[${e.period}] ${e.role} :: ${e.company}`).join('\n');
        break;
      case 'projects':
        response = PROJECTS.map(p => `>> ${p.title} [CAT: ${p.category}]`).join('\n');
        break;
      case 'patent':
        response = 'U.S. Patent 11573635: Face mask with integrated EMG sensors for touchless communication and health monitoring.';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      default:
        response = `ERROR: COMMAND "${command.toUpperCase()}" NOT RECOGNIZED.`;
    }

    setHistory(prev => [...prev, `bassam@kernel:~$ ${cmd}`, response, '']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-5xl h-[70vh] border border-primary/20 bg-black flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.1)]">
        <div className="bg-zinc-900 px-4 py-2 border-b border-primary/10 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
             </div>
             <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">System_Root/Bassam_Aljazzar</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-primary transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto text-primary/80 text-sm space-y-1">
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">{line}</div>
          ))}
          <div className="flex items-center gap-2 pt-2">
             <span className="text-primary/40 italic">bassam@kernel:~$</span>
             <form onSubmit={handleSubmit} className="flex-1">
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-primary caret-primary"
                />
             </form>
          </div>
        </div>
        <div className="px-4 py-2 bg-zinc-900/50 text-[9px] text-zinc-600 flex justify-between border-t border-primary/5">
           <span>CPU_USAGE: 12%</span>
           <span>RAM: 4.2GB / 16GB</span>
           <span>ENCRYPTION: AES-256</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalView;
