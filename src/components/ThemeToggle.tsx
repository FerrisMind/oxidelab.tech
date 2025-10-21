'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const { t } = useTranslation();

	const isDark = theme === 'dark';

	return (
		<button
			type="button"
			role="switch"
			aria-checked={isDark}
			aria-label={t('themeToggle.toggle') as string}
			onClick={toggleTheme}
			className={cn(
				"relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
				isDark
					? "bg-[color:var(--accent-strong)]"
					: "bg-[color:var(--muted)] hover:bg-[color:var(--muted)]/80"
			)}
		>
			<span className="sr-only">{t('themeToggle.toggle')}</span>
			<span
				className={cn(
					"pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-[color:var(--background)] shadow ring-0 transition-transform duration-200 ease-in-out",
					isDark ? "translate-x-5" : "translate-x-0"
				)}
			>
				<span
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-in-out",
						isDark ? "opacity-0" : "opacity-100"
					)}
				>
					<SunIcon className="h-3 w-3 text-[color:var(--foreground)]" aria-hidden />
				</span>
				<span
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-in-out",
						isDark ? "opacity-100" : "opacity-0"
					)}
				>
					<MoonIcon className="h-3 w-3 text-[color:var(--foreground)]" aria-hidden />
				</span>
			</span>
		</button>
	);
}

