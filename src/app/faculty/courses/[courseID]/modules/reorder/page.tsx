"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { requireFacultyCourseAccess } from "@/lib/guards/requireFacultyCourseAccess";

type Module = {
  id: string;
  title: string;
  position: number;
};

export default function ReorderModulesPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const load = async () => {
      const allowed = await requireFacultyCourseAccess(courseId as string);
      if (!allowed) {
        router.push("/faculty/courses");
        return;
      }

      const { data } = await supabase
        .from("modules")
        .select("id, title, position")
        .eq("course_id", courseId)
        .order("position");

      setModules(data ?? []);
    };

    load();
  }, []);

  const move = (index: number, direction: number) => {
    const updated = [...modules];
    const target = index + direction;
    if (target < 0 || target >= updated.length) return;

    [updated[index], updated[target]] = [
      updated[target],
      updated[index],
    ];

    setModules(updated);
  };

  const saveOrder = async () => {
    for (let i = 0; i < modules.length; i++) {
      await supabase
        .from("modules")
        .update({ position: i })
        .eq("id", modules[i].id);
    }

    router.push(`/faculty/courses/${courseId}/modules`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Reorder Modules</h1>

      {modules.map((m, i) => (
        <div key={m.id}>
          {m.title}
          <button onClick={() => move(i, -1)}>↑</button>
          <button onClick={() => move(i, 1)}>↓</button>
        </div>
      ))}

      <button onClick={saveOrder}>Save Order</button>
    </div>
  );
}
