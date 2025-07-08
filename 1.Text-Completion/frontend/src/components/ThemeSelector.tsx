import React from 'react';
import { Theme } from '../types';
import { themes } from '../data/themes';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 bg-${currentTheme.colors.surface} border border-${currentTheme.colors.border} rounded-lg hover:shadow-md transition-all duration-200 text-${currentTheme.colors.textSecondary}`}
      >
        <Palette className="w-4 h-4" />
        <span className="text-sm font-medium">{currentTheme.name}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute top-full left-0 mt-2 w-72 bg-${currentTheme.colors.surface} border border-${currentTheme.colors.border} rounded-xl shadow-xl z-20 p-4`}>
            <h3 className={`text-sm font-semibold text-${currentTheme.colors.text} mb-3`}>Choose Your Writing Mood</h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left hover:shadow-md ${
                    currentTheme.id === theme.id 
                      ? `bg-gradient-to-r ${theme.colors.gradient} border border-${theme.colors.accent} ring-2 ring-${theme.colors.accent}/20` 
                      : `hover:bg-gradient-to-r hover:${theme.colors.gradient} border border-transparent hover:border-${theme.colors.border}`
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.colors.buttonGradient} flex items-center justify-center`}>
                    {currentTheme.id === theme.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <div className={`font-medium text-${theme.colors.text}`}>{theme.name}</div>
                    <div className={`text-xs text-${theme.colors.textSecondary}`}>{theme.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}