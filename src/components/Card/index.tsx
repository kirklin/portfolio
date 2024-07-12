import React from "react";
import { cn } from "~/utils/cn";
import "./index.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "h-full cursor-grab select-none overflow-hidden rounded-3xl bg-white active:cursor-grabbing dark:bg-[#0d1117]",
        "dark:shadow-white dark:shadow-inset",
        "dark:shadow-sm transition-shadow duration-500 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
