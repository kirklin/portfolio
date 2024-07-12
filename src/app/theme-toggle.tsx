"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "~/utils/cn";
import Button from "~/components/Button";

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Button
      className="cancel-drag flex h-10 w-20 items-center p-0 justify-start rounded-full bg-gray-200 transition duration-500 focus:outline-none lg:h-12 lg:w-24"
      onClick={handleToggle}
    >
      <div
        className={cn(
                    `flex size-10 items-center justify-center rounded-full border-2 border-gray-200 text-white transition duration-500 lg:size-12 lg:border-4`,
                    theme === "dark"
                      ? "translate-x-full bg-dark-700"
                      : "bg-yellow-500",
        )}
      >
        {theme === "dark" ? <svg className="i-tabler:moon-stars" /> : <svg className="i-tabler:sun-high" />}
      </div>
    </Button>
  );
}
