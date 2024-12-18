import type { Metadata } from "next";

// These styles apply to every route in the application
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram downloader", 
  description: "Download Instagram videos and images",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 overflow-hidden">
        <div className="min-h-screen backdrop-blur-sm bg-white/30">
          <div className="container mx-auto px-4">
            <nav className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-white">InstaDL v1</h1>
                </div>
              </div>
            </nav>
            {children}

          </div>
        </div>
      </body>
    </html>
  );
}
