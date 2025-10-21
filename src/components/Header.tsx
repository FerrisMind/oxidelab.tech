'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export function Header() {
	const { t } = useTranslation();

	return (
		<header className="sticky top-0 z-50 border-b border-[color:var(--border)]/70 bg-[color:var(--surface)]/80 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-4 px-6 py-4">
				<Link
					href="/"
					className="flex items-center gap-3 text-center"
					aria-label={t('header.homeLinkLabel') as string}
				>
					<div className="flex flex-col">
						<span className="text-base font-semibold leading-tight text-foreground sm:text-lg">
							{t('header.title') as string}
						</span>
						<span className="text-xs text-[#64748B] sm:text-sm">{t('header.subtitle') as string}</span>
					</div>
				</Link>
			</div>
		</header>
	);
}

