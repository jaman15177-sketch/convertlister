import { getStatusStyle } from "@/lib/job/status.style";

type Job = {
  id: string;
  type: string;
  status: string;
  created_at: string;
};

export default function JobsTable({ jobs }: { jobs: Job[] }) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Recent Jobs</h2>
        <p className="text-gray-500 text-sm">
          Live Supabase job pipeline
        </p>
      </div>

      {/* TABLE */}
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Job ID</th>
            <th className="text-left p-4">Type</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Created</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="p-6 text-center text-gray-500"
              >
                No jobs found
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr
                key={job.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* JOB ID */}
                <td className="p-4 text-sm font-mono">
                  {job.id}
                </td>

                {/* TYPE */}
                <td className="p-4 text-sm">
                  {job.type}
                </td>

                {/* STATUS BADGE */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm border ${getStatusStyle(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>

                {/* DATE */}
                <td className="p-4 text-sm text-gray-500">
                  {new Date(job.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
