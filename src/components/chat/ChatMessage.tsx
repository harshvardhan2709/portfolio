import { useState } from 'react';
import { Copy, Check, Volume2, VolumeX, Bot, User, ExternalLink, Download } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const isAssistant = message.role === 'assistant';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    // Strip markdown formatting for cleaner audio speech
    const cleanText = message.content
      .replace(/[*_~`#>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Simple and safe markdown formatter for bold, italics, links, lists, code, and blockquotes
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');

    return lines.map((line, lineIdx) => {
      // Empty line -> spacing
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        const quoteText = line.replace(/^>\s*/, '');
        return (
          <blockquote
            key={lineIdx}
            className="my-1.5 pl-3 py-1 border-l-2 border-accent-mint/60 bg-accent/5 rounded-r text-xs text-text-muted italic leading-relaxed"
          >
            {formatInlineText(quoteText)}
          </blockquote>
        );
      }

      // Unordered list item
      if (/^[-*]\s/.test(line)) {
        const listText = line.replace(/^[-*]\s+/, '');
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 text-sm leading-relaxed">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-mint mt-2 flex-shrink-0" />
            <div className="flex-1">{formatInlineText(listText)}</div>
          </div>
        );
      }

      // Ordered list item
      const numMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 text-sm leading-relaxed">
            <span className="font-mono text-xs text-accent-mint font-semibold flex-shrink-0 mt-0.5">
              {numMatch[1]}.
            </span>
            <div className="flex-1">{formatInlineText(numMatch[2])}</div>
          </div>
        );
      }

      // Regular paragraph
      return (
        <p key={lineIdx} className="my-1 text-sm leading-relaxed">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  // Helper for inline markdown: bold, code, links
  const formatInlineText = (text: string) => {
    // Regex matches [label](url), `code`, and **bold**
    const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);

    return tokens.map((token, idx) => {
      if (!token) return null;

      // Link: [text](url)
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        const isPdf = url.endsWith('.pdf');
        return (
          <a
            key={idx}
            href={url}
            target={isPdf ? '_self' : '_blank'}
            rel="noopener noreferrer"
            download={isPdf ? true : undefined}
            className="inline-flex items-center gap-1 text-accent-mint font-medium hover:underline underline-offset-2 break-all"
          >
            <span>{label}</span>
            {isPdf ? <Download size={11} /> : <ExternalLink size={11} />}
          </a>
        );
      }

      // Bold: **text**
      if (token.startsWith('**') && token.endsWith('**')) {
        return (
          <strong key={idx} className="font-semibold text-text-primary">
            {token.slice(2, -2)}
          </strong>
        );
      }

      // Code: `code`
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 mx-0.5 text-xs font-mono rounded bg-bg-primary/80 border border-border text-accent-mint"
          >
            {token.slice(1, -1)}
          </code>
        );
      }

      return token;
    });
  };

  return (
    <div
      className={`group flex items-start gap-2.5 my-3 ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {isAssistant && (
        <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 bg-accent/20 border border-accent-mint/30 text-accent-mint shadow-sm">
          <Bot size={15} />
        </div>
      )}

      <div className={`max-w-[95%] sm:max-w-[88%] lg:max-w-[82%] flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}>
        <div
          className={`relative rounded-2xl px-4 py-3 text-text-primary transition-all duration-200 ${
            isAssistant
              ? 'bg-bg-elevated/90 border border-border text-text-primary shadow-sm backdrop-blur-sm'
              : 'bg-gradient-to-r from-accent to-accent-light text-white shadow-md font-mono'
          }`}
        >
          {!isAssistant && (
            <div className="flex items-center gap-1.5 text-[11px] text-accent-mint/90 font-mono mb-1 select-none">
              <span>guest@portfolio:~$</span>
            </div>
          )}
          <div className="text-sm break-words select-text font-sans">
            {renderFormattedContent(message.content)}
          </div>

          {message.isStreaming && (
            <span className="inline-block w-1.5 h-3.5 ml-1 bg-accent-mint animate-pulse" />
          )}
        </div>

        {/* Action icons bar for assistant messages */}
        {isAssistant && !message.isStreaming && (
          <div className="flex items-center gap-1 mt-1 opacity-70 group-hover:opacity-100 transition-opacity px-1">
            <button
              onClick={handleCopy}
              className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-elevated text-xs transition-colors"
              title="Copy answer"
              aria-label="Copy answer"
            >
              {copied ? <Check size={12} className="text-accent-mint" /> : <Copy size={12} />}
            </button>

            {typeof window !== 'undefined' && 'speechSynthesis' in window && (
              <button
                onClick={handleSpeak}
                className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-elevated text-xs transition-colors"
                title={speaking ? 'Stop speech' : 'Read aloud'}
                aria-label={speaking ? 'Stop speech' : 'Read aloud'}
              >
                {speaking ? (
                  <VolumeX size={12} className="text-accent-mint animate-pulse" />
                ) : (
                  <Volume2 size={12} />
                )}
              </button>
            )}

            <span className="font-mono text-[10px] text-text-muted ml-1">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>

      {!isAssistant && (
        <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 bg-accent text-white shadow-sm">
          <User size={15} />
        </div>
      )}
    </div>
  );
};
