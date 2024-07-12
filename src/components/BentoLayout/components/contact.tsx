import Link from "next/link";
import Card from "~/components/Card";
import Button from "~/components/Button";
import socials from "~/config/socials";

export default function Contact() {
  return (
    <Card className="flex flex-col justify-center gap-6 p-8">
      <h2 className="cancel-drag text-2xl font-bold max-md:text-center text-gradient ">
        开启合作，共创未来
      </h2>
      <p className="leading-relaxed text-lg animate-fade-in">
        从奇思妙想到落地实现，我愿与你一同前行。
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
          联系我
        </Button>
        <div className="inline-flex gap-6">
          {socials.map(social => (
            <Link
              key={social.name}
              href={social.url}
              className="cancel-drag text-[1.3rem]"
              aria-label={`我的 ${social.name}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className={social.icon}
              />
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
