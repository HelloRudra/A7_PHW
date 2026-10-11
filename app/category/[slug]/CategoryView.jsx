"use client";
import { useState } from "react";
import ProductCard, { Grid } from "@/components/ProductCard";
import SortSelect, { sortItems } from "@/components/SortSelect";
import { bn } from "@/lib/api";
export default function CategoryView({ cat, items }) {
  const [sort, setSort] = useState("default");
  return (
    <div className="space-y-6">
      <div className="card-s flex items-center gap-3 p-[21px]">
        <span className="text-4xl leading-10">{cat.icon}</span>
        <div><h1 className="text-2xl font-bold leading-8">{cat.nameBn}</h1><p className="text-sm">{bn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p></div>
      </div>
      <div className="space-y-4">
        <div className="card-s flex justify-end p-[17px]"><SortSelect value={sort} onChange={setSort} /></div>
        <p className="text-sm">মোট {bn(items.length)}টি পণ্য দেখানো হচ্ছে</p>
        <Grid>{sortItems(items, sort).map((p) => <ProductCard key={p.id} p={p} />)}</Grid>
      </div>
    </div>
  );
}
