// 0811 src/app/api/blob-test/route.ts 測試
import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export { GET } from "../blob_write/route";
