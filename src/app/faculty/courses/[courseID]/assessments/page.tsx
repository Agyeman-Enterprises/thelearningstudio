"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Assessment = {
  id: string;
  title: string;
  pass_score: number;
};

export default function CourseAssessmentsPage() {
  const { courseId } = useParams();
  const supabase = createClient();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [title, setTitle] = useState("");
  const [passScore, setPassScore] = useState(70);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("assessments")
        .select("id, title, pass_score")
        .eq("course_id", courseId);

      setAssessments(data ?? []);
    };

    load();
  }, [courseId]);

  const add = async () => {
    const { data } = await supabase
      .from("assessments")
      .insert({
        course_id: courseId,
        title,
        pass_score: passScore,
      })
      .select()
      .single();

    if (data) {
      setAssessments([...assessments, data]);
      setTitle("");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Assessments</h1>

      <input
        placeholder="Assessment title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        value={passScore}
        onChange={(e) => setPassScore(Number(e.target.value))}
      />
      <button onClick={add}>Add Assessment</button>

      <ul>
        {assessments.map((a) => (
          <li key={a.id}>
            {a.title} (Pass: {a.pass_score}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
