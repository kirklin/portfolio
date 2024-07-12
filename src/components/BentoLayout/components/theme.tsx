import Card from "~/components/Card";
import ThemeToggle from "~/app/theme-toggle";

export default function Theme() {
  return (
    <Card className="relative flex h-full flex-col items-center justify-center">
      <ThemeToggle />
    </Card>
  );
}
