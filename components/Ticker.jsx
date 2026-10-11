import { bn, dirOf, pctOf, tk, unitShort } from "@/lib/api";
import { dirColor, dirIcon } from "./ProductCard";
export default function Ticker({ products }) {
  const list = (k) => (
    <div key={k} className="flex shrink-0">
      {products.map((p) => {
        const d = dirOf(p);
        return (
          <span key={p.id} className="flex items-center gap-1.5 whitespace-nowrap px-4 py-2 text-sm">
            <span>{p.image}</span><span className="font-medium">{p.nameBn}</span>
            <span>{tk(p.today).replace(" টাকা", "")} টাকা/{unitShort(p.unit)}</span>
            <span className={`font-semibold ${dirColor[d]}`}>{dirIcon[d]} {bn(pctOf(p), { minimumFractionDigits: 1 })}%</span>
          </span>
        );
      })}
    </div>
  );
  return <div className="overflow-hidden border-b border-base-300 bg-base-100" aria-label="দামের তালিকা"><div className="ticker-track flex w-max">{[list(0), list(1)]}</div></div>;
}
