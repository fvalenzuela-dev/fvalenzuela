import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ConditionalHeader from "./components/ConditionalHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FValenzuela",
  description: "Portafolio personal y hub de aplicaciones web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signUpUrl={undefined}
      signInUrl="/sign-in"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary/90",
          footer: "hidden",
        },
      }}
    >
      <html lang="en" data-color-theme="BLUE_THEME">
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
            }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConditionalHeader />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
