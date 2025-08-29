export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(
    JSON.stringify(
      {
        hasToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
        vercelEnv: process.env.VERCEL_ENV || null,
        region: process.env.VERCEL_REGION || null,
      },
      null,
      2
    ),
    { headers: { "content-type": "application/json" } }
  );
}
