// app/layout.js
import { UserProvider } from "@/app/Auth/userContext";
import "./globals.css";
import LayoutWrapper from "./Auth/layoutWrapper";

export const metadata = {
  title: "LearnDesk MIS Software",
  description:
    "A modern Management Information System for training centers, institutes, and educational organizations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen text-black font-sans antialiased bg-white">
        <UserProvider>
          <LayoutWrapper>
            <main className="flex-grow w-full max-w-[1980px] mx-auto">
              {children}
            </main>
          </LayoutWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
