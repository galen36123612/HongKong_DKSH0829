import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // 每次都執行

export async function GET() {
  try {
    const key = `test/${Date.now()}.txt`;
    const token = process.env.BLOB_READ_WRITE_TOKEN; // 已確認 hasToken:true

    const r = await put(key, "hello blob", {
      access: "public",
      contentType: "text/plain",
      token, // 有 token 就帶上，避免權限誤綁
    });

    return new Response(JSON.stringify({ ok: true, key, url: r.url }, null, 2), {
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message || err) }, null, 2),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
