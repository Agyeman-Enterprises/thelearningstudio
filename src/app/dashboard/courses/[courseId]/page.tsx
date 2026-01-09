"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function StudentCoursePage() {
  const { courseId } = useParams();
  const supabase = createClient();
  const router = useRouter();

  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("modules")
        .select("id, title, lessons(id, title)")
        .eq("course_id", courseId)
        .order("position");

      setModules(data ?? []);
      setLoading(false);
    };

    load();
  }, [courseId]);

  if (loading) return <div>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      {modules.map((m) => (
        <div key={m.id}>
          <h3>{m.title}</h3>
          <ul>
            {m.lessons.map((l: any) => (
              <li key={l.id}>
                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/courses/${courseId}/lessons/${l.id}`
                    )
                  }
                >
                  {l.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
