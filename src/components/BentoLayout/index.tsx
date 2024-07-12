"use client";

import { useCallback, useEffect, useState } from "react";
import type { Layout, ReactGridLayoutProps } from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "~/assets/styles/react-grid-layout.css";
import { cn } from "~/utils/cn";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps extends ReactGridLayoutProps {
  xlLayout: Layout[];
  lgLayout: Layout[];
  mdLayout: Layout[];
  smLayout: Layout[];
}

const BREAKPOINTS = {
  xl: 1368,
  lg: 1280,
  md: 1024,
  sm: 768,
  xs: 640,
  xxs: 0,
} as const;

const COLS = {
  xl: 4,
  lg: 4,
  md: 4,
  sm: 2,
  xs: 2,
  xxs: 2,
} as const;

const ROW_HEIGHTS = {
  xl: 300,
  lg: 280,
  md: 260,
  sm: 240,
  xs: 220,
  xxs: 200,
} as const;

export default function BentoLayout({
  xlLayout,
  lgLayout,
  mdLayout,
  smLayout,
  className,
  children,
}: GridLayoutProps) {
  const [breakpoint, setBreakpoint] = useState<keyof typeof BREAKPOINTS>("xl");
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(0);

  const handleResize = useCallback(() => {
    const currentWidth = window.innerWidth;
    setWidth(currentWidth);
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const newBreakpoint = Object.entries(BREAKPOINTS).reduce((acc, [key, value]) => currentWidth > value ? key : acc,
    ) as unknown as keyof typeof BREAKPOINTS;
    setBreakpoint(newBreakpoint);
  }, []);

  useEffect(() => {
    setMounted(true);
    handleResize();
  }, [handleResize]);

  const responsiveProps = {
    layouts: { xl: xlLayout, lg: lgLayout, md: mdLayout, sm: smLayout },
    breakpoints: BREAKPOINTS,
    cols: COLS,
    width,
    isBounded: true,
    isResizable: false,
    rowHeight: ROW_HEIGHTS[breakpoint],
    useCSSTransforms: false,
    measureBeforeMount: false,
    draggableCancel: ".cancel-drag",
    onBreakpointChange: setBreakpoint,
    onWidthChange: setWidth,
  };

  return (
    <section
      className={cn(
        "mx-auto max-w-[1368px] max-xl:max-w-[1280px] max-lg:max-w-[1024px] max-md:max-w-[768px] max-sm:max-w-[640px]",
        className,
      )}
    >
      <ResponsiveGridLayout
        className="transition-opacity duration-500 ease-in-out"
        style={{
          opacity: mounted ? 100 : 0,
          transform: mounted ? "translateY(0)" : "translateY(48px)",
          transition: "opacity 500ms, transform 500ms",
        }}
        margin={[20, 20]}
        {...responsiveProps}
      >
        {children}
      </ResponsiveGridLayout>
    </section>
  );
}
