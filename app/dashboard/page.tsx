import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import JobsTable from "@/components/dashboard/JobsTable";

import { createSupabaseServer } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();

  let jobs: any[] = [];

  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .limit(10);

    if (error) {
      console.error("❌ Supabase error:", error.message);
    } else {
      jobs = data || [];
    }
  } catch (err) {
    console.error("❌ Dashboard fetch failed:", err);
  }

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) => job.status === "active"
  ).length;

  const completedJobs = jobs.filter(
    (job) => job.status === "completed"
  ).length;

  const failedJobs = jobs.filter(
    (job) => job.status === "failed"
  ).length;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            ConvertLister Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            Autonomous product intelligence system
          </p>
        </div>

        <StatsCards
          totalJobs={totalJobs}
          activeJobs={activeJobs}
          completedJobs={completedJobs}
          failedJobs={failedJobs}
        />

        <div className="mt-8">
          <JobsTable jobs={jobs} />
        </div>
      </main>
    </div>
  );
}
