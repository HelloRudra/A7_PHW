import Link from "next/link";
import { bn, dirOf, pctOf, tk, unitBn } from "@/lib/api";
export const dirColor = { up: "text-error", down: "text-success", flat: "text-base-content/60" };
export const dirIcon = { up: "▲", down: "▼", flat: "—" };
export function Badge({ p, big }) {
  const d = dirOf(p);
  return (
    <span className={`inline-flex items-center gap-1 font-semibold ${dirColor[d]} ${big ? "text-sm" : "rounded-full bg-base-200 px-2 py-1 text-xs"}`}>
      <span>{dirIcon[d]}</span>{bn(pctOf(p), { minimumFractionDigits: 1 })}%
    </span>
  );
}
export default function ProductCard({ p }) {
  return (
    <Link href={`/product/${p.slug}`} className="card-s block p-4 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl">{p.image}</span>
        <div><h3 className="font-semibold leading-6">{p.nameBn}</h3><p className="text-xs leading-4">{unitBn(p.unit)}</p></div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div><p className="text-xs leading-4">আজকের দাম</p><p className="text-xl font-bold leading-7">{tk(p.today)}</p></div>
        <Badge p={p} />
      </div>
    </Link>
  );
}
export const Grid = ({ children }) => <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
export const GridSkeleton = ({ n = 6 }) => <Grid>{Array.from({ length: n }, (_, i) => <div key={i} className="skeleton h-[138px] rounded-2xl" />)}</Grid>;
