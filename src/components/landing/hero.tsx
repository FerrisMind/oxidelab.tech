"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, CSSProperties } from "react";
import { useLanguage } from "@/contexts/language-context";
import {
  AppleLogo,
  WindowsLogo,
  LinuxLogo,
  Cpu,
  GraphicsCard,
  MagnifyingGlass,
  X,
  RocketLaunch,
  Rocket,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ParticleStyle = {
  duration: number;
  delay: number;
  size: number;
  startX: number;
  startY: number;
};

const Particle = () => {
  const [style, setStyle] = useState<ParticleStyle | null>(null);

  useEffect(() => {
    setStyle({
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 2,
      startX: Math.random() * 80 + 10,
      startY: Math.random() * 20 - 10,
    });
  }, []);

  if (!style) {
    return null;
  }

  const particleStyles: CSSProperties = {
    width: `${style.size}px`,
    height: `${style.size}px`,
    left: `${style.startX}%`,
    top: `${style.startY}%`,
    animation: `particle-flow ${style.duration}s linear ${style.delay}s infinite`,
    boxShadow: "0 0 8px hsl(var(--accent) / 0.7)",
  };

  return (
    <div
      className="absolute rounded-full bg-gradient-accent opacity-0"
      style={particleStyles}
    />
  );
};

export default function HeroSection() {
  const { t, language } = useLanguage();
  const title = t("hero.title");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMagnifierOpen, setIsMagnifierOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_rgba(255,255,255,0)_60%)]"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 py-4 md:py-0 text-primary-foreground flex items-center min-h-screen">
        <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-8 items-center">
          <div className="text-left max-w-md">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter leading-tight whitespace-pre-line">
              {title
                .replace("🚀", "")
                .split("\n")
                .map((line, index) => (
                  <span key={index}>
                    {index === 0 ? (
                      <>
                        <span className="font-bold">{line}</span>
                        <RocketLaunch
                          className="inline-block h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-accent ml-2"
                          weight="fill"
                        />
                      </>
                    ) : (
                      <span className="text-xl sm:text-2xl md:text-3xl font-normal italic text-primary-foreground/80">
                        {line}
                      </span>
                    )}
                    {index < title.replace("🚀", "").split("\n").length - 1 && (
                      <br />
                    )}
                  </span>
                ))}
            </h1>
            <p className="mt-8 md:mt-24 text-base sm:text-lg md:text-xl max-w-lg text-primary-foreground/80">
              {t("hero.subtitle")}
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
              <div className="flex flex-col">
                <DropdownMenu onOpenChange={setIsMenuOpen} modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="lg"
                      className={cn(
                        "bg-gradient-accent text-[#1a1b39] rounded-xl px-6 shadow-lg hover:shadow-accent/50 transition-all",
                        isMenuOpen && "opacity-75"
                      )}
                    >
                      <WindowsLogo weight="light" className="h-6 w-6" />
                      <span>{t("hero.buttons.downloadWindows")}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                    <DropdownMenuItem>
                      <Cpu className="mr-2 h-5 w-5" weight="light" />
                      <span>{t("hero.dropdown.cpuOnly")}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex items-center mr-2">
                        <Cpu className="h-5 w-5" weight="light" />
                        <span className="mx-1">+</span>
                        <GraphicsCard className="h-5 w-5" weight="light" />
                      </div>
                      <span>{t("hero.dropdown.cpuGpu")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="mt-2 text-xs text-primary-foreground/60 text-center">
                  {t("hero.buttons.versionInfo")}
                </p>
              </div>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground/70 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl px-6"
                disabled
              >
                <AppleLogo weight="light" className="h-6 w-6" />
                <span>{t("hero.buttons.comingSoonMacOS")}</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground/70 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl px-6"
                disabled
              >
                <LinuxLogo weight="light" className="h-6 w-6" />
                <span>{t("hero.buttons.comingSoonLinux")}</span>
              </Button>
            </div>
          </div>
          <div className="hidden xl:flex items-center justify-end mr-[-90%]">
            <Dialog open={isMagnifierOpen} onOpenChange={setIsMagnifierOpen}>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer">
                  <img
                    src={`/static/screen1_${language}.png`}
                    alt="Oxide Lab Application Screenshot"
                    className="rounded-[12px] bg-background/20 backdrop-blur-sm shadow-2xl transition-transform group-hover:scale-105 w-full max-w-2xl scale-125"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <MagnifyingGlass
                      className="h-8 w-8 text-white"
                      weight="bold"
                    />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
                <DialogTitle className="sr-only">
                  Увеличенное изображение приложения Oxide Lab
                </DialogTitle>
                <div className="relative">
                  <img
                    src={`/static/screen1_${language}.png`}
                    alt="Oxide Lab Application Screenshot - Увеличенное изображение"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <button
                    onClick={() => setIsMagnifierOpen(false)}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
