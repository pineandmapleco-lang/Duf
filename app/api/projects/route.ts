import { withApiResult } from "@/lib/api-helpers";
import { fetchProjects } from "@/lib/notion";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return withApiResult(fetchProjects);
}
