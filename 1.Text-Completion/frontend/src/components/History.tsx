import React from 'react';
import { HistoryItem, Theme } from '../types';
import { getHistory, clearHistory, deleteHistoryItem } from '../utils/storage';
import { Clock, Trash2, Copy, Check, X } from 'lucide-react';

interface HistoryProps {
  onHistoryItemClick: (item: HistoryItem) => void;
  theme: Theme;
}

export function History({ onHistoryItemClick, theme }: HistoryProps) {
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  };

  const handleCopyCompletion = async (completion: string, id: string) => {
    try {
      await navigator.clipboard.writeText(completion);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (history.length === 0) {
    return (
      <div className={`text-center py-8 text-${theme.colors.textSecondary}`}>
        <Clock className={`w-12 h-12 mx-auto mb-4 text-${theme.colors.accent}`} />
        <p className="italic">Your writing archive is empty. Begin crafting your stories!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold text-${theme.colors.text}`}>Writing Archive</h3>
        <button
          onClick={handleClearHistory}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors font-medium"
        >
          Clear Archive
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className={`p-4 border border-${theme.colors.border} rounded-lg hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-${theme.colors.surface} to-transparent hover:${theme.colors.gradient}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold text-${theme.colors.primary} bg-gradient-to-r ${theme.colors.gradient} px-2 py-1 rounded-full border border-${theme.colors.border}`}>{item.roleName}</span>
                <span className={`text-xs text-${theme.colors.textSecondary}`}>{formatDate(item.timestamp)}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyCompletion(item.completion, item.id)}
                  className={`p-1 text-${theme.colors.accent} hover:text-${theme.colors.primary} transition-colors`}
                  title="Copy completion"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className={`p-1 text-${theme.colors.accent} hover:text-red-500 transition-colors`}
                  title="Delete item"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className={`text-xs text-${theme.colors.textSecondary} mb-1 font-medium`}>Prompt:</p>
                <p className={`text-sm text-${theme.colors.textSecondary} line-clamp-2 italic`}>{item.userInput}</p>
              </div>
              <div>
                <p className={`text-xs text-${theme.colors.textSecondary} mb-1 font-medium`}>Generated:</p>
                <p className={`text-sm text-${theme.colors.text} line-clamp-3 font-serif`}>{item.completion}</p>
              </div>
            </div>

            <div className={`mt-3 flex items-center gap-4 text-xs text-${theme.colors.textSecondary}`}>
              <span>Creativity: {item.params.temperature}</span>
              <span>Length: {item.params.maxTokens}</span>
              <span>Focus: {item.params.topP}</span>
            </div>

            <button
              onClick={() => onHistoryItemClick(item)}
              className={`mt-2 text-sm text-${theme.colors.primary} hover:text-${theme.colors.text} transition-colors font-medium underline decoration-${theme.colors.accent} hover:decoration-${theme.colors.primary}`}
            >
              Restore this session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}