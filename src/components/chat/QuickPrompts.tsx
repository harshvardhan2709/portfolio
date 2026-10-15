import { Sparkles } from 'lucide-react';

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const PROMPTS = [
  { cmd: './projects', label: 'Top Projects', prompt: 'Tell me about Harshvardhan’s top projects and architecture.' },
  { cmd: './experience', label: 'Experience', prompt: 'What is Harshvardhan’s industry work experience and internships?' },
  { cmd: './skills', label: 'Tech Stack', prompt: 'What technologies, frameworks, and tools does he specialize in?' },
  { cmd: './blockchain', label: 'Web3 & Carbon', prompt: 'Tell me about his blockchain & carbon credit tokenization work.' },
  { cmd: './mobile', label: 'React Native', prompt: 'What mobile apps has he built using React Native and Expo?' },
  { cmd: './education', label: 'Education', prompt: 'What is his academic background, college, and CGPA?' },
  { cmd: 'cat resume.pdf', label: 'Resume', prompt: 'How can I download Harshvardhan’s resume?' },
  { cmd: './contact', label: 'Contact', prompt: 'Is Harshvardhan available for full-time roles and how can I contact him?' },
];

export const QuickPrompts = ({ onSelectPrompt, disabled }: QuickPromptsProps) => {
  return (
    <div className="py-2.5 px-3">
      <div className="flex items-center gap-1.5 mb-2 text-[11px] font-mono text-text-muted uppercase tracking-wider">
        <Sparkles size={11} className="text-accent-mint" />
        <span>Quick terminal commands:</span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar mask-fade-r">
        {PROMPTS.map((item, idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => onSelectPrompt(item.prompt)}
            className="group flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-bg-surface/90 hover:bg-bg-elevated border border-border/80 hover:border-accent-mint/50 text-text-secondary hover:text-text-primary transition-all duration-200 whitespace-nowrap active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm"
          >
            <span className="text-accent-mint/80 group-hover:text-accent-mint font-semibold">$</span>
            <span>{item.cmd}</span>
            <span className="text-[10px] text-text-muted group-hover:text-text-secondary border-l border-border pl-1.5 ml-0.5">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
