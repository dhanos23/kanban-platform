import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <body
        className={`${plusJakartaSans.variable} bg-background text-text-primary min-h-screen`}
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="logo-transition">{children}</div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
