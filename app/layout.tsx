import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/utils/fonts";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Swift Message",
  description:
    "Swift Message — современный чат для мгновенного обмена сообщениями. Простота, скорость и надёжность.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased dark:bg-neutral-800 dark:text-neutral-100 bg-neutral-100 text-neutral-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
