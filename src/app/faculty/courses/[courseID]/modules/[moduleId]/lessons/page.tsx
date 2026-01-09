"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { requireFacultyCourseAccess } from "@/lib/guards/requireFacultyCourseAccess";

type Lesson = {
  id: string;
  title: string;
};

export default function FacultyLessonsPage() {
  const { courseId, moduleId } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const allowed = await requireFacultyCourseAccess(courseId as string);
      if (!allowed) {
        router.push("/faculty/courses");
        return;
      }

      const { data } = await supabase
        .from("lessons")
        .select("id, title")
        .eq("module_id", moduleId)
        .order("position");

      setLessons(data ?? []);
      setLoading(false);
    };

    load();
  }, [moduleId]);

  const addLesson = async () => {
    if (!title) return;

    const { data } = await supabase
      .from("lessons")
      .insert({ title, module_id: moduleId })
      .select()
      .single();

    if (data) {
      setLessons([...lessons, data]);
      setTitle("");
    }
  };

  if (loading) return <div>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lessons</h1>

      <input
        placeholder="New lesson title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addLesson}>Add Lesson</button>

      <ul>
        {lessons.map((l) => (
          <li key={l.id}>
            <button
              onClick={() =>
                router.push(
                  `/faculty/courses/${courseId}/modules/${moduleId}/lessons/${l.id}`
                )
              }
            >
              {l.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
