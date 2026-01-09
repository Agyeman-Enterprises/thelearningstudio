"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Course = {
  id: string;
  title: string;
};

export default function FacultyCoursesPage() {
  const supabase = createClient();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("course_teachers")
        .select("courses(id, title)")
        .eq("user_id", user.id);

      const mapped =
        data?.map((row: any) => row.courses).filter(Boolean) ?? [];

      setCourses(mapped);
      setLoading(false);
    };

    loadCourses();
  }, []);

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading…</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Courses</h1>

      <div style={{ marginBottom: "1rem" }}>
        <Link href="/faculty/courses/new">Create New Course</Link>
      </div>

      {courses.length === 0 && <p>No courses yet.</p>}

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/faculty/courses/${course.id}`}>
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
