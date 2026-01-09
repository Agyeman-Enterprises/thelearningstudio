"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { requireFacultyCourseAccess } from "@/lib/guards/requireFacultyCourseAccess";

type Module = {
  id: string;
  title: string;
};

export default function FacultyModulesPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const load = async () => {
      const allowed = await requireFacultyCourseAccess(courseId as string);
      if (!allowed) {
        router.push("/faculty/courses");
        return;
      }

      const { data } = await supabase
        .from("modules")
        .select("id, title")
        .eq("course_id", courseId)
        .order("position");

      setModules(data ?? []);
      setLoading(false);
    };

    load();
  }, [courseId]);

  const addModule = async () => {
    if (!title) return;

    const { data } = await supabase
      .from("modules")
      .insert({ title, course_id: courseId })
      .select()
      .single();

    if (data) {
      setModules([...modules, data]);
      setTitle("");
    }
  };

  if (loading) return <div>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Modules</h1>

      <input
        placeholder="New module title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addModule}>Add Module</button>

      <ul>
        {modules.map((m) => (
          <li key={m.id}>
            <button
              onClick={() =>
                router.push(
                  `/faculty/courses/${courseId}/modules/${m.id}/lessons`
                )
              }
            >
              {m.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
