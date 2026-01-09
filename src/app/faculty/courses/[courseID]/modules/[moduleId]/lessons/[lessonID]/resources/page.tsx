"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Resource = {
  id: string;
  title: string;
  url: string;
};

export default function LessonResourcesPage() {
  const { lessonId } = useParams();
  const supabase = createClient();

  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("lesson_resources")
        .select("id, title, url")
        .eq("lesson_id", lessonId);

      setResources(data ?? []);
    };

    load();
  }, [lessonId]);

  const add = async () => {
    const { data } = await supabase
      .from("lesson_resources")
      .insert({ lesson_id: lessonId, title, url })
      .select()
      .single();

    if (data) {
      setResources([...resources, data]);
      setTitle("");
      setUrl("");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lesson Resources</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={add}>Add Resource</button>

      <ul>
        {resources.map((r) => (
          <li key={r.id}>
            <a href={r.url} target="_blank">{r.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
