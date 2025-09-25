"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import {
  Monitor,
  Cpu,
  Memory,
  GraphicsCard,
  HardDrive,
  WifiHigh,
} from "@phosphor-icons/react";

export default function SystemRequirementsSection() {
  const { t } = useLanguage();

  const requirements = [
    {
      icon: <Monitor className="h-6 w-6 text-accent" weight="light" />,
      key: "os",
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent" weight="light" />,
      key: "cpu",
    },
    {
      icon: <Memory className="h-6 w-6 text-accent" weight="light" />,
      key: "ram",
    },
    {
      icon: <GraphicsCard className="h-6 w-6 text-accent" weight="light" />,
      key: "gpu",
    },
    {
      icon: <HardDrive className="h-6 w-6 text-accent" weight="light" />,
      key: "storage",
    },
    {
      icon: <WifiHigh className="h-6 w-6 text-accent" weight="light" />,
      key: "internet",
    },
  ];

  const recommendedRequirements = [
    {
      icon: <Monitor className="h-6 w-6 text-accent" weight="light" />,
      key: "os",
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent" weight="light" />,
      key: "cpu",
    },
    {
      icon: <Memory className="h-6 w-6 text-accent" weight="light" />,
      key: "ram",
    },
    {
      icon: <GraphicsCard className="h-6 w-6 text-accent" weight="light" />,
      key: "gpu",
    },
    {
      icon: <HardDrive className="h-6 w-6 text-accent" weight="light" />,
      key: "storage",
    },
    {
      icon: <HardDrive className="h-6 w-6 text-accent" weight="light" />,
      key: "ssd",
    },
  ];

  return (
    <section
      id="system-requirements"
      className="pt-8 pb-20 md:pt-12 md:pb-32 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#1b1c3a" }}
          >
            {t("systemRequirements.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Минимальные требования */}
          <Card className="bg-card border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle
                className="text-xl font-semibold"
                style={{ color: "#1b1c3a" }}
              >
                {t("systemRequirements.minimal.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0">{req.icon}</div>
                  <p className="text-sm" style={{ color: "#1b1c3a" }}>
                    {t(`systemRequirements.minimal.${req.key}`)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Рекомендуемые требования */}
          <Card className="bg-card border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle
                className="text-xl font-semibold"
                style={{ color: "#1b1c3a" }}
              >
                {t("systemRequirements.recommended.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0">{req.icon}</div>
                  <p className="text-sm" style={{ color: "#1b1c3a" }}>
                    {t(`systemRequirements.recommended.${req.key}`)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
