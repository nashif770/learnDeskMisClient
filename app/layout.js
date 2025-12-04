// app/layout.js
import { UserProvider } from "@/userContext";
import "./globals.css";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

export const metadata = {
  title: "Al Furkan Girls Madrasa",
  description:
    "Empowering the next generation of righteous and educated women through faith and learning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen text-emerald-700 font-sans antialiased">
        {/* Navbar - floating */}
        <UserProvider>
          <header className="fixed inset-x-0 z-50 pointer-events-auto">
            <div className="w-full max-w-[1980px] mx-auto">
              <Navbar />
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-16 flex-gro w-full max-w-[1980px] h-screen mx-auto">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-auto w-full max-w-[1980px] mx-auto">
            <Footer />
          </footer>
        </UserProvider>
      </body>
    </html>
  );
}
