import Link from "next/link";

export default function FacultyCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link href="/faculty/courses">My Courses</Link>
        {" | "}
        <Link href="/faculty/courses/new">Create Course</Link>
      </nav>
      {children}
    </div>
  );
}
