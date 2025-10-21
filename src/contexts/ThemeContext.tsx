'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

const STORAGE_KEY = 'oxide-lab.theme';
const DEFAULT_THEME: Theme = 'light';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): Theme => {
	// Проверяем, находимся ли мы на клиенте
	if (typeof window === 'undefined') {
		return DEFAULT_THEME;
	}

	// Сначала проверяем localStorage
	const storedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
	if (storedTheme === 'light' || storedTheme === 'dark') {
		return storedTheme;
	}

	// Если нет сохраненной темы, используем системные настройки
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return prefersDark ? 'dark' : 'light';
};

const applyDocumentTheme = (theme: Theme) => {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	root.dataset.theme = theme;
	root.classList.toggle('dark', theme === 'dark');
};

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(getInitialTheme);

	// Применяем тему сразу при монтировании
	useEffect(() => {
		applyDocumentTheme(theme);
	}, [theme]);

	// Синхронизируем с localStorage при изменении темы
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const listener = (event: MediaQueryListEvent) => {
			// Только если нет сохраненной темы, следуем системным настройкам
			const storedTheme = window.localStorage.getItem(STORAGE_KEY);
			if (!storedTheme) {
				const newTheme: Theme = event.matches ? 'dark' : 'light';
				setTheme(newTheme, false);
			}
		};
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', listener);
		return () => mediaQuery.removeEventListener('change', listener);
	}, []);


	const setTheme = useCallback((nextTheme: Theme, persist = true) => {
		setThemeState(nextTheme);
		applyDocumentTheme(nextTheme);
		if (persist && typeof window !== 'undefined') {
			window.localStorage.setItem(STORAGE_KEY, nextTheme);
		}
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}, [setTheme, theme]);

	const contextValue = useMemo<ThemeContextValue>(
		() => ({
			theme,
			setTheme,
			toggleTheme
		}),
		[setTheme, theme, toggleTheme]
	);

	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export const useThemeContext = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeContext must be used within a ThemeProvider');
	}
	return context;
};

// Компонент для установки темы на сервере
export function ThemeScript() {
	const themeScript = `
		try {
			const theme = localStorage.getItem('oxide-lab.theme');
			if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
				document.documentElement.dataset.theme = 'dark';
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.dataset.theme = 'light';
				document.documentElement.classList.remove('dark');
			}
		} catch (e) {}
	`;

	return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
