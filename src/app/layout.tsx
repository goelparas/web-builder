import React from "react";
import "./globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Fibr.ai | WebBuilder",
  description: "The  web-builder for the marketers",
};
const Layout = ({ children }: Props) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head >
        <meta charSet="UTF-8" />
      </head>
      <body className="dark">
        <div className="w-full">
           {children} 
        </div>
      </body>
    </html>
  );
};

export default Layout;
