'use client'
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

type Props = {};
const templates = [
  { id: 1, name: "Template 1" },
  { id: 2, name: "Template 2" },
];
const page = (props: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full h-full">
      <nav className="flex justify-between p-4">
        
        <h1 className="text-3xl font-bold">Select a Template</h1>
        <Switch onCheckedChange={()=>setTheme('dark')}></Switch>
      </nav>

      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <Link href={`/editor/${template.id}`}>{template.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
