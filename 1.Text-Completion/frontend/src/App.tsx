import React from "react";
import { RoleSelector } from "./components/RoleSelector";
import { ParameterControls } from "./components/ParameterControls";
import { CompletionArea } from "./components/CompletionArea";
import { History } from "./components/History";
import { ThemeSelector } from "./components/ThemeSelector";
import { Role, CompletionParams, HistoryItem } from "./types";
import { fetchCompletion } from "./utils/api";
import { saveHistoryItem, saveTheme, getStoredTheme } from "./utils/storage";
import { themes, getThemeById } from "./data/themes";
import { Bot, History as HistoryIcon, Settings, Zap } from "lucide-react";

function App() {
  const [currentTheme, setCurrentTheme] = React.useState(() => {
    const storedThemeId = getStoredTheme();
    return getThemeById(storedThemeId || "warm-amber");
  });
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [params, setParams] = React.useState<CompletionParams>({
    temperature: 0.7,
    maxTokens: 500,
    topP: 0.95,
  });
  const [userInput, setUserInput] = React.useState("");
  const [completion, setCompletion] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"generate" | "history">(
    "generate"
  );

  const handleThemeChange = (theme: typeof currentTheme) => {
    setCurrentTheme(theme);
    saveTheme(theme.id);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleCustomRole = (systemPrompt: string) => {
    // Custom role handling is already done in RoleSelector
  };

  const handleSubmit = async () => {
    if (!selectedRole || !userInput.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const request = {
        prompt: [
          { role: "system" as const, content: selectedRole.systemPrompt },
          { role: "user" as const, content: userInput.trim() },
        ],
        max_tokens: params.maxTokens,
        temperature: params.temperature,
        top_p: params.topP,
      };

      const response = await fetchCompletion(request);
      setCompletion(response.text);

      // Save to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        roleName: selectedRole.name,
        userInput: userInput.trim(),
        completion: response.text,
        params: { ...params },
      };
      saveHistoryItem(historyItem);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    setUserInput(item.userInput);
    setCompletion(item.completion);
    setParams(item.params);
    setActiveTab("generate");
  };

  const isSubmitDisabled = !selectedRole || !userInput.trim();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentTheme.colors.background}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className={`p-3 bg-gradient-to-r ${currentTheme.colors.buttonGradient} rounded-xl shadow-lg`}
            >
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1
              className={`text-3xl font-bold text-${currentTheme.colors.text}`}
            >
              AI Text Completion
            </h1>
          </div>
          <p
            className={`text-${currentTheme.colors.textSecondary} max-w-2xl mx-auto font-medium`}
          >
            Craft compelling narratives with AI assistance. Choose from
            specialized writing roles or create your own literary companion.
          </p>
        </div>

        {/* Theme Selector */}
        <div className="flex justify-center mb-6">
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div
            className={`bg-${currentTheme.colors.surface} rounded-xl p-1 shadow-lg border border-${currentTheme.colors.border}`}
          >
            <button
              onClick={() => setActiveTab("generate")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                activeTab === "generate"
                  ? `bg-gradient-to-r ${currentTheme.colors.buttonGradient} text-white shadow-md`
                  : `text-${currentTheme.colors.textSecondary} hover:text-${currentTheme.colors.text} hover:bg-gradient-to-r hover:${currentTheme.colors.gradient}`
              }`}
            >
              <Zap className="w-5 h-5" />
              Write
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                activeTab === "history"
                  ? `bg-gradient-to-r ${currentTheme.colors.buttonGradient} text-white shadow-md`
                  : `text-${currentTheme.colors.textSecondary} hover:text-${currentTheme.colors.text} hover:bg-gradient-to-r hover:${currentTheme.colors.gradient}`
              }`}
            >
              <HistoryIcon className="w-5 h-5" />
              Archive
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === "generate" ? (
            <div className="space-y-6">
              {/* Top Row - Role Selection */}
              {/* Main Content Row */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column - Text Completion (Expanded) */}
                <div className="lg:col-span-3">
                  <div
                    className={`bg-${currentTheme.colors.surface} rounded-xl shadow-lg p-6 border border-${currentTheme.colors.border}`}
                  >
                    <CompletionArea
                      userInput={userInput}
                      onInputChange={setUserInput}
                      completion={completion}
                      isLoading={isLoading}
                      error={error}
                      onSubmit={handleSubmit}
                      disabled={isSubmitDisabled}
                      theme={currentTheme}
                    />
                  </div>
                </div>

                {/* Right Column - Parameters (Compact) */}
                <div className="lg:col-span-1">
                  <div
                    className={`bg-${currentTheme.colors.surface} rounded-xl shadow-lg p-6 sticky top-8 border border-${currentTheme.colors.border}`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Settings
                        className={`w-4 h-4 text-${currentTheme.colors.textSecondary}`}
                      />
                      <span
                        className={`text-sm font-semibold text-${currentTheme.colors.text}`}
                      >
                        Style
                      </span>
                    </div>
                    <ParameterControls
                      params={params}
                      onParamsChange={setParams}
                      theme={currentTheme}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`bg-${currentTheme.colors.surface} rounded-xl shadow-lg p-6 border border-${currentTheme.colors.border}`}
              >
                <RoleSelector
                  selectedRole={selectedRole}
                  onRoleSelect={handleRoleSelect}
                  onCustomRole={handleCustomRole}
                  theme={currentTheme}
                />
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div
                className={`bg-${currentTheme.colors.surface} rounded-xl shadow-lg p-6 border border-${currentTheme.colors.border}`}
              >
                <History
                  onHistoryItemClick={handleHistoryItemClick}
                  theme={currentTheme}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-12 text-${currentTheme.colors.textSecondary}`}
        >
          <p className="italic">
            Crafted for writers, by writers • Built with React + TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
