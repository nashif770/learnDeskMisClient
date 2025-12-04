// app/layout.js
import { UserProvider } from "@/userContext";
import "./globals.css";
import LayoutWrapper from "@/layoutWrapper";

export const metadata = {
  title: "LearnDesk MIS Software",
  description:
    "Empowering the next generation of righteous and educated women through faith and learning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <UserProvider>
        <body className="flex flex-col min-h-screen text-emerald-700 font-sans antialiased">
          <LayoutWrapper>
          <main className="flex-grow w-full max-w-[1980px] mx-auto bg-emerald-100">
            {children}
          </main>
          </LayoutWrapper>
        </body>
      </UserProvider>
    </html>
  );
}
