import ProductCard, { Grid } from "@/components/ProductCard";
import ProductsExplorer from "@/components/ProductsExplorer";
import DateText from "@/components/DateText";
import { dirColor } from "@/components/ProductCard";
import { getProducts, getCategories, dirOf, pctOf } from "@/lib/api";
const Movers = ({ icon, d, title, items }) => (
  <section className="space-y-3">
    <h2 className="flex items-center gap-2 text-xl font-bold leading-7"><span className={`text-base ${dirColor[d]}`}>{icon}</span>{title}</h2>
    <Grid>{items.map((p) => <ProductCard key={p.id} p={p} />)}</Grid>
  </section>
);
export default async function Home() {
  const [all, cats] = await Promise.all([getProducts(), getCategories()]);
  const top = (d) => all.filter((p) => dirOf(p) === d).sort((a, b) => pctOf(b) - pctOf(a)).slice(0, 6);
  return (
    <div className="space-y-10">
      <section className="card-s overflow-hidden rounded-3xl">
        <div className="flex flex-col items-center gap-6 px-4 py-10 md:flex-row md:px-6">
          <div className="flex flex-1 flex-col items-start gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"><DateText /></span>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl md:leading-[45px]">আজকের বাজারের দাম এক নজরে</h1>
            <p className="mt-1 max-w-xl">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            <a href="#সব-পণ্য" className="fb fb-p mt-3 !h-10 !px-[17px] !text-sm">সব পণ্য দেখুন</a>
          </div>
          <img src="/bazar-hero.png" alt="বাজারের ঝুড়ি" width={315} height={263} className="w-full max-w-[315px]" />
        </div>
      </section>
      <Movers icon="▲" d="up" title="আজ দাম বেড়েছে" items={top("up")} />
      <Movers icon="▼" d="down" title="আজ দাম কমেছে" items={top("down")} />
      <section id="সব-পণ্য" className="scroll-mt-4 space-y-3">
        <h2 className="text-xl font-bold leading-7">সব পণ্য</h2>
        <ProductsExplorer products={all} categories={cats} />
      </section>
    </div>
  );
}
