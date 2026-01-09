"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ReportsPage() {
  const supabase = createClient();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("id", { count: "exact" });

      const { data: completions } = await supabase
        .from("completion_records")
        .select("id", { count: "exact" });

      const { data: certificates } = await supabase
        .from("certificates")
        .select("id", { count: "exact" });

      setStats({
        enrollments: enrollments?.length ?? 0,
        completions: completions?.length ?? 0,
        certificates: certificates?.length ?? 0,
      });
    };

    load();
  }, []);

  if (!stats) return <div>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Reports</h1>

      <ul>
        <li>Total Enrollments: {stats.enrollments}</li>
        <li>Course Completions: {stats.completions}</li>
        <li>Certificates Issued: {stats.certificates}</li>
      </ul>
    </div>
  );
}
