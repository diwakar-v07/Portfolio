import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileData, Project, ThemeMode } from '../types';
import { defaultPortfolioData } from '../data/defaultPortfolio';

const STORAGE_KEY = 'diwakar_portfolio_data_v5';
const THEME_KEY = 'diwakar_portfolio_theme_v5';

interface PortfolioContextType {
  data: ProfileData;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  updateProfile: (partial: Partial<ProfileData>) => void;
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  resetToDefault: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return defaultPortfolioData;
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY) as ThemeMode;
      if (savedTheme && ['dark', 'light', 'emerald', 'indigo'].includes(savedTheme)) {
        return savedTheme;
      }
    } catch {
      // Fallback
    }
    return 'dark';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      const root = document.documentElement;
      root.classList.remove('theme-dark', 'theme-light', 'theme-emerald', 'theme-indigo');
      root.classList.add(`theme-${theme}`);
    } catch (e) {
      console.error('Failed to set theme', e);
    }
  }, [theme]);

  const updateProfile = (partial: Partial<ProfileData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const updateProject = (project: Project) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p)),
    }));
  };

  const addProject = (project: Project) => {
    setData((prev) => ({
      ...prev,
      projects: [project, ...prev.projects],
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const resetToDefault = () => {
    setData(defaultPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const exportDataJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.fullName && Array.isArray(parsed.projects)) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON imported', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        setTheme,
        updateProfile,
        updateProject,
        addProject,
        deleteProject,
        resetToDefault,
        exportDataJson,
        importDataJson,
        selectedProject,
        setSelectedProject,
        isResumeModalOpen,
        setIsResumeModalOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
