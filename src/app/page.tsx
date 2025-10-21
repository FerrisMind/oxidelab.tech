"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ShieldIcon,
  LockSimpleIcon,
  CpuIcon,
  LightningIcon,
  GlobeIcon,
  SparkleIcon,
  StackIcon,
  DownloadSimpleIcon,
  GithubLogoIcon
} from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { useTranslation } from "@/hooks/useTranslation";

type FeatureItem = { title: string; description: string; color: string };
type HeroContent = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  downloadCta: string;
  githubCta: string;
  githubAria: string;
  statsTagline: string;
  scrollHint: string;
};
type DemoContent = {
  title: string;
  subtitle: string;
  browserLabel: string;
  messages: {
    assistantGreeting: string;
    userRequest: string;
    assistantSummaryTitle: string;
    metrics: string[];
  };
  floatingLockLabel: string;
  floatingCpuLabel: string;
};
type PrivacyContent = {
  title: string;
  subtitle: string;
  items: FeatureItem[];
  callToAction: string;
};
type FooterLink = { label: string; href: string };
type FooterContent = {
  resourcesTitle: string;
  resources: FooterLink[];
  technicalTitle: string;
  technical: string[];
  social: Record<string, string>;
  privacyLine: string;
  copyright: string;
};

const featureIcons = [ShieldIcon, CpuIcon, LockSimpleIcon, LightningIcon, GlobeIcon, StackIcon];

export default function Home() {
	const { t } = useTranslation();

	const hero = t("hero") as HeroContent;
	const features = (t("features.items") as FeatureItem[]) ?? [];
	const featuresTitle = t("features.title") as string;
	const featuresSubtitle = t("features.subtitle") as string;
	const demo = t("demo") as DemoContent;
	const privacy = t("privacy") as PrivacyContent;
	const footer = t("footer") as FooterContent;

	const currentYear = new Date().getFullYear();
	const [titleTyped, setTitleTyped] = useState(false);
	const [showSubtitle, setShowSubtitle] = useState(false);
	const [showButtons, setShowButtons] = useState(false);

	useEffect(() => {
		if (titleTyped) {
			const timer = setTimeout(() => setShowSubtitle(true), 500);
			return () => clearTimeout(timer);
		}
	}, [titleTyped]);

	useEffect(() => {
		if (showSubtitle) {
			const timer = setTimeout(() => setShowButtons(true), 1000);
			return () => clearTimeout(timer);
		}
	}, [showSubtitle]);

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <section className="geometric-pattern relative flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(249, 115, 22, 0.18) 0%, transparent 70%)" }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-5xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative h-32 w-32">
                <Image src="/icon.svg" alt={hero.title} fill className="object-contain" priority />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--link)]/25 bg-[color:var(--link)]/10 px-4 py-2 backdrop-blur"
            >
              <SparkleIcon className="h-4 w-4 text-[color:var(--link)]" aria-hidden />
              <span className="text-sm font-medium text-[color:var(--link)]">{hero.badge}</span>
            </motion.div>

            <h1
              className="mb-6 text-5xl font-bold leading-tight sm:text-6xl md:text-[color:var(--accent-strong)]xl lg:text-8xl"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="gradient-text">
                <TypewriterEffect
                  text={hero.title}
                  speed={80}
                  delay={1000}
                  onComplete={() => setTitleTyped(true)}
                  className="inline"
                />
              </span>
            </h1>

            {showSubtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 text-xl font-light text-[var(--foreground)] sm:text-[color:var(--destructive)]xl md:text-3xl"
              >
                {hero.subtitle}
              </motion.p>
            )}

            {showSubtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-[color:var(--muted-foreground)] sm:text-lg"
              >
                {hero.description}
              </motion.p>
            )}

            {showButtons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
              <Button
                asChild
                size="lg"
                className="layered-shadow rounded-2xl bg-[var(--accent-strong)] px-8 py-6 text-lg text-[var(--accent-strong-foreground)] transition hover:scale-105 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[var(--accent-strong)]/60"
              >
                <a
                  href="https://github.com/FerrisMind/Oxide-Lab/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadSimpleIcon className="mr-2 h-5 w-5" aria-hidden />
                  {hero.downloadCta}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl border-[color:var(--link)] px-8 py-6 text-lg text-[color:var(--link)] hover:bg-[color:var(--link)]/10 focus-visible:ring-[color:var(--link)]/60"
              >
                <a
                  href="https://github.com/FerrisMind/Oxide-Lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={hero.githubAria}
                >
                  <GithubLogoIcon className="mr-2 h-5 w-5" aria-hidden />
                  {hero.githubCta}
                </a>
              </Button>
              </motion.div>
            )}

            {showButtons && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-16 text-sm font-mono text-[color:var(--muted-foreground)]"
              >
                {hero.statsTagline}
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="sr-only">{hero.scrollHint}</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[color:var(--link)]/50 p-2">
            <motion.div
              className="h-2 w-1 rounded-full bg-[color:var(--link)]"
              animate={{ opacity: [0, 1, 0], y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      <section className="relative bg-[color:var(--surface-muted)] py-24 transition sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2
              className="mb-6 text-[color:var(--accent-strong)]xl font-bold sm:text-5xl md:text-6xl"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="gradient-text">{featuresTitle}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[color:var(--muted-foreground)]">{featuresSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = featureIcons[index] ?? ShieldIcon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="gradient-border layered-shadow group cursor-pointer p-8 transition-all duration-300 hover:shadow-xl"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        `0 0 20px ${feature.color}30`,
                        `0 0 30px ${feature.color}40`,
                        `0 0 20px ${feature.color}30`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: feature.color }} aria-hidden />
                  </motion.div>
                  <h3
                    className="mb-3 text-xl font-bold text-[var(--foreground)]"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-[color:var(--muted-foreground)]">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--background)] py-24 transition sm:py-32">
        <div className="absolute inset-0 mesh-gradient" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2
              className="mb-6 text-[color:var(--accent-strong)]xl font-bold sm:text-5xl md:text-6xl"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="gradient-text">{demo.title}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[color:var(--muted-foreground)]">{demo.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="floating-card relative mx-auto max-w-5xl p-[1px]"
          >
            <div className="gradient-border">
              <div className="overflow-hidden rounded-[19px] bg-[color:var(--surface)]">
                <div className="flex items-center gap-2 border-b border-[color:var(--border)] bg-[color:var(--surface-elevated)] px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-[color:var(--destructive)]/60" />
                    <div className="h-3 w-3 rounded-full bg-[color:var(--accent-strong)]/60" />
                    <div className="h-3 w-3 rounded-full bg-[color:var(--link)]/60" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs font-mono text-[color:var(--muted-foreground)]">{demo.browserLabel}</span>
                  </div>
                </div>

                <div className="space-y-6 bg-[var(--background)] p-8">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-[color:var(--link)] to-[color:var(--accent-strong)]" />
                    <div className="flex-1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-4 text-left">
                      <p className="text-[var(--foreground)]">{demo.messages.assistantGreeting}</p>
                    </div>
                  </div>

                  <div className="flex flex-row-reverse gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-[color:var(--surface-elevated)]" />
                    <div className="flex-1 rounded-2xl border border-[color:var(--link)]/25 bg-[color:var(--link)]/10 p-4 text-left">
                      <p className="text-[var(--foreground)]">{demo.messages.userRequest}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-[color:var(--link)] to-[color:var(--accent-strong)]" />
                    <div className="flex-1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-4 text-left">
                      <p className="mb-3 text-[var(--foreground)]">{demo.messages.assistantSummaryTitle}</p>
                      <div className="space-y-2 text-sm font-mono text-[color:var(--muted-foreground)]">
                        {demo.messages.metrics.map((metric) => (
                          <div key={metric} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[color:var(--link)]" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="layered-shadow absolute -top-8 -right-8 flex h-32 w-32 items-center justify-center rounded-2xl border border-[color:var(--accent-strong)]/35 bg-[color:var(--accent-strong)]/12 backdrop-blur-sm"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              aria-label={demo.floatingLockLabel}
            >
              <LockSimpleIcon className="h-12 w-12 text-[color:var(--accent-strong)]" aria-hidden />
            </motion.div>

            <motion.div
              className="layered-shadow absolute -bottom-8 -left-8 flex h-32 w-32 items-center justify-center rounded-2xl border border-[color:var(--link)]/35 bg-[color:var(--link)]/12 backdrop-blur-sm"
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              aria-label={demo.floatingCpuLabel}
            >
              <CpuIcon className="h-12 w-12 text-[color:var(--link)]" aria-hidden />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[color:var(--surface-muted)] py-24 transition sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl border border-[color:var(--destructive)]/25 bg-[color:var(--destructive)]/12">
              <ShieldIcon className="h-12 w-12 text-[color:var(--destructive)]" aria-hidden />
            </div>
            <h2
              className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="gradient-text">{privacy.title}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[color:var(--muted-foreground)]">{privacy.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(privacy.items ?? []).map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="layered-shadow rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition hover:-translate-y-2 hover:border-[color:var(--link)]/30 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="mt-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden
                  />
                  <div>
                    <h3
                      className="mb-2 text-lg font-bold text-[var(--foreground)]"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <footer className="bg-[var(--background)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3
                className="mb-4 text-2xl font-bold text-[var(--foreground)] flex items-center gap-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <Image src="/icon.svg" alt="Oxide Lab" width={32} height={32} className="flex-shrink-0" />
                <span className="gradient-text">{t("header.title") as string}</span>
              </h3>
              <p className="mb-6 leading-relaxed text-[color:var(--muted-foreground)]">{t("header.subtitle") as string}</p>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/FerrisMind/Oxide-Lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={footer.social.github}
                  whileHover={{ scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--link)]/25 bg-[color:var(--link)]/12 transition-colors duration-300 hover:bg-[color:var(--link)]/18"
                >
                  <GithubLogoIcon className="h-5 w-5 text-[color:var(--link)]" aria-hidden />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label={footer.social.community}
                  whileHover={{ scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--accent-strong)]/25 bg-[color:var(--accent-strong)]/12 transition-colors duration-300 hover:bg-[color:var(--accent-strong)]/18"
                >
                  <Image src="/gitverse.svg" alt={footer.social.community} width={20} height={20} />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label={footer.social.website}
                  whileHover={{ scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--destructive)]/25 bg-[color:var(--destructive)]/12 transition-colors duration-300 hover:bg-[color:var(--destructive)]/18"
                >
                  <GlobeIcon className="h-5 w-5 text-[color:var(--destructive)]" aria-hidden />
                </motion.a>
              </div>
            </div>

            <div>
              <h4
                className="mb-4 text-lg font-bold text-[var(--foreground)]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {footer.resourcesTitle}
              </h4>
              <ul className="space-y-3">
                {(footer.resources ?? []).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[color:var(--muted-foreground)] transition-colors duration-200 hover:text-[color:var(--link)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="mb-4 text-lg font-bold text-[var(--foreground)]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {footer.technicalTitle}
              </h4>
              <ul className="space-y-3 font-mono text-sm text-[color:var(--muted-foreground)]">
                {(footer.technical ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-[color:var(--border)] pt-8 md:flex-row">
            <p className="font-mono text-sm text-[color:var(--muted-foreground)]">
              {(footer.copyright as string)?.replace("{year}", currentYear.toString())}
            </p>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <p className="text-sm text-[color:var(--muted-foreground)]">{footer.privacyLine}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
