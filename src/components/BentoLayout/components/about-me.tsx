import Image from "next/image";
import avatar from "~/assets/images/avatar.jpeg";
import Card from "~/components/Card";

export default function AboutMe() {
  return (
    <Card className="flex flex-col justify-center gap-4 p-8">
      <div className="relative size-14 overflow-hidden rounded-full sm:size-16">
        <Image
          src={avatar}
          alt="Kirk Lin"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          priority
        />
      </div>
      <p className="text-balance leading-relaxed">
        I&apos;m
        {" "}
        <span className="text-xl font-semibold">Kirk Lin</span>
        ,
        an engineer who always strives to inject artistic soul and humanistic care into code.
        {" "}
      </p>
    </Card>
  );
}
