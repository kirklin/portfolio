import Card from "~/components/Card";
import Button from "~/components/Button";

export default function Skills() {
  const skills = [
    "Vue",
    "React",
    "Spring Boot",
    "Spring Cloud",
    "TypeScript",
    "Java",
    "Python",
    "Rust",
    "MySQL",
    "Redis",
    "GraphQL",
  ];

  return (
    <Card className="flex h-full flex-col justify-between gap-3 p-8">
      <h2 className="text-2xl font-bold">我的技能</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <Button
            key={index}
            className="bg-gray-100 text-gray-800 px-2 py-1 mx-1 rounded-full text-sm"
          >
            {skill}
          </Button>
        ))}
      </div>
    </Card>
  );
}
