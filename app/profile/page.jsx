"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UpdateCard from "@/components/UpdateCard";
import { useSession, signOut } from "@/lib/auth-client";
export default function Profile() {
  const { data, isPending } = useSession(), router = useRouter(), u = data?.user;
  if (isPending || !u) return <div className="mx-auto max-w-3xl space-y-6"><div className="skeleton h-14" /><div className="skeleton h-[120px] rounded-2xl" /><div className="skeleton h-[251px] rounded-2xl" /></div>;
  const out = async () => { await signOut(); toast.success("সাইন আউট সফল হয়েছে"); router.push("/"); router.refresh(); };
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div><h1 className="text-2xl font-bold leading-8">আমার প্রোফাইল</h1><p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p></div>
      <div className="card-s flex flex-wrap items-center gap-4 p-[25px]">
        {u.image ? <img src={u.image} alt="" className="size-20 rounded-2xl" /> : <span className="grid size-20 place-items-center rounded-2xl bg-primary text-3xl font-semibold text-primary-content">{(u.name || "?")[0]}</span>}
        <div className="min-w-0 flex-1"><p className="text-xl font-semibold leading-7">{u.name}</p><p className="truncate">{u.email}</p></div>
        <button onClick={out} className="fb fb-e">↩ সাইন আউট</button>
      </div>
      <div className="card-s p-[21px]"><h2 className="text-lg font-semibold leading-7">তথ্য</h2><UpdateCard /></div>
    </div>
  );
}
