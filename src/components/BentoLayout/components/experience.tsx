import Link from "next/link";
import Card from "~/components/Card";
import Button from "~/components/Button";

export default function Experience() {
  return (
    <Card className="flex flex-col justify-center gap-6 p-8 bg-blue-100">
      <h2 className="cancel-drag text-2xl font-bold max-md:text-center text-gradient ">
        非凡体验
      </h2>
      <p className="leading-relaxed text-lg animate-fade-in">
        在这里，每一段经历都是一次创新的旅程。从技术突破到团队协作，每一步都展现了卓越与创造力的完美结合。探索我的职业旅程，感受科技与艺术的激情碰撞。

      </p>
      <div className="inline-flex flex-col items-center gap-6 lg:flex-row">
        <Button
          as={Link}
          className="cancel-drag px-4 py-2"
          href="https://github.com/kirklin/"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className="i-tabler:arrow-right -rotate-45 transition-transform duration-500 group-hover:rotate-0"
          />
          探索更多
        </Button>
      </div>
    </Card>
  );
}
