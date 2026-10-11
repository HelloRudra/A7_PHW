"use client";
import { useMemo, useState } from "react";
import ProductCard, { Grid } from "./ProductCard";
import SortSelect, { sortItems } from "./SortSelect";
import { bn } from "@/lib/api";
export default function ProductsExplorer({ products, categories }) {
  const [q, setQ] = useState(""), [cat, setCat] = useState(""), [sort, setSort] = useState("default");
  const items = useMemo(() => sortItems(products.filter((p) => (!cat || p.category === cat) && p.nameBn.includes(q.trim())), sort), [products, q, cat, sort]);
  const chip = "inline-flex h-6 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-[9px] text-[11px] font-semibold transition-colors";
  return (
    <div className="space-y-4">
      <div className="card-s flex flex-col gap-3 p-[17px] lg:flex-row lg:items-center">
        <label className="flex h-10 items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-[13px] text-sm focus-within:border-primary">🔍
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="পণ্যের নাম লিখুন…" className="w-full min-w-0 bg-transparent outline-none lg:w-44" /></label>
        <div className="flex flex-1 gap-1 overflow-x-auto">
          <button onClick={() => setCat("")} className={`${chip} ${!cat ? "bg-primary text-primary-content" : "hover:bg-hov"}`}>সব</button>
          {categories.map((c) => <button key={c.slug} onClick={() => setCat(c.slug)} className={`${chip} ${cat === c.slug ? "bg-primary text-primary-content" : "hover:bg-hov"}`}>{c.icon} {c.nameBn}</button>)}
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <p className="text-sm">মোট {bn(items.length)}টি পণ্য দেখানো হচ্ছে</p>
      {items.length ? <Grid>{items.map((p) => <ProductCard key={p.id} p={p} />)}</Grid> : <p className="card-s p-8 text-center text-sm">কোনো পণ্য পাওয়া যায়নি।</p>}
    </div>
  );
}
