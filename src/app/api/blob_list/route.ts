import { list } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { blobs, cursor } = await list({ prefix: "test/" });
    return new Response(JSON.stringify({ ok: true, count: blobs.length, cursor, blobs }, null, 2), {
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message || err) }, null, 2),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
