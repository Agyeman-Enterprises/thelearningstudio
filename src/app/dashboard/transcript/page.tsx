"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TranscriptPage() {
  const supabase = createClient();
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("user_transcript")
        .select("*")
        .eq("user_id", user.id);

      setRecords(data ?? []);
    };

    load();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Transcript</h1>

      <ul>
        {records.map((r) => (
          <li key={r.id}>
            {r.course_title} — {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
