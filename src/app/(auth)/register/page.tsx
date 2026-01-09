"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Role = "student" | "teacher";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !data.user) {
      setError(authError?.message ?? "Signup failed");
      setLoading(false);
      return;
    }

    const effectiveRole =
      role === "teacher" ? "teacher_pending" : "student";

   const { error: roleError } = await supabase.from("profiles").insert({
  id: data.user.id,
  role: effectiveRole,
});


    if (roleError) {
      setError("Failed to assign role");
      setLoading(false);
      return;
    }

    if (effectiveRole === "student") {
      router.push("/dashboard");
    } else {
      router.push("/pending-approval");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg border">
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>

      {error && (
        <div className="mb-4 text-sm text-red-600">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`w-full px-4 py-2 rounded border ${
              role === "student"
                ? "border-black"
                : "border-slate-300"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`w-full px-4 py-2 rounded border ${
              role === "teacher"
                ? "border-black"
                : "border-slate-300"
            }`}
          >
            Teacher / Instructor
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Creating account..." : "Continue"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
