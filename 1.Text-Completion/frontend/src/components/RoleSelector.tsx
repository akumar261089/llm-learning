import React from "react";
import { Role, Theme } from "../types";
import { predefinedRoles } from "../data/roles";
import * as Icons from "lucide-react";

// Key for storing custom roles in localStorage
const CUSTOM_ROLES_STORAGE_KEY = "custom_roles";

interface RoleSelectorProps {
  selectedRole: Role | null;
  onRoleSelect: (role: Role) => void;
  onCustomRole: (systemPrompt: string) => void;
  theme: Theme;
}

export function RoleSelector({
  selectedRole,
  onRoleSelect,
  onCustomRole,
  theme,
}: RoleSelectorProps) {
  const [isCustomMode, setIsCustomMode] = React.useState(false);
  const [customName, setCustomName] = React.useState(""); // Input for custom role name
  const [customDescription, setCustomDescription] = React.useState(""); // Input for custom role description
  const [customPrompt, setCustomPrompt] = React.useState(""); // Input for custom role system prompt
  const [roles, setRoles] = React.useState<Role[]>([]); // Combined list of predefined + custom roles

  // Fetch roles (predefined + custom) on component mount
  React.useEffect(() => {
    // Load custom roles from localStorage
    const storedCustomRoles = localStorage.getItem(CUSTOM_ROLES_STORAGE_KEY);
    const customRoles = storedCustomRoles ? JSON.parse(storedCustomRoles) : [];

    // Combine predefined and custom roles
    const combinedRoles = [...predefinedRoles, ...customRoles];
    setRoles(combinedRoles);

    // Select the first predefined role as the default
    if (!selectedRole && combinedRoles.length > 0) {
      const defaultRole = predefinedRoles[0];
      onRoleSelect(defaultRole); // Programmatically select the default role
      console.log("Default Role Selected:", defaultRole);
    }
  }, [selectedRole, onRoleSelect]);

  // Handle custom role submission
  const handleCustomSubmit = () => {
    // Ensure all inputs are valid
    if (customName.trim() && customDescription.trim() && customPrompt.trim()) {
      // Create a custom role object
      const customRole: Role = {
        id: `custom-${Date.now()}`, // Unique ID for each custom role
        name: customName.trim(), // Use the custom name provided by the user
        description: customDescription.trim(), // Use the custom description
        systemPrompt: customPrompt.trim(),
        icon: "Settings", // Default icon for custom roles
      };

      // Add the custom role to localStorage
      const storedCustomRoles = localStorage.getItem(CUSTOM_ROLES_STORAGE_KEY);
      const customRoles = storedCustomRoles
        ? JSON.parse(storedCustomRoles)
        : [];
      customRoles.push(customRole);
      localStorage.setItem(
        CUSTOM_ROLES_STORAGE_KEY,
        JSON.stringify(customRoles)
      );

      // Update the roles state to include the new custom role
      setRoles((prevRoles) => [...prevRoles, customRole]);

      // Notify the parent about the new role (onRoleSelect, onCustomRole)
      onRoleSelect(customRole);
      onCustomRole(customPrompt.trim());

      // Reset inputs and close custom mode
      setCustomName("");
      setCustomDescription("");
      setCustomPrompt("");
      setIsCustomMode(false);

      console.log("Custom Role Added:", customRole);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold text-${theme.colors.text}`}>
          Choose Your Writing Companion
        </h3>
        <button
          onClick={() => setIsCustomMode(!isCustomMode)}
          className={`px-3 py-1 text-sm bg-gradient-to-r ${theme.colors.gradient} text-${theme.colors.textSecondary} rounded-md hover:shadow-md transition-all duration-200 font-medium border border-${theme.colors.border}`}
        >
          {isCustomMode ? "Browse Roles" : "Custom Muse"}
        </button>
      </div>

      {isCustomMode ? (
        <div className="space-y-3">
          {/* Input for Custom Role Name */}
          <input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Custom Role Name (e.g., 'Victorian Novelist')"
            className={`w-full p-3 border border-${theme.colors.border} rounded-lg focus:ring-2 focus:ring-${theme.colors.accent} focus:border-${theme.colors.accent} bg-gradient-to-r ${theme.colors.gradient} text-${theme.colors.text} placeholder-${theme.colors.textSecondary}`}
          />

          {/* Input for Custom Role Description */}
          <input
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            placeholder="Role Description (e.g., 'Specializes in gothic romance writing')"
            className={`w-full p-3 border border-${theme.colors.border} rounded-lg focus:ring-2 focus:ring-${theme.colors.accent} focus:border-${theme.colors.accent} bg-gradient-to-r ${theme.colors.gradient} text-${theme.colors.text} placeholder-${theme.colors.textSecondary}`}
          />

          {/* Input for Custom Role System Prompt */}
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Describe your ideal writing companion... (e.g., 'You are a Victorian-era novelist who specializes in gothic romance')"
            className={`w-full p-3 border border-${theme.colors.border} rounded-lg focus:ring-2 focus:ring-${theme.colors.accent} focus:border-${theme.colors.accent} resize-none h-24 bg-gradient-to-r ${theme.colors.gradient} text-${theme.colors.text} placeholder-${theme.colors.textSecondary}`}
          />

          {/* Create Custom Role Button */}
          <button
            onClick={handleCustomSubmit}
            disabled={
              !customName.trim() ||
              !customDescription.trim() ||
              !customPrompt.trim()
            }
            className={`px-4 py-2 bg-gradient-to-r ${theme.colors.buttonGradient} text-white rounded-lg hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md`}
          >
            Create Writing Companion
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {roles.map((role) => {
            const IconComponent = Icons[
              role.icon as keyof typeof Icons
            ] as React.ComponentType<{ className?: string }>;

            return (
              <button
                key={role.id}
                onClick={() => onRoleSelect(role)}
                className={`p-4 rounded-lg border transition-all duration-200 text-left hover:shadow-lg hover:scale-[1.02] ${
                  selectedRole?.id === role.id
                    ? `border-${theme.colors.accent} bg-gradient-to-r ${theme.colors.gradient} shadow-lg ring-2 ring-${theme.colors.accent}/20`
                    : `border-${theme.colors.border} hover:border-${theme.colors.accent} bg-gradient-to-r from-${theme.colors.surface} to-transparent hover:${theme.colors.gradient}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedRole?.id === role.id
                        ? `bg-${theme.colors.accent}/20`
                        : `bg-gradient-to-r ${theme.colors.gradient}`
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        selectedRole?.id === role.id
                          ? `text-${theme.colors.primary}`
                          : `text-${theme.colors.textSecondary}`
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-${theme.colors.text}`}>
                      {role.name}
                    </h4>
                    <p
                      className={`text-sm text-${theme.colors.textSecondary} mt-1`}
                    >
                      {role.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
