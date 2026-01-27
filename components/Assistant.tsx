
import React, { useState } from 'react';
import { chatWithAssistant } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const botMsg = await chatWithAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botMsg }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[80]">
      {isOpen ? (
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-primary/20 rounded-2xl w-[85vw] sm:w-80 h-[60vh] sm:h-96 flex flex-col shadow-2xl overflow-hidden transition-all">
          <div className="p-4 bg-primary text-dark flex justify-between items-center font-bold">
            <span className="flex items-center gap-2 text-sm">
               <span className="material-symbols-outlined text-base">smart_toy</span>
               AI ASSISTANT
            </span>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70 text-xl leading-none">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            <div className="bg-zinc-800/50 p-3 rounded-lg text-zinc-300 border border-white/5">
              Hello! I'm Bassam's AI assistant. How can I help you today?
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-primary text-dark font-medium shadow-lg' : 'bg-zinc-800 text-zinc-300 border border-white/5'}`}>
                  {m.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-primary/60 italic animate-pulse flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">sync</span>
              THINKING...
            </div>}
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2 bg-dark/50">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-zinc-800 border-none rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-primary outline-none"
            />
            <button onClick={handleSend} className="bg-primary text-dark rounded-lg px-3 py-2 hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-full flex items-center justify-center text-dark shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined text-xl sm:text-2xl font-bold">smart_toy</span>
        </button>
      )}
    </div>
  );
};

export default Assistant;
