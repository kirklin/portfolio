import type React from "react";
import type { ComponentId } from "~/config/layout";

import AboutMe from "~/components/BentoLayout/components/about-me";
import Github from "~/components/BentoLayout/components/github";
import Theme from "~/components/BentoLayout/components/theme";
import Skills from "~/components/BentoLayout/components/skills";
import Experience from "~/components/BentoLayout/components/experience";
import Projects from "~/components/BentoLayout/components/projects";
import Contact from "~/components/BentoLayout/components/contact";
import Blog from "~/components/BentoLayout/components/blog";
import HackathonProjects from "~/components/BentoLayout/components/hackathon-projects";
import Location from "~/components/BentoLayout/components/location";
import Photography from "~/components/BentoLayout/components/photography";

interface GridItem {
  i: ComponentId;
  component: () => React.JSX.Element;
}

export const gridItems: GridItem[] = [
  // About Me：展示您的个人简介、兴趣爱好和职业目标
  { i: "about-me", component: AboutMe },

  // GitHub：展示您的GitHub贡献和仓库
  { i: "github", component: Github },

  // 主题切换：允许用户在明暗主题间切换
  { i: "theme", component: Theme },

  // 技能：列出您的技术栈和专业技能
  { i: "skills", component: Skills },

  // 工作经验：展示您的职业经历和成就
  { i: "experience", component: Experience },

  // 位置：列出您的位置
  { i: "location", component: Location },

  // 项目展示：展示您的代表性项目和作品
  { i: "projects", component: Projects },

  // 联系方式：提供您的联系信息和社交媒体链接
  { i: "contact", component: Contact },

  // 博客：展示您的最新博客文章或技术文章
  { i: "blog", component: Blog },

  // 黑客松项目：展示您参与的黑客松项目和成果
  { i: "hackathon-projects", component: HackathonProjects },

  // 摄影作品：展示您的摄影作品集
  { i: "photography", component: Photography },
];
