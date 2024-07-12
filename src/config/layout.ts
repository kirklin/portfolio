import type { Layout } from "react-grid-layout";

// 定义布局项的接口
interface LayoutItem {
  i: string; // 唯一标识符
  x: number; // X坐标
  y: number; // Y坐标
  w: number; // 宽度
  h: number; // 高度
}

// 定义所有可能的组件ID
export type ComponentId =
  | "about-me"
  | "github"
  | "theme"
  | "skills"
  | "experience"
  | "location"
  | "projects"
  | "contact"
  | "blog"
  | "hackathon-projects"
  | "photography";

// 创建基础布局函数
function createLayout(layouts: Partial<Record<ComponentId, LayoutItem>>): Layout[] {
  return Object.values(layouts) as Layout[];
}

// 超大屏幕布局
export const xlLayout: Layout[] = createLayout({
  "about-me": { i: "about-me", x: 0, y: 0, w: 2, h: 1 },
  "github": { i: "github", x: 2, y: 0, w: 1, h: 1 },
  "theme": { i: "theme", x: 3, y: 0, w: 1, h: 1 },
  "skills": { i: "skills", x: 0, y: 1, w: 1, h: 1 },
  "experience": { i: "experience", x: 1, y: 1, w: 2, h: 1 },
  "location": { i: "location", x: 3, y: 1, w: 1, h: 1 },
  "projects": { i: "projects", x: 0, y: 2, w: 2, h: 1 },
  "hackathon-projects": { i: "hackathon-projects", x: 2, y: 2, w: 2, h: 1 },
  "blog": { i: "blog", x: 0, y: 3, w: 2, h: 1 },
  "photography": { i: "photography", x: 2, y: 3, w: 1, h: 1 },
  "contact": { i: "contact", x: 3, y: 3, w: 1, h: 1 },
});

// 大屏幕布局
export const lgLayout: Layout[] = createLayout({
  "about-me": { i: "about-me", x: 0, y: 0, w: 2, h: 1 },
  "github": { i: "github", x: 2, y: 0, w: 1, h: 1 },
  "theme": { i: "theme", x: 3, y: 0, w: 1, h: 1 },
  "skills": { i: "skills", x: 0, y: 1, w: 1, h: 1 },
  "experience": { i: "experience", x: 1, y: 1, w: 2, h: 1 },
  "location": { i: "location", x: 3, y: 1, w: 1, h: 1 },
  "projects": { i: "projects", x: 0, y: 2, w: 2, h: 1 },
  "hackathon-projects": { i: "hackathon-projects", x: 2, y: 2, w: 2, h: 1 },
  "blog": { i: "blog", x: 0, y: 3, w: 2, h: 1 },
  "photography": { i: "photography", x: 2, y: 3, w: 1, h: 1 },
  "contact": { i: "contact", x: 3, y: 3, w: 1, h: 1 },
});

// 中等屏幕布局
export const mdLayout: Layout[] = createLayout({
  "about-me": { i: "about-me", x: 0, y: 0, w: 2, h: 1 },
  "github": { i: "github", x: 2, y: 0, w: 1, h: 1 },
  "theme": { i: "theme", x: 3, y: 0, w: 1, h: 1 },
  "skills": { i: "skills", x: 0, y: 1, w: 2, h: 1 },
  "experience": { i: "experience", x: 2, y: 1, w: 2, h: 1 },
  "location": { i: "location", x: 0, y: 2, w: 1, h: 1 },
  "projects": { i: "projects", x: 1, y: 2, w: 3, h: 1 },
  "hackathon-projects": { i: "hackathon-projects", x: 0, y: 3, w: 2, h: 1 },
  "blog": { i: "blog", x: 2, y: 3, w: 2, h: 1 },
  "photography": { i: "photography", x: 0, y: 4, w: 2, h: 1 },
  "contact": { i: "contact", x: 2, y: 4, w: 2, h: 1 },
});

// 小屏幕布局
export const smLayout: Layout[] = createLayout({
  "about-me": { i: "about-me", x: 0, y: 0, w: 2, h: 1 },
  "github": { i: "github", x: 0, y: 1, w: 1, h: 1 },
  "theme": { i: "theme", x: 1, y: 1, w: 1, h: 1 },
  "skills": { i: "skills", x: 0, y: 2, w: 2, h: 1 },
  "experience": { i: "experience", x: 0, y: 3, w: 2, h: 1 },
  "location": { i: "location", x: 0, y: 4, w: 2, h: 1 },
  "projects": { i: "projects", x: 0, y: 5, w: 2, h: 1 },
  "hackathon-projects": { i: "hackathon-projects", x: 0, y: 6, w: 2, h: 1 },
  "blog": { i: "blog", x: 0, y: 7, w: 2, h: 1 },
  "photography": { i: "photography", x: 0, y: 8, w: 2, h: 1 },
  "contact": { i: "contact", x: 0, y: 9, w: 2, h: 1 },
});
