"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Enrollment = {
  courses: {
    id: string;
    title: string;
  }[];
};


export default function StudentDashboardPage() {
  const supabase = createClient();
  const [courses, setCourses] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("enrollments")
        .select("courses(id, title)")
        .eq("user_id", user.id);

      setCourses(data ?? []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Courses</h1>

      {courses.length === 0 && <p>No enrollments.</p>}

     <ul>
  {courses.map((e) =>
    e.courses.map((c) => (
      <li key={c.id}>
        <Link href={`/dashboard/courses/${c.id}`}>
          {c.title}
        </Link>
      </li>
    ))
  )}
</ul>
    </div>
  );
}
