import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Providers } from "./providers";
import { ThemeScript } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Oxide Lab - Private Local AI Chat",
  description: "Experience the power of artificial intelligence without compromising your privacy. Run advanced AI models locally on your machine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        <Providers>
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          <main>{children}</main>
          <VisualEditsMessenger />
        </Providers>
      </body>
    </html>
  );
}
