'use client';

import { useContext, useMemo } from 'react';
import { LocaleContext, localeConfig, type SupportedLocale } from '@/contexts/LocaleContext';
import enMessages from '@/locales/en.json';

type Primitive = string | number | boolean | null | undefined;
type InterpolationValues = Record<string, Primitive>;

const PLURAL_KEYS = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);

type TranslateOptions = {
	values?: InterpolationValues;
	count?: number;
	defaultValue?: string;
};

type TranslationValue = unknown;

const getNestedValue = (dictionary: Record<string, unknown>, key: string): TranslationValue => {
	return key.split('.').reduce<TranslationValue>((acc, segment) => {
		if (acc && typeof acc === 'object' && !Array.isArray(acc)) {
			return (acc as Record<string, TranslationValue>)[segment];
		}
		return undefined;
	}, dictionary);
};

const isRecord = (value: unknown): value is Record<string, TranslationValue> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const isPluralCandidate = (value: unknown): value is Record<string, string> =>
	isRecord(value) && Object.keys(value).some((key) => PLURAL_KEYS.has(key));

const formatTemplate = (template: string, values: InterpolationValues = {}) =>
	template.replace(/\{(\w+)\}/g, (_, token) => {
		const replacement = values[token];
		return replacement !== undefined && replacement !== null ? String(replacement) : `{${token}}`;
	});

const resolvePluralForm = (
	value: Record<string, string>,
	locale: SupportedLocale,
	count: number,
	values?: InterpolationValues
) => {
	const pluralRules = new Intl.PluralRules(locale);
	const rule = pluralRules.select(count);
	const fallbackRule = pluralRules.select(Math.abs(count) === 1 ? 1 : 2);
	const message = value[rule] ?? value[fallbackRule] ?? value.other ?? Object.values(value)[0];
	return formatTemplate(message ?? String(count), { ...values, count });
};

const resolveTranslation = (
	key: string,
	localeMessages: Record<string, unknown>,
	options?: TranslateOptions,
	locale: SupportedLocale = localeConfig.defaultLocale
): TranslationValue => {
	const fallbackMessages = enMessages as Record<string, unknown>;
	const { defaultValue, count, values } = options ?? {};

	let result = getNestedValue(localeMessages, key);
	if (result === undefined) {
		result = getNestedValue(fallbackMessages, key);
	}
	if (result === undefined) {
		return defaultValue ?? key;
	}

	if (typeof result === 'string') {
		return formatTemplate(result, values);
	}

	if (isPluralCandidate(result) && typeof count === 'number') {
		return resolvePluralForm(result, locale, count, values);
	}

	if (Array.isArray(result)) {
		return result;
	}

	if (isRecord(result) && typeof count === 'number') {
		return resolvePluralForm(result as Record<string, string>, locale, count, values);
	}

	if (typeof result === 'string' && values) {
		return formatTemplate(result, values);
	}

	return result;
};

export const useTranslation = () => {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error('useTranslation must be used within a LocaleProvider');
	}

	const { locale, changeLocale, messages, availableLocales } = context;

	const translator = useMemo(
		() => ({
			t: (key: string, options?: TranslateOptions) =>
				resolveTranslation(key, messages as Record<string, unknown>, options, locale),
			locale,
			changeLocale,
			availableLocales
		}),
		[availableLocales, changeLocale, locale, messages]
	);

	return translator;
};

