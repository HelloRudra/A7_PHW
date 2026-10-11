"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
export default function UpdateCard() {
  const { data } = useSession(), router = useRouter(), [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name").trim();
    if (!name) return toast.error("নাম লিখুন");
    setBusy(true);
    const { error } = await authClient.updateUser({ name });
    setBusy(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য আপডেট হয়েছে"); router.refresh();
  }
  return (
    <form key={data?.user?.name} onSubmit={submit} className="flex flex-col gap-4 p-6">
      <label className="flex flex-col gap-1 text-sm font-medium">নাম<input name="name" defaultValue={data?.user?.name} className="fin font-normal" /></label>
      <button disabled={busy} className="fb fb-p !h-10 !px-[17px] !text-sm w-full">{busy ? <span className="loading loading-spinner loading-sm" /> : "আপডেট"}</button>
    </form>
  );
}
