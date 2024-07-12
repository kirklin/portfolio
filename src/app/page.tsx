import BentoLayout from "~/components/BentoLayout";
import { lgLayout, mdLayout, smLayout, xlLayout } from "~/config/layout";
import { gridItems } from "~/config/grid-items";

export default function Home() {
  return (
    <>
      <main className="py-6 font-song">
        <BentoLayout
          xlLayout={xlLayout}
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
