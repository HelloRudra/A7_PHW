import UpdateCard from "@/components/UpdateCard";
import Link from "next/link";
export default function UpdatePage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-4">
      <div><h1 className="text-2xl font-bold leading-8">তথ্য আপডেট</h1><p className="text-sm">আপনার নাম পরিবর্তন করুন।</p></div>
      <div className="card-s"><UpdateCard /></div>
      <Link href="/profile" className="block text-center text-sm hover:underline">← প্রোফাইলে ফিরে যান</Link>
    </div>
  );
}
