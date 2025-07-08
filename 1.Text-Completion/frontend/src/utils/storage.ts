import { HistoryItem } from '../types';

const HISTORY_KEY = 'text-completion-history';
const THEME_KEY = 'text-completion-theme';

export function saveHistoryItem(item: HistoryItem): void {
  try {
    const history = getHistory();
    history.unshift(item);
    // Keep only the last 100 items
    const trimmedHistory = history.slice(0, 100);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save history item:', error);
  }
}

export function getHistory(): HistoryItem[] {
  try {
    const historyString = localStorage.getItem(HISTORY_KEY);
    if (!historyString) return [];
    return JSON.parse(historyString);
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

export function deleteHistoryItem(id: string): void {
  try {
    const history = getHistory();
    const filteredHistory = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory));
  } catch (error) {
    console.error('Failed to delete history item:', error);
  }
}

export function saveTheme(themeId: string): void {
  try {
    localStorage.setItem(THEME_KEY, themeId);
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
}

export function getStoredTheme(): string | null {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    console.error('Failed to load theme:', error);
    return null;
  }
}