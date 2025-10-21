"use client"

import * as React from "react"
import { GlobeIcon } from "@phosphor-icons/react"
import { useTranslation } from "@/hooks/useTranslation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const languageNames: Record<string, string> = {
  en: "English",
  ru: "Русский",
  "pt-BR": "Português (Brasil)",
}

export function LanguageSelector() {
  const { locale, changeLocale, availableLocales, t } = useTranslation()

  const handleLanguageChange = (newLocale: string) => {
    changeLocale(newLocale as any)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-[color:var(--surface-elevated)]"
          aria-label={t("languageSwitcher.label") as string}
        >
          <GlobeIcon className="h-4 w-4 text-[color:var(--muted-foreground)]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[160px] bg-[var(--background)] border-[color:var(--border)]"
      >
        {availableLocales.map((localeCode) => (
          <DropdownMenuItem
            key={localeCode}
            onClick={() => handleLanguageChange(localeCode)}
            className={`cursor-pointer px-3 py-2 text-sm transition-colors hover:bg-[color:var(--surface-elevated)] ${
              locale === localeCode
                ? "bg-[color:var(--link)]/10 text-[color:var(--link)]"
                : "text-[color:var(--foreground)] hover:text-[color:var(--link)]"
            }`}
          >
            <span className="flex items-center justify-between w-full">
              <span>{languageNames[localeCode] || localeCode}</span>
              {locale === localeCode && (
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-[color:var(--link)]" />
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
