import Link from "next/link";
import Card from "~/components/Card";
import Button from "~/components/Button";

export default function HackathonProjects() {
  return (
    <Card className="bg-orange-100 group relative p-8">
      <h2 className="cancel-drag text-2xl font-bold max-md:text-center text-gradient mb-6">
        黑客松项目
      </h2>
      <p className="leading-relaxed text-lg animate-fade-in">
        从创意到实现，我们一起创造未来。
      </p>
      <div className="absolute bottom-3 left-3">
        <Button
          as={Link}
          className="cancel-drag size-11 justify-end transition-all ease-in-out group-hover:w-full"
          href="https://github.com/kirklin/"
        >
          <span
            className="hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-in group-hover:translate-x-0 group-hover:opacity-100 md:inline"
          >
            探索更多
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
