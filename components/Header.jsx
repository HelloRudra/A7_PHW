"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import DateText from "./DateText";
export default function Header({ categories }) {
  const path = usePathname(), router = useRouter(), ref = useRef(null);
  const { data, isPending } = useSession();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => setOpen(false), [path]);
  const out = async () => {
    await signOut(); setOpen(false); toast.success("সাইন আউট সফল হয়েছে"); router.push("/"); router.refresh();
  };
  const u = data?.user;
  const itemCls = "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm hover:bg-base-content hover:text-base-100";
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-lg text-primary-content">🛒</span>
          <span className="min-w-0"><b className="block text-xl leading-7">বাজার দর</b><span className="block text-xs leading-4"><DateText /></span></span>
        </Link>
        {isPending ? <div className="skeleton h-10 w-28" /> : u ? (
          <div className="relative" ref={ref}>
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="fb fb-g gap-2 !px-[3px] sm:!px-[17px]">
              {u.image ? <img src={u.image} alt="" className="size-8 rounded-[10px] sm:size-9" /> : <span className="grid size-8 place-items-center rounded-[10px] bg-primary text-primary-content sm:size-9">{(u.name || "?")[0]}</span>}
              <span className="hidden font-medium sm:inline">{u.name}</span><span className="text-xs">▾</span>
            </button>
            {open && (
              <div className="absolute right-0 z-30 mt-1 w-64 rounded-2xl border border-base-300 bg-base-100 p-[9px] shadow-lg">
                <div className="px-3 py-2"><p className="text-sm font-semibold">{u.name}</p><p className="truncate text-xs">{u.email}</p></div>
                <Link href="/profile" className={itemCls}>👤 আমার প্রোফাইল</Link>
                <button onClick={out} className={itemCls + " !text-error hover:!text-base-100"}>↩ সাইন আউট</button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2"><Link href="/signin" className="fb fb-g">সাইন ইন</Link><Link href="/signup" className="fb fb-p">সাইন আপ</Link></div>
        )}
      </div>
      <nav className="border-t border-base-300"><div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
        {categories.map((c) => {
          const active = path === `/category/${c.slug}`;
          return <Link key={c.slug} href={`/category/${c.slug}`} className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-[13px] text-xs font-semibold transition-colors ${active ? "bg-nav-active text-primary-content" : "hover:bg-hov"}`}>{c.icon} {c.nameBn}</Link>;
        })}
      </div></nav>
    </header>
  );
}
