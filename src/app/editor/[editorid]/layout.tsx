import React from "react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return  <div className="w-full h-full">{ children }</div>
};

export default Layout;
