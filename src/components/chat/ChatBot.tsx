import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  Settings,
  Trash2,
  StopCircle,
  Bot,
  ArrowDown,
  Terminal,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { QuickPrompts } from './QuickPrompts';
import { ChatSettingsModal } from './ChatSettingsModal';
import {
  getEffectiveApiKey,
  getSelectedModel,
  streamChatResponse,
  GROQ_CONFIG,
} from '../../services/groqApi';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

const STORAGE_CHAT_KEY = 'portfolio_chat_messages_v2';

const INITIAL_MESSAGE: ChatMessageType = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `Hello! 👋 I'm **AI Assistant**, powered by **Groq** high-speed LPUs. 

I have full context on Harshvardhan's engineering background, projects, work, and technical stack.

> ⏱️ **Note to users:** Please wait **5–8 seconds** after each prompt to avoid free API rate limits and ensure smooth streaming.

How can I help you explore his work today?`,
  timestamp: Date.now(),
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Prevent background scrolling when terminal/chat is open
  useLockBodyScroll(isOpen);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [messages, setMessages] = useState<ChatMessageType[]>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_CHAT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore sessionStorage parsing error
    }
    return [INITIAL_MESSAGE];
  });
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(true);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync api key presence
  const refreshConfig = () => {
    setHasApiKey(Boolean(getEffectiveApiKey()));
  };

  useEffect(() => {
    refreshConfig();
    const timer = setTimeout(() => setShowWelcomeTooltip(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  // Cooldown timer interval to count down 5-8 second rate limit window
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCooldownSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  // Listen for Escape key to close terminal
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSettingsOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, isSettingsOpen]);

  // Save messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Scroll to bottom on new message
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
      if (window.innerWidth > 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 60;
    setShowScrollBottom(!isAtBottom);
  };

  const handleSendMessage = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isStreaming) return;

    setShowWelcomeTooltip(false);
    setInput('');

    const userMessage: ChatMessageType = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    const assistantMsgId = `ast-${Date.now()}`;
    const initialAssistantMsg: ChatMessageType = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    };

    const updatedHistory = [...messages, userMessage];
    setMessages([...updatedHistory, initialAssistantMsg]);
    setIsStreaming(true);

    abortControllerRef.current = new AbortController();

    try {
      await streamChatResponse({
        messages: updatedHistory,
        onChunk: (accumulated) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
            )
          );
        },
        signal: abortControllerRef.current.signal,
      });
    } catch (err: unknown) {
      if ((err as Error)?.name !== 'AbortError') {
        console.error('Chat error:', err);
      }
    } finally {
      setIsStreaming(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg
        )
      );
      abortControllerRef.current = null;
      setCooldownSeconds(7);
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_MESSAGE]);
    sessionStorage.removeItem(STORAGE_CHAT_KEY);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const modelId = getSelectedModel();
  const currentModelName = GROQ_CONFIG.supportedModels.find((m) => m.id === modelId)?.name || modelId;

  return (
    <>
      {/* Floating launcher trigger at bottom right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
        {/* Welcome Tooltip / Notification */}
        <AnimatePresence>
          {!isOpen && showWelcomeTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto mb-3 max-w-xs p-3 rounded-2xl bg-bg-surface/95 border border-accent-mint/30 shadow-2xl backdrop-blur-md text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 font-medium text-text-primary">
                  <Sparkles size={14} className="text-accent-mint animate-pulse" />
                  <span>Launch Groq AI Terminal</span>
                </div>
                <button
                  onClick={() => setShowWelcomeTooltip(false)}
                  className="text-text-muted hover:text-text-primary p-0.5"
                  aria-label="Dismiss tooltip"
                >
                  <X size={13} />
                </button>
              </div>
              <p className="mt-1 text-text-secondary leading-snug text-[11.5px]">
                Click to open Harshvardhan’s interactive Groq AI terminal.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Launcher Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowWelcomeTooltip(false);
          }}
          className={`pointer-events-auto relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${isOpen
            ? 'w-14 h-14 bg-bg-surface border border-accent-mint text-text-primary shadow-glow-sm'
            : 'w-14 h-14 bg-gradient-to-tr from-accent to-accent-light text-white shadow-glow hover:shadow-glow-sm'
            }`}
          aria-label={isOpen ? 'Close AI terminal' : 'Open AI terminal'}
        >
          {isOpen ? (
            <X size={22} className="transition-transform duration-200" />
          ) : (
            <>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent-mint rounded-full border-2 border-bg-primary animate-pulse" />
              <div className="relative">
                <Terminal size={22} className="text-white" />
                <Sparkles size={11} className="absolute -top-1 -right-1.5 text-accent-mint" />
              </div>
            </>
          )}
        </motion.button>
      </div>

      {/* Blurred Backdrop & Large Floating Terminal Component */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred Background Overlay that dims & blurs the entire site */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/65 backdrop-blur-lg touch-none"
              aria-hidden="true"
            />

            {/* Centered Large Floating Terminal Window */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 pointer-events-none overscroll-contain">
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className={`pointer-events-auto relative flex flex-col rounded-2xl sm:rounded-3xl terminal-glass overflow-hidden overscroll-contain transition-all duration-300 ${isMaximized
                  ? 'w-full h-full max-w-[97vw] max-h-[96vh]'
                  : 'w-full max-w-4xl lg:max-w-5xl h-[88vh] sm:h-[84vh]'
                  }`}
              >
                {/* Terminal Window Header with macOS Traffic Lights & Title Bar */}
                <header className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-border/60 bg-bg-surface/40 select-none touch-none">
                  {/* Left: Traffic light control dots */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="group w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                      title="Close terminal (Esc)"
                      aria-label="Close terminal"
                    >
                      <X size={8} className="text-[#4c0000] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button
                      onClick={handleClearHistory}
                      className="group w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                      title="Clear terminal history"
                      aria-label="Clear terminal"
                    >
                      <span className="text-[#5c3e00] text-[9px] font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity">−</span>
                    </button>
                    <button
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="group w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                      title={isMaximized ? 'Restore size' : 'Maximize terminal'}
                      aria-label={isMaximized ? 'Restore size' : 'Maximize terminal'}
                    >
                      <span className="text-[#004d10] text-[8px] font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                    </button>
                  </div>

                  {/* Center: Terminal Tab & Status */}
                  <div className="flex items-center gap-2.5 px-3 py-1 rounded-xl bg-bg-elevated/50 border border-border/50">
                    <Terminal size={14} className="text-accent-mint" />
                    <span className="font-mono text-xs text-text-primary tracking-wide">
                      harshvardhan@groq-terminal: ~ (bash)
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-accent/20 border border-accent-mint/30 text-accent-mint uppercase font-semibold">
                      Groq LPU
                    </span>
                  </div>

                  {/* Right: Window Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="hidden sm:flex p-1.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
                      title={isMaximized ? 'Restore size' : 'Maximize window'}
                      aria-label={isMaximized ? 'Restore size' : 'Maximize window'}
                    >
                      {isMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                    </button>
                    <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="p-1.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
                      title="Groq Settings (API Key / Model)"
                      aria-label="Settings"
                    >
                      <Settings size={15} />
                    </button>
                    <button
                      onClick={handleClearHistory}
                      className="p-1.5 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Clear terminal buffer"
                      aria-label="Clear chat"
                    >
                      <Trash2 size={15} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
                      title="Close (Esc)"
                      aria-label="Close terminal"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </header>

                {/* Subheader Terminal Banner */}
                <div className="px-4 sm:px-6 py-2 border-b border-border/40 bg-bg-elevated/20 flex items-center justify-between font-mono text-[11px] text-text-muted touch-none">
                  <div className="flex items-center gap-2">
                    <span className="text-accent-mint font-semibold">System:</span>
                    <span className="truncate">Harshvardhan Sawant Portfolio Engine v2.0 • Groq LPU</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-3">
                    <span>Model: <span className="text-text-secondary">{hasApiKey ? currentModelName : 'Local Grounding'}</span></span>
                    <span className="text-border">|</span>
                    <span>ESC to exit</span>
                  </div>
                </div>

                {/* Message Stream Body */}
                <div
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 select-text font-sans scroll-smooth"
                >
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}

                  {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
                    <div className="flex items-center gap-2.5 my-3 text-xs text-text-muted font-mono animate-pulse">
                      <Bot size={15} className="text-accent-mint" />
                      <span>❯ Groq executing query and streaming response...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Scroll-to-bottom Floating Button */}
                {showScrollBottom && (
                  <button
                    onClick={() => scrollToBottom('smooth')}
                    className="absolute right-6 bottom-36 p-2 rounded-full bg-bg-surface/90 border border-border shadow-lg text-text-muted hover:text-text-primary transition-all duration-200 hover:scale-105"
                    title="Scroll to latest output"
                    aria-label="Scroll to bottom"
                  >
                    <ArrowDown size={15} />
                  </button>
                )}


                {/* Terminal Command Quick Chips */}
                <div className="border-b border-border/40 bg-bg-primary/25 backdrop-blur-md">
                  <QuickPrompts
                    disabled={isStreaming}
                    onSelectPrompt={(prompt) => handleSendMessage(prompt)}
                  />
                </div>

                {/* Terminal Input Command Line */}
                <div className="p-3.5 sm:p-4 border-t border-border/60 bg-bg-surface/40 backdrop-blur-xl">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(input);
                    }}
                    className="relative flex items-center gap-2"
                  >
                    {/* Prompt Prefix */}
                    <div className="hidden sm:flex items-center gap-1 font-mono text-xs text-accent-mint flex-shrink-0 select-none pl-1">
                      <span>guest@portfolio:~$</span>
                    </div>

                    <div className="relative flex-1">
                      <textarea
                        ref={inputRef}
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a query or terminal command (e.g. 'What are your top projects?')..."
                        className="w-full max-h-32 min-h-[44px] px-3.5 py-2.5 text-sm font-sans rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-mint resize-none transition-colors"
                      />
                    </div>

                    {isStreaming ? (
                      <button
                        type="button"
                        onClick={handleStopStreaming}
                        className="h-[44px] px-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-colors flex items-center gap-1.5 text-xs font-mono flex-shrink-0 shadow-sm"
                        title="Cancel execution"
                        aria-label="Cancel execution"
                      >
                        <StopCircle size={17} />
                        <span className="hidden sm:inline">Stop</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!input.trim()}
                        className="h-[44px] px-4 sm:px-5 rounded-xl bg-accent hover:bg-accent-light text-white disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5 text-xs font-medium flex-shrink-0 shadow-sm"
                        title="Send query"
                        aria-label="Send query"
                      >
                        <Send size={15} />
                        <span className="hidden sm:inline">Run</span>
                      </button>
                    )}
                  </form>

                  {/* Terminal Footer Info */}
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-text-muted font-mono px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
                      <span>Press <kbd className="px-1 py-0.5 rounded bg-bg-elevated border border-border text-[10px] text-text-secondary">Enter ↵</kbd> to execute • <kbd className="px-1 py-0.5 rounded bg-bg-elevated border border-border text-[10px] text-text-secondary">Esc</kbd> to close</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-accent-mint">⏱️</span>
                      <span>
                        <strong className="text-text-primary">NOTE:</strong> Please wait <span className="text-accent-mint font-semibold">5–8 seconds</span> after each prompt to avoid free API rate limits.
                      </span>

                      {/* Rate limit note alert */}
                      <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-bg-elevated/40 border-t border-b border-border/60 text-[11px] font-mono text-text-secondary select-none">
                        {cooldownSeconds > 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-accent/20 border border-accent-mint/30 text-accent-mint text-[10px] font-semibold animate-pulse flex-shrink-0">
                            Wait: {cooldownSeconds}s
                          </span>
                        ) : (
                          <span className="hidden sm:inline-flex text-[10px] text-text-muted items-center gap-1.5 flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" /> Ready
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <ChatSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onClearHistory={handleClearHistory}
        onSettingsSaved={refreshConfig}
      />
    </>
  );
};

export default ChatBot;
