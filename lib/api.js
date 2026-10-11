const BASE = "https://openapi.programming-hero.com/api/bazardor";
const list = (j) => (Array.isArray(j) ? j : j?.data ?? j?.products ?? j?.categories ?? []);
async function get(path) {
  try {
    const r = await fetch(BASE + path, { next: { revalidate: 300 } });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}
export const getProducts = async (q = "") => list(await get("/products" + q)) ;
export const getCategories = async () => list(await get("/categories"));
export async function getProductBySlug(slug) {
  const [m] = await getProducts(`?slug=${encodeURIComponent(slug)}`);
  if (!m) return null;
  return (await get(`/products/${m.id}`)) ?? m;
}
export const bn = (n, o = {}) => Number(n).toLocaleString("bn-BD", o);
export const UNITS = { kg: "কেজি", liter: "লিটার", litre: "লিটার", l: "লিটার", dozen: "ডজন", piece: "পিস", pcs: "পিস", hali: "হালি" };
export const unitBn = (u) => "প্রতি " + (UNITS[String(u).toLowerCase()] ?? u);
export const dirOf = (p) => p.change?.dir ?? (p.today > p.yesterday ? "up" : p.today < p.yesterday ? "down" : "flat");
export const pctOf = (p) => p.change?.pct ?? (p.yesterday ? Math.abs(((p.today - p.yesterday) / p.yesterday) * 100) : 0);
export const tk = (n) => bn(n, { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }) + " টাকা";
export const unitShort = (u) => unitBn(u).replace("প্রতি ", "");
export function bnDate(d = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).formatToParts(d).map((x) => [x.type, x.value]));
  return `${p.weekday}, ${p.day} ${p.month}, ${p.year}`;
}
