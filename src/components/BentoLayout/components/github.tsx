import Link from "next/link";
import Card from "~/components/Card";
import Button from "~/components/Button";

export default function Github() {
  return (
    <Card className="relative flex h-full flex-col items-center justify-center bg-[#202529]">
      <div className="absolute bottom-3 left-3">
        <Button
          as={Link}
          className="cancel-drag"
          href="https://github.com/kirklin/"
          rel="noreferrer noopener"
          target="_blank"
        >
          <svg
            className="i-tabler:arrow-right -rotate-45 transition-transform duration-500 group-hover:rotate-0"
          />
          <span className="sr-only">Github</span>
        </Button>
      </div>
      <svg className="i-line-md:github-loop text-white text-[4rem]" />
    </Card>
  );
}
