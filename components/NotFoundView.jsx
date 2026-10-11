import Link from "next/link";
export default function NotFoundView({ text = "পেজটি খুঁজে পাওয়া যায়নি" }) {
  return (
    <div className="card-s mx-auto my-10 max-w-md p-10 text-center">
      <div className="text-6xl font-bold text-primary">৪০৪</div>
      <p className="mt-2">{text}</p>
      <Link href="/" className="fb fb-p mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
