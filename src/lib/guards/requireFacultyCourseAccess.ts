import { createClient } from "@/lib/supabase/client";

export async function requireFacultyCourseAccess(courseId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("course_teachers")
    .select("id")
    .eq("course_id", courseId)
    .eq("user_id", user.id)
    .single();

  return !!data;
}
