import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetChinese, { chineseTypography } from "unocss-preset-chinese";
import presetEase from "unocss-preset-ease";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    chineseTypography(),
    presetChinese({
      chineseType: "simplified",
    }),
    presetEase(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  theme: {
    sm: "640px",
    md: "768px",
    lg: "1280px",
    xl: "1536px",
  },
  shortcuts: {
    // position
    "common-bg": "bg-gray-50 dark:bg-[#090c10]",
    "pr": "relative",
    "pa": "absolute",
    "pf": "fixed",
    "ps": "sticky",

    // position layout
    "position-x-center": "absolute left-1/2 -translate-x-1/2",
    "pxc": "position-x-center",
    "position-y-center": "absolute top-1/2 -translate-y-1/2",
    "pyc": "position-y-center",
    "position-center": "position-x-center position-y-center",
    "pc": "position-center",

    // size
    "size-0": "w-0 h-0",
    "size-full": "w-full h-full",
    "size-screen": "w-screen h-screen",
    "size-1/2": "w-1/2 h-1/2",

    // flex layout
    "flex-center": "flex justify-center items-center",
    "flex-col-center": "flex-center flex-col",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
