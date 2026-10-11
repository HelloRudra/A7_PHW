"use client";
export default function SortSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">সাজান
      <span className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="h-8 cursor-pointer appearance-none rounded-lg border border-base-300 bg-base-100 pl-[13px] pr-8 text-xs outline-none focus:border-primary">
          <option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 size-2.5 -translate-y-1/2" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l3 3 3-3" /></svg>
      </span>
    </label>
  );
}
export const sortItems = (items, s) => [...items].sort((a, b) => (s === "asc" ? a.today - b.today : s === "desc" ? b.today - a.today : 0));
