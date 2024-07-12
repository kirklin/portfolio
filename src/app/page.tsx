import BentoLayout from "~/components/BentoLayout";
import { lgLayout, mdLayout, smLayout } from "~/config/layout";
import { gridItems } from "~/config/grid-items";

export default function Home() {
  return (
    <>
      <main className="py-6">
        <BentoLayout
          xlLayout={lgLayout}
          lgLayout={lgLayout}
          mdLayout={mdLayout}
          smLayout={smLayout}
        >
          {gridItems.map(item => (
            <div key={item.i}><item.component /></div>
          ))}
        </BentoLayout>
      </main>
    </>
  );
}
