import NotFoundView from "@/components/NotFoundView";
import CategoryView from "./CategoryView";
import { getProducts, getCategories } from "@/lib/api";
export default async function Page({ params }) {
  const { slug } = await params;
  const [items, cats] = await Promise.all([getProducts(`?category=${encodeURIComponent(slug)}`), getCategories()]);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat || !items.length) return <NotFoundView text="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি" />;
  return <CategoryView cat={cat} items={items} />;
}
