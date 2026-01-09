"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function StudentLessonPage() {
  const { lessonId } = useParams();
  const supabase = createClient();

  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("lessons")
        .select("title, content")
        .eq("id", lessonId)
        .single();

      setLesson(data);

      if (user) {
        await supabase.from("lesson_progress").upsert({
          lesson_id: lessonId,
          user_id: user.id,
          completed: true,
        });
      }
    };

    load();
  }, [lessonId]);

  if (!lesson) return <div>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{lesson.title}</h1>
      <div>{lesson.content}</div>
    </div>
  );
}
