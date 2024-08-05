"use client";
import Link from "next/link";
import React from "react";

type Props = {};
const templates = [
  { id: 1, name: "Template 1" },
  { id: 2, name: "Template 2" },
];
const page = (props: Props) => {
  return (
    <div className="w-full h-full ">
      <nav className="flex justify-between p-4">
        <h1 className="text-3xl font-bold text-primary">Select a Template</h1>
      </nav>

      <ul>
        {templates.map((template) => (
          <li key={template.id} className="text-primary"> 
            <Link href={`/editor/${template.id}`}>{template.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
