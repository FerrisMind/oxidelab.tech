"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { List, X } from "@phosphor-icons/react";
import { useLanguage } from "@/contexts/language-context";

const LanguageSwitcher = ({
  isScrolled,
  isDarkTheme,
}: {
  isScrolled: boolean;
  isDarkTheme: boolean;
}) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ru" : "en";
    setLanguage(newLanguage);
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className={cn(
        "text-sm font-medium transition-colors hover:text-accent hover:bg-transparent",
        isScrolled && !isDarkTheme
          ? "text-foreground"
          : "text-primary-foreground",
        isDarkTheme && "text-primary-foreground",
        "px-3 py-2"
      )}
    >
      {language.toUpperCase()}
    </Button>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight;

      const scrolled = scrollY > 10;
      setIsScrolled(scrolled);

      if (scrollY > heroSectionHeight - 80) {
        // 80px is header height approx
        setIsDarkTheme(true);
      } else {
        setIsDarkTheme(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#features", label: t("header.features") },
    { href: "#system-requirements", label: t("header.systemRequirements") },
  ];

  const mobileNavLinks = [
    { href: "#features", label: t("header.features") },
    { href: "#system-requirements", label: t("header.systemRequirements") },
  ];

  const textAndIconColorClass =
    isScrolled && !isDarkTheme ? "text-primary" : "text-primary-foreground";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300"
      )}
    >
      <div
        className={cn(
          "relative flex h-16 items-center justify-between rounded-2xl px-6 transition-all duration-300",
          isScrolled &&
            !isDarkTheme &&
            "bg-background/80 backdrop-blur-sm border shadow-md",
          isDarkTheme && "bg-[#1c1d3b] shadow-lg"
        )}
      >
        <Link href="/">
          <Logo textClassName={cn(textAndIconColorClass)} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 ml-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                textAndIconColorClass
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-grow" />
        <div className="hidden md:flex items-center">
          <LanguageSwitcher isScrolled={isScrolled} isDarkTheme={isDarkTheme} />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher isScrolled={isScrolled} isDarkTheme={isDarkTheme} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(textAndIconColorClass)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <List className="h-6 w-6" />
            )}
          </Button>
        </div>
        {isMenuOpen && (
          <div className="fixed top-20 right-4 w-64 md:hidden bg-background/95 backdrop-blur-sm rounded-2xl shadow-lg border p-4 z-50">
            <nav className="flex flex-col items-center gap-4">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground text-sm font-medium transition-colors hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
