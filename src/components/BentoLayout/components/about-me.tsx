import Image from "next/image";
import avatar from "~/assets/images/avatar.jpeg";
import Card from "~/components/Card";

export default function AboutMe() {
  return (
    <Card className="p-8 flex flex-row-reverse font-song chinese">
      <div className="writing-vertical-rl text-right ml-4">
        <h1 className="text-4xl font-bold mb-4">我是 Kirk Lin</h1>
        <h2 className="text-xl mb-4">產品設計師，全栈开发工程师，摄影师</h2>
        <p className="text-lg md:visible invisible">
          一个始终追求在代码中注入艺术灵魂和人文关怀的工程师。
        </p>
      </div>
      <div className="flex-shrink-0">
        <div className="relative w-32 h-32 overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt="Kirk Lin"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            priority
          />
        </div>
      </div>
    </Card>
  );
}
