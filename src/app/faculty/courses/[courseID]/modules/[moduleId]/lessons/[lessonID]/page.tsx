"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { requireFacultyCourseAccess } from "@/lib/guards/requireFacultyCourseAccess";

export default function FacultyLessonEditorPage() {
  const { courseId, moduleId, lessonId } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        .select("title, content")
        .eq("id", lessonId)
        .single();

      if (data) {
        setTitle(data.title);
        setContent(data.content ?? "");
      }

      setLoading(false);
    };

    load();
  }, [lessonId]);

  const save = async () => {
    await supabase
      .from("lessons")
      .update({ title, content })
      .eq("id", lessonId);

    router.push(
      `/faculty/courses/${courseId}/modules/${moduleId}/lessons`
    );
  };

  if (loading) return <div>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Edit Lesson</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson title"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
        placeholder="Lesson content (markdown)"
      />

      <button onClick={save}>Save Lesson</button>
    </div>
  );
}
