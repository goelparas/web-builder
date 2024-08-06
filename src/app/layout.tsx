import React from "react";
import "./globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { EditorProvider } from "@/libs/context/editor.context";
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
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className=" bg-primary-foreground">
        <EditorProvider>
          <div className="w-full ">{children}</div>
        </EditorProvider>
      </body>
    </html>
  );
};

export default Layout;
