import Link from "next/link";
import NotFoundView from "@/components/NotFoundView";
import { Badge } from "@/components/ProductCard";
import { getProductBySlug, bn, dirOf, tk, unitBn, unitShort } from "@/lib/api";
export default async function Page({ params }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return <NotFoundView text="পণ্যটি খুঁজে পাওয়া যায়নি" />;
  const ms = p.markets ?? [], d = dirOf(p), diff = Math.abs(p.today - p.yesterday);
  const avgOf = (m) => (m.min + m.max) / 2;
  const min = ms.length ? Math.min(...ms.map((m) => m.min)) : p.today;
  const max = ms.length ? Math.max(...ms.map((m) => m.max)) : p.today;
  const avg = ms.length ? ms.reduce((s, m) => s + avgOf(m), 0) / ms.length : p.today;
  const when = d === "up" ? `আজ দাম বেড়েছে · ${tk(diff)}` : d === "down" ? `আজ দাম কমেছে · ${tk(diff)}` : "আজ দাম অপরিবর্তিত";
  const Stat = ({ l, v, c = "", s }) => (
    <div className="card-s px-[25px] py-[17px]"><p className="text-xs leading-[18px]">{l}</p><p className={`text-2xl font-bold leading-8 ${c}`}>{tk(v)}</p><p className="text-xs leading-[18px]">{s}</p></div>
  );
  const th = "px-4 py-3 text-sm font-bold";
  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-3 py-2 text-sm">
        <Link href="/" className="hover:underline">হোম</Link><span className="text-xs">›</span>
        <Link href={`/category/${p.category}`} className="hover:underline">{p.categoryNameBn}</Link><span className="text-xs">›</span><span>{p.nameBn}</span>
      </nav>
      <div className="card-s flex flex-col gap-4 p-[21px] sm:flex-row sm:items-center">
        <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl">{p.image}</span>
        <div className="flex-1">
          <h1 className="text-3xl font-bold leading-9">{p.nameBn}</h1>
          <p className="text-sm">{unitBn(p.unit)} · {p.categoryNameBn}</p>
          <p className="mt-2 text-sm">{d === "flat" ? "গতকালের তুলনায় " : "গতকালের তুলনায় "}{when}</p>
        </div>
        <div className="rounded-2xl bg-base-200 px-4 py-4 text-center"><p className="text-sm">আজকের দাম</p><p className="text-3xl font-bold leading-9">{bn(p.today)}</p><p className="text-sm">টাকা / {unitShort(p.unit)}</p><div className="mt-1 flex justify-center"><Badge p={p} big /></div></div>
      </div>
      <div className="card-s space-y-6 p-[21px]">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold leading-7">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat l="সর্বনিম্ন দাম" v={min} c="text-success" s="সবচেয়ে কম দামের বাজার" />
            <Stat l="সর্বোচ্চ দাম" v={max} c="text-error" s="সবচেয়ে বেশি দামের বাজার" />
            <Stat l="গড় দাম" v={avg} s="সব বাজারের গড়" />
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-lg font-semibold leading-7">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead><tr><th className={`${th} text-left`}>বাজার</th><th className={`${th} text-left`}>বিভাগ</th><th className={`${th} text-right`}>সর্বনিম্ন</th><th className={`${th} text-right`}>সর্বাধিক</th><th className={`${th} text-right`}>গড়</th></tr></thead>
              <tbody>{ms.map((m, i) => (
                <tr key={m.market} className={i % 2 ? "bg-base-200" : ""}>
                  <td className="px-4 py-3 font-medium">{m.market}</td><td className="px-4 py-3">{m.division}</td>
                  <td className="px-4 py-3 text-right">{tk(m.min)}</td><td className="px-4 py-3 text-right">{tk(m.max)}</td><td className="px-4 py-3 text-right font-semibold">{tk(avgOf(m))}</td>
                </tr>))}</tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
