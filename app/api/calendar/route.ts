import { withApiResult } from "@/lib/api-helpers";
import { fetchCalendar } from "@/lib/notion";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return withApiResult(fetchCalendar);
}
