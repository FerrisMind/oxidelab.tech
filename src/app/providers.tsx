'use client';

import type { ReactNode } from 'react';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
	return (
		<LocaleProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</LocaleProvider>
	);
}

