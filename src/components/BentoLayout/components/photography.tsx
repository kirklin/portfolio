import Link from "next/link";
import Card from "~/components/Card";
import Button from "~/components/Button";

export default function Photography() {
  return (
    <Card className="relative flex h-full flex-col items-center justify-center bg-[#eaf9f2]">
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
          <span className="sr-only">Photography</span>
        </Button>
      </div>
      <svg className="i-tabler:camera-selfie text-gray-950 dark:text-white text-[4rem]" />
    </Card>
  );
}
