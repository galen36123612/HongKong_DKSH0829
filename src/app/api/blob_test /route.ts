// 0811 src/app/api/blob-test/route.ts 測試
import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // 確保每次都執行，不會被快取

export async function GET() {
  try {
    const key = `test/${Date.now()}.txt`;

    // 若專案沒有自動綁權限，可自行帶 Token（沒有就留空，也不會報錯）
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    const r = await put(key, "hello blob", {
      access: "public",
      contentType: "text/plain",
      token, // 有就用，沒有也沒關係
    });

    return new Response(JSON.stringify({ ok: true, key, url: r.url }, null, 2), {
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify(
        { ok: false, error: String(err?.message || err) },
        null,
        2
      ),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

