"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function FacultyCreateCoursePage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const createCourse = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: course } = await supabase
      .from("courses")
      .insert({ title })
      .select()
      .single();

    if (!course) return;

    await supabase.from("course_teachers").insert({
      course_id: course.id,
      user_id: user.id,
      role: "primary",
    });

    router.push(`/faculty/courses/${course.id}`);
  };

  return (
    <div>
      <h1>Create Course</h1>

      <input
        placeholder="Course title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createCourse} disabled={loading}>
        Create
      </button>
    </div>
  );
}
