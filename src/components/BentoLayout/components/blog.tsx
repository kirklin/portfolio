import Link from "next/link";
import Card from "~/components/Card";
import Button from "~/components/Button";

export default function Blog() {
  return (
    <Card className="group relative p-8">
      <h2 className="cancel-drag text-2xl font-bold max-md:text-center text-gradient mb-6">
        我的博客
      </h2>
      <p className="leading-relaxed text-lg animate-fade-in">
        欢迎来到我的博客，这里记录了我的技术文章、学习笔记以及生活感悟。希望我的分享能对你有所帮助和启发。

      </p>
      <div className="absolute bottom-3 left-3">
        <Button
          as={Link}
          className="cancel-drag size-11 justify-end transition-all ease-in-out group-hover:w-full"
          href="https://kirklin.cn/"
        >
          <span
            className="hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-in group-hover:translate-x-0 group-hover:opacity-100 md:inline"
          >
            访问我的博客
          </span>
          <span>
            <svg
              className="i-tabler:arrow-right -rotate-45 transition-transform duration-500 group-hover:rotate-0"
            />
          </span>
        </Button>
      </div>
    </Card>
  );
}
