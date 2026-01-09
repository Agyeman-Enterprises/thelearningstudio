"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Completion = {
  id: string;
  user_id: string;
  course_id: string;
};

export default function RegistrarCertificatesPage() {
  const supabase = createClient();
  const [records, setRecords] = useState<Completion[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("completion_records")
        .select("id, user_id, course_id")
        .eq("certificate_issued", false);

      setRecords(data ?? []);
    };

    load();
  }, []);

  const issue = async (record: Completion) => {
    await supabase.from("certificates").insert({
      user_id: record.user_id,
      course_id: record.course_id,
    });

    await supabase
      .from("completion_records")
      .update({ certificate_issued: true })
      .eq("id", record.id);

    setRecords(records.filter((r) => r.id !== record.id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Issue Certificates</h1>

      {records.map((r) => (
        <div key={r.id}>
          User {r.user_id} → Course {r.course_id}
          <button onClick={() => issue(r)}>Issue</button>
        </div>
      ))}
    </div>
  );
}
