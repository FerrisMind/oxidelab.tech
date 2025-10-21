'use client';

import { useTransition } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import type { SupportedLocale } from '@/contexts/LocaleContext';

const OPTION_STYLES =
	'flex items-center gap-2 rounded-lg border border-[color:var(--border)]/70 bg-transparent px-3 py-2 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--link)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-strong)]/40';

export function LanguageSwitcher() {
	const { t, locale, changeLocale, availableLocales } = useTranslation();
	const localeNames = (t('common.localeNames') ?? {}) as Record<string, string>;
	const [isPending, startTransition] = useTransition();

	const handleChange = (nextLocale: SupportedLocale) => {
		if (nextLocale === locale) return;
		startTransition(() => changeLocale(nextLocale));
	};

	return (
		<div className="flex items-center gap-2" role="group" aria-label={t('languageSwitcher.label')}>
			<label htmlFor="language-switcher" className="sr-only">
				{t('languageSwitcher.label')}
			</label>
			<select
				id="language-switcher"
				value={locale}
				onChange={(event) => handleChange(event.target.value as SupportedLocale)}
				aria-label={t('languageSwitcher.label')}
				className={`${OPTION_STYLES} min-w-[8rem] appearance-none backdrop-blur-sm`}
				disabled={isPending}
			>
				{availableLocales.map((code) => (
					<option key={code} value={code}>
						{localeNames[code] ?? code}
					</option>
				))}
			</select>
			<span className="sr-only" aria-live="polite">
				{t('languageSwitcher.ariaLabel', { count: availableLocales.length })}
			</span>
		</div>
	);
}

