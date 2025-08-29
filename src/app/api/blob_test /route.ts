// 0811 src/app/api/blob-test/route.ts 測試
import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export { GET } from "../blob_write/route"; // 與 blob_test 同層，故 ../


export async function GET() {
  try {
    const key = `test/${Date.now()}.txt`;

    // 你已經有 token，就帶上；若 Integration 有綁專案，帶不帶都能寫
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    const r = await put(key, "hello blob", {
      access: "public",
      contentType: "text/plain",
      token, // ✅ 帶 token（確保不會是權限誤綁）
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


