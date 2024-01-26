import { getJobCounts } from "@/shared/actions/jobs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Jobs() {
  const jobCounts = await getJobCounts();
  const {
    data: { active, completed, failed },
  } = jobCounts;

  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold text-blue-500">Jobs</h1>
      <section className="p-3">
        <Link
          href="/jobs/create"
          className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create job
        </Link>
      </section>

      <section className="p-3">
        <h2>Job Counts</h2>
        <ul className="list-disc list-inside pl-3">
          <li>
            <strong>Active:</strong> {active}
          </li>
          <li>
            <strong>Completed:</strong> {completed}
          </li>
          <li>
            <strong>Failed:</strong> {failed}
          </li>
        </ul>
      </section>
    </div>
  );
}
