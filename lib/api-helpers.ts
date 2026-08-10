import { NextResponse } from "next/server";
import type { ApiResult } from "./types";

/**
 * Wraps a Notion fetcher so every API route returns the same envelope
 * shape, whether it succeeds or fails. Panels on the client can rely on
 * `ok` alone and never see a raw thrown error or a 500 with no body.
 */
export async function withApiResult<T>(loader: () => Promise<T>): Promise<NextResponse> {
  const fetchedAt = new Date().toISOString();
  try {
    const data = await loader();
    const body: ApiResult<T> = { ok: true, data, fetchedAt };
    return NextResponse.json(body);
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error contacting Notion.";
    const body: ApiResult<never> = { ok: false, error, fetchedAt };
    // Still respond 200 — the envelope carries the failure so the client
    // can render a graceful per-panel error state instead of a network
    // failure/crash.
    return NextResponse.json(body);
  }
}
