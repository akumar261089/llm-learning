import React from "react";
import { Theme } from "../types";
import ReactMarkdown from "react-markdown"; // Import react-markdown for parsing & rendering Markdown
import { Send, Loader2, Copy, Check } from "lucide-react";

interface CompletionAreaProps {
  userInput: string;
  onInputChange: (input: string) => void;
  completion: string; // The completion will now be parsed as markdown
  isLoading: boolean;
  error: string | null;
  onSubmit: () => void;
  disabled: boolean;
  theme: Theme;
}

export function CompletionArea({
  userInput,
  onInputChange,
  completion,
  isLoading,
  error,
  onSubmit,
  disabled,
  theme,
}: CompletionAreaProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (completion) {
      try {
        await navigator.clipboard.writeText(completion);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label
          className={`text-sm font-semibold text-${theme.colors.textSecondary}`}
        >
          Your Writing Prompt
        </label>
        <div className="relative">
          <textarea
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Begin your story, describe your scene, or share your ideas... (Ctrl/Cmd + Enter to generate)"
            className={`w-full p-4 border border-${theme.colors.border} rounded-lg focus:ring-2 focus:ring-${theme.colors.accent} focus:border-${theme.colors.accent} resize-none h-32 bg-gradient-to-r ${theme.colors.gradient} text-${theme.colors.text} placeholder-${theme.colors.textSecondary}`}
            disabled={isLoading}
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled || isLoading || !userInput.trim()}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${theme.colors.buttonGradient} text-white rounded-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Crafting your text...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Generate Text
          </>
        )}
      </button>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg border-l-4 border-l-red-500">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
      {completion && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              className={`text-sm font-semibold text-${theme.colors.textSecondary}`}
            >
              Your Generated Text
            </label>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 px-3 py-1 text-sm bg-gradient-to-r ${theme.colors.gradient} text-${theme.colors.textSecondary} rounded-md hover:shadow-md transition-all duration-200 font-medium border border-${theme.colors.border}`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Text
                </>
              )}
            </button>
          </div>
          {/* Markdown Renderer */}
          <div
            className={`p-6 bg-gradient-to-br ${theme.colors.gradient} border border-${theme.colors.border} rounded-lg shadow-inner min-h-[300px] max-h-[600px] overflow-y-auto`}
          >
            {/* Render Markdown with `ReactMarkdown` */}
            <ReactMarkdown
              className={`text-${theme.colors.text} font-serif text-base leading-relaxed`}
            >
              {completion}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
