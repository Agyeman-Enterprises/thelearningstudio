
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegistrarDashboardPage() {
  const supabase = createClient();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { count: pending } = await supabase
        .from("enrollment_requests")
        .select("*", { count: "exact", head: true });

      const { count: certs } = await supabase
        .from("completion_records")
        .select("*", { count: "exact", head: true })
        .eq("certificate_issued", false);

      setStats({ pending, certs });
    };

    load();
  }, []);

  if (!stats) return <div>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Registrar Dashboard</h1>
      <ul>
        <li>Pending Enrollment Requests: {stats.pending}</li>
        <li>Certificates To Issue: {stats.certs}</li>
      </ul>
    </div>
  );
}
