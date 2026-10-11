"use client";
import { useEffect, useState } from "react";
import { bnDate } from "@/lib/api";
export default function DateText() {
  const [d, set] = useState("");
  useEffect(() => set(bnDate()), []);
  return <>{d || "\u00a0"}</>;
}
