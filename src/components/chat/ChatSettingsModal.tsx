import { useState, useEffect } from 'react';
import { X, ExternalLink, Eye, EyeOff, ShieldCheck, Check, RotateCcw, Cpu } from 'lucide-react';
import {
  getEffectiveApiKey,
  getSelectedModel,
  GROQ_CONFIG,
  setCustomApiKey,
  setSelectedModel,
} from '../../services/groqApi';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface ChatSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
  onSettingsSaved: () => void;
}

export const ChatSettingsModal = ({
  isOpen,
  onClose,
  onClearHistory,
  onSettingsSaved,
}: ChatSettingsModalProps) => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getEffectiveApiKey());
      setModel(getSelectedModel());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomApiKey(apiKey);
    setSelectedModel(model);
    setSavedSuccess(true);
    onSettingsSaved();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in touch-none overscroll-contain">
      <div className="relative w-full max-w-md bg-bg-surface border border-border rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden overscroll-contain">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-accent/20 border border-accent-mint/30 text-accent-mint">
              <Cpu size={18} />
            </span>
            <div>
              <h3 className="font-serif text-heading-sm text-text-primary">Groq AI Settings</h3>
              <p className="text-caption text-text-muted">High-speed inference powered by Groq LPUs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          {/* Model Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
              Groq Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl bg-bg-elevated border border-border text-text-primary focus:outline-none focus:border-accent-mint transition-colors"
            >
              {GROQ_CONFIG.supportedModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* API Key */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-text-muted">
                Groq API Key
              </label>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-accent-mint hover:underline"
              >
                <span>Get Free Key</span>
                <ExternalLink size={10} />
              </a>
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_xxxxxxxxxxxxxxxxxxxx..."
                className="w-full px-3 py-2 pr-10 text-sm font-mono rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-mint transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1"
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-text-muted leading-relaxed">
              Your key is read from the setting option provided in the chat modal, which is stored locally.
            </p>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-accent/5 border border-accent-mint/20 text-xs text-text-secondary">
            <ShieldCheck size={16} className="text-accent-mint flex-shrink-0" />
            <span>Serverless proxy protection. Your secret key is never leaked to visitors.</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => {
                if (confirm('Clear entire conversation history?')) {
                  onClearHistory();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <RotateCcw size={13} />
              <span>Reset Chat</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs rounded-xl border border-border text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-accent text-white hover:bg-accent-light shadow-sm transition-all duration-200"
              >
                {savedSuccess ? (
                  <>
                    <Check size={14} className="text-accent-mint" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Settings</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
