import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'warm-amber',
    name: 'Warm Amber',
    description: 'Classic writing warmth with golden tones',
    colors: {
      primary: 'amber-700',
      secondary: 'orange-600',
      accent: 'amber-500',
      background: 'from-amber-50 via-orange-50 to-red-50',
      surface: 'white',
      text: 'amber-900',
      textSecondary: 'amber-700',
      border: 'amber-200',
      gradient: 'from-amber-50 to-orange-50',
      buttonGradient: 'from-amber-600 to-orange-700',
      sliderGradient: 'from-amber-600 to-orange-700',
    }
  },
  {
    id: 'forest-sage',
    name: 'Forest Sage',
    description: 'Natural greens for peaceful writing',
    colors: {
      primary: 'emerald-700',
      secondary: 'green-600',
      accent: 'emerald-500',
      background: 'from-emerald-50 via-green-50 to-teal-50',
      surface: 'white',
      text: 'emerald-900',
      textSecondary: 'emerald-700',
      border: 'emerald-200',
      gradient: 'from-emerald-50 to-green-50',
      buttonGradient: 'from-emerald-600 to-green-700',
      sliderGradient: 'from-emerald-600 to-green-700',
    }
  },
  {
    id: 'midnight-ink',
    name: 'Midnight Ink',
    description: 'Dark elegance for focused writing',
    colors: {
      primary: 'slate-300',
      secondary: 'slate-400',
      accent: 'blue-400',
      background: 'from-slate-900 via-slate-800 to-gray-900',
      surface: 'slate-800',
      text: 'slate-100',
      textSecondary: 'slate-300',
      border: 'slate-600',
      gradient: 'from-slate-800 to-slate-700',
      buttonGradient: 'from-blue-600 to-indigo-700',
      sliderGradient: 'from-blue-600 to-indigo-700',
    }
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    description: 'Soft purples for creative inspiration',
    colors: {
      primary: 'purple-700',
      secondary: 'violet-600',
      accent: 'purple-500',
      background: 'from-purple-50 via-violet-50 to-fuchsia-50',
      surface: 'white',
      text: 'purple-900',
      textSecondary: 'purple-700',
      border: 'purple-200',
      gradient: 'from-purple-50 to-violet-50',
      buttonGradient: 'from-purple-600 to-violet-700',
      sliderGradient: 'from-purple-600 to-violet-700',
    }
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Calming blues for clear thinking',
    colors: {
      primary: 'blue-700',
      secondary: 'cyan-600',
      accent: 'blue-500',
      background: 'from-blue-50 via-cyan-50 to-sky-50',
      surface: 'white',
      text: 'blue-900',
      textSecondary: 'blue-700',
      border: 'blue-200',
      gradient: 'from-blue-50 to-cyan-50',
      buttonGradient: 'from-blue-600 to-cyan-700',
      sliderGradient: 'from-blue-600 to-cyan-700',
    }
  },
  {
    id: 'sunset-rose',
    name: 'Sunset Rose',
    description: 'Romantic pinks for emotional writing',
    colors: {
      primary: 'rose-700',
      secondary: 'pink-600',
      accent: 'rose-500',
      background: 'from-rose-50 via-pink-50 to-red-50',
      surface: 'white',
      text: 'rose-900',
      textSecondary: 'rose-700',
      border: 'rose-200',
      gradient: 'from-rose-50 to-pink-50',
      buttonGradient: 'from-rose-600 to-pink-700',
      sliderGradient: 'from-rose-600 to-pink-700',
    }
  }
];

export const getThemeById = (id: string): Theme => {
  return themes.find(theme => theme.id === id) || themes[0];
};