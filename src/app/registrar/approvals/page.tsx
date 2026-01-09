"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  email: string;
  role: string;
};

export default function RegistrarApprovalsPage() {
  const supabase = createClient();
  const [pending, setPending] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPending = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, email, role")
        .eq("role", "teacher_pending");

      setPending(data ?? []);
      setLoading(false);
    };

    loadPending();
  }, []);

  const approve = async (id: string) => {
    await supabase.from("profiles").update({ role: "teacher" }).eq("id", id);
    setPending((prev) => prev.filter((u) => u.id !== id));
  };

  const reject = async (id: string) => {
    await supabase.from("profiles").update({ role: "student" }).eq("id", id);
    setPending((prev) => prev.filter((u) => u.id !== id));
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading…</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Instructor Approval</h1>

      {pending.length === 0 && <p>No pending instructors.</p>}

      {pending.map((user) => (
        <div
          key={user.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <span>{user.email}</span>

          <button onClick={() => approve(user.id)}>Approve</button>
          <button onClick={() => reject(user.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}
