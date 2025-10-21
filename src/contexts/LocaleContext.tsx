'use client';

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import enMessages from '@/locales/en.json';
import ruMessages from '@/locales/ru.json';
import ptBRMessages from '@/locales/pt-BR.json';

export type SupportedLocale = 'en' | 'ru' | 'pt-BR';

type TranslationDictionary = Record<string, unknown>;

interface LocaleContextValue {
	locale: SupportedLocale;
	messages: TranslationDictionary;
	changeLocale: (locale: SupportedLocale) => void;
	availableLocales: SupportedLocale[];
}

const STORAGE_KEY = 'oxide-lab.locale';
const DEFAULT_LOCALE: SupportedLocale = 'en';
const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'ru', 'pt-BR'];

const translations: Record<SupportedLocale, TranslationDictionary> = {
	en: enMessages,
	ru: ruMessages,
	'pt-BR': ptBRMessages
};

export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const isSupportedLocale = (value: string | null | undefined): value is SupportedLocale => {
	if (!value) return false;
	return SUPPORTED_LOCALES.includes(value as SupportedLocale);
};

const resolveInitialLocale = (): SupportedLocale => {
	if (typeof window === 'undefined') return DEFAULT_LOCALE;

	const storedLocale = window.localStorage.getItem(STORAGE_KEY);
	if (isSupportedLocale(storedLocale)) {
		return storedLocale;
	}

	const browserLocale = window.navigator.language;
	const directMatch = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === browserLocale.toLowerCase());
	if (directMatch) return directMatch;

	const baseLang = browserLocale.split('-')[0]?.toLowerCase();
	const partialMatch = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase().startsWith(baseLang));
	return partialMatch ?? DEFAULT_LOCALE;
};

export function LocaleProvider({ children }: { children: ReactNode }) {
	const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE);

	const applyLocale = useCallback((nextLocale: SupportedLocale, persist = true) => {
		setLocale(nextLocale);
		if (persist && typeof window !== 'undefined') {
			window.localStorage.setItem(STORAGE_KEY, nextLocale);
		}
		if (typeof document !== 'undefined') {
			document.documentElement.lang = nextLocale;
			const direction = (translations[nextLocale]?.direction as string) ?? 'ltr';
			document.documentElement.dir = direction === 'rtl' ? 'rtl' : 'ltr';
		}
	}, []);

	useEffect(() => {
		const initial = resolveInitialLocale();
		applyLocale(initial, false);
	}, [applyLocale]);

	useEffect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = locale;
			const direction = (translations[locale]?.direction as string) ?? 'ltr';
			document.documentElement.dir = direction === 'rtl' ? 'rtl' : 'ltr';
		}
	}, [locale]);

	const contextValue = useMemo<LocaleContextValue>(
		() => ({
			locale,
			changeLocale: applyLocale,
			messages: translations[locale] ?? translations[DEFAULT_LOCALE],
			availableLocales: SUPPORTED_LOCALES
		}),
		[applyLocale, locale]
	);

	return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
}

export const localeConfig = {
	defaultLocale: DEFAULT_LOCALE,
	supported: SUPPORTED_LOCALES,
	fallback: DEFAULT_LOCALE
} as const;
