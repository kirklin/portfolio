import Link from "next/link";
import Card from "~/components/Card";
import Button from "~/components/Button";

export default function Projects() {
  return (
    <Card className="flex flex-col justify-center gap-6 p-8">
      <h2 className="cancel-drag text-2xl font-bold max-md:text-center text-gradient">
        项目
      </h2>
      <p className="leading-relaxed text-lg animate-fade-in">
        在这里，你可以找到我所参与和开发的各类项目。从开源工具到个人实验，每一个项目都展示了我对技术的热情和探索精神。
      </p>
      <div className="inline-flex flex-col items-center gap-6 lg:flex-row">
        <Button
          as={Link}
          className="cancel-drag px-4 py-2"
          href="https://github.com/kirklin?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className="i-tabler:arrow-right -rotate-45 transition-transform duration-500 group-hover:rotate-0"
          />
        </Button>
      </div>
    </Card>
  );
}
