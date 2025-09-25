import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/language-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Oxide Lab - Your Personal AI Assistant",
  description:
    "Discover the future of AI with Oxide Lab, a personal AI assistant that is private, elegant, and intuitive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Отключить контекстное меню
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
              });
              
              // Отключить горячие клавиши для копирования
              document.addEventListener('keydown', function(e) {
                // Ctrl+C, Ctrl+A, Ctrl+V, Ctrl+X, Ctrl+S, F12, Ctrl+Shift+I, Ctrl+U
                if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 65 || e.keyCode === 86 || e.keyCode === 88 || e.keyCode === 83 || e.keyCode === 85)) {
                  e.preventDefault();
                  return false;
                }
                // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
                if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67))) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // Отключить выделение текста
              document.addEventListener('selectstart', function(e) {
                e.preventDefault();
                return false;
              });
              
              // Отключить перетаскивание
              document.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
              });
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "font-body antialiased overflow-x-hidden",
          inter.variable
        )}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
