import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Todo List App",
  description: "Generated by create next app",
};

//export default function RootLayout({
//  children,
//}: Readonly<{
//  children: React.ReactNode;
//}>) {
//  return (
//    <html lang="en">
//      <body
//        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//          >
//        {children}
//      </body>
//    </html>
//  );
//}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white p-4 shadow-md">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Todo List App</h1>
                        <nav className="hidden md:flex space-x-4">
                            <Link href="/todos" className="hover:text-gray-200">
                                Todos
                            </Link>
                            <Link href="/users" className="hover:text-gray-200">
                                Users
                            </Link>
                            <Link href="/departments" className="hover:text-gray-200">
                                Departments
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Main Content with Sidebar */}
                <div className="flex flex-1 max-w-7xl mx-auto p-4">
                    {/* Sidebar */}
                    <aside className="w-64 bg-white p-4 rounded-lg shadow-md mr-4 md:hidden">
                        <nav className="space-y-2">
                            <Link href="/todos" className="block p-2 hover:bg-blue-100 rounded">
                                Todos
                            </Link>
                            <Link href="/users" className="block p-2 hover:bg-blue-100 rounded">
                                Users
                            </Link>
                            <Link href="/departments" className="block p-2 hover:bg-blue-100 rounded">
                                Departments
                            </Link>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        {children}
                    </main>
                </div>

                {/* Footer */}
                <footer className="bg-blue-600 text-white p-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Todo List App. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}