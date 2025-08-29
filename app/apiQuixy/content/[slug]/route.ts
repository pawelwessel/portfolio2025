import { getDocuments } from "@/common/firebase/quixy";
import { NextResponse } from "next/server";
import { polishToEnglish } from "../../../../utils/polishToEnglish";

export async function GET(params: any, req: any) {
  const { slug } = await req.params;
  const content = await getDocuments("content");
  const data = content.find((c: any) => polishToEnglish(c?.title) === slug);
  if (!data) {
    return NextResponse.json({}, { status: 404 });
  }
  return NextResponse.json(data);
}
