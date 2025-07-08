import React from "react";
import { CompletionParams, Theme } from "../types";
import { Info } from "lucide-react";

interface ParameterControlsProps {
  params: CompletionParams;
  onParamsChange: (params: CompletionParams) => void;
  theme: Theme;
}

export function ParameterControls({
  params,
  onParamsChange,
  theme,
}: ParameterControlsProps) {
  const updateParam = (key: keyof CompletionParams, value: number) => {
    onParamsChange({ ...params, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {/* Temperature */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label
              className={`text-xs font-semibold text-${theme.colors.textSecondary}`}
            >
              Creativity
            </label>
            <div className="group relative">
              <Info
                className={`w-3 h-3 text-${theme.colors.accent} hover:text-${theme.colors.primary} cursor-help`}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  className={`bg-${theme.colors.text} text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg`}
                >
                  Controls creativity: 0.1 = precise & focused, 2.0 = wild &
                  imaginative
                </div>
              </div>
            </div>
            <span
              className={`text-xs text-${theme.colors.textSecondary} ml-auto font-medium`}
            >
              {params.temperature}
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={params.temperature}
            onChange={(e) =>
              updateParam("temperature", parseFloat(e.target.value))
            }
            className={`w-full h-2 bg-${theme.colors.border} rounded-lg appearance-none cursor-pointer slider slider-${theme.id}`}
          />
          <div
            className={`flex justify-between text-xs text-${theme.colors.textSecondary}`}
          >
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label
              className={`text-xs font-semibold text-${theme.colors.textSecondary}`}
            >
              Length
            </label>
            <div className="group relative">
              <Info
                className={`w-3 h-3 text-${theme.colors.accent} hover:text-${theme.colors.primary} cursor-help`}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  className={`bg-${theme.colors.text} text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg`}
                >
                  Maximum length of your generated text
                </div>
              </div>
            </div>
            <span
              className={`text-xs text-${theme.colors.textSecondary} ml-auto font-medium`}
            >
              {params.maxTokens}
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={params.maxTokens}
            onChange={(e) => updateParam("maxTokens", parseInt(e.target.value))}
            className={`w-full h-2 bg-${theme.colors.border} rounded-lg appearance-none cursor-pointer slider slider-${theme.id}`}
          />
          <div
            className={`flex justify-between text-xs text-${theme.colors.textSecondary}`}
          >
            <span>Brief</span>
            <span>Extensive</span>
          </div>
        </div>

        {/* Top P */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label
              className={`text-xs font-semibold text-${theme.colors.textSecondary}`}
            >
              Focus
            </label>
            <div className="group relative">
              <Info
                className={`w-3 h-3 text-${theme.colors.accent} hover:text-${theme.colors.primary} cursor-help`}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  className={`bg-${theme.colors.text} text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg`}
                >
                  Controls word choice: 0.1 = narrow vocabulary, 1.0 = diverse
                  expressions
                </div>
              </div>
            </div>
            <span
              className={`text-xs text-${theme.colors.textSecondary} ml-auto font-medium`}
            >
              {params.topP}
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={params.topP}
            onChange={(e) => updateParam("topP", parseFloat(e.target.value))}
            className={`w-full h-2 bg-${theme.colors.border} rounded-lg appearance-none cursor-pointer slider slider-${theme.id}`}
          />
          <div
            className={`flex justify-between text-xs text-${theme.colors.textSecondary}`}
          >
            <span>Focused</span>
            <span>Diverse</span>
          </div>
        </div>
      </div>
    </div>
  );
}
