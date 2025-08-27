import { NextRequest, NextResponse } from "next/server";
import { addDocument, getDocuments } from "@/firebase";
import { randomUUID } from "crypto";

type CreateReservationBody = {
  specialistUid?: string;
  specialistName?: string;
  serviceName?: string;
  customerPhone: string;
  sourceSlug?: string;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const specialistUid = searchParams.get("specialistUid");
    const phone = searchParams.get("phone");

    const all = (await getDocuments("reservations")) as any[];
    const filtered = all.filter((r) => {
      const bySpec = specialistUid ? r.specialistUid === specialistUid : true;
      const byPhone = phone ? r.customerPhone === phone : true;
      return bySpec && byPhone;
    });
    // newest first
    filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return NextResponse.json(filtered);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateReservationBody;
    if (!body?.customerPhone) {
      return NextResponse.json(
        { error: "Missing customerPhone" },
        { status: 400 }
      );
    }
    if (!body.specialistUid && !body.specialistName) {
      return NextResponse.json(
        { error: "Provide specialistUid or specialistName" },
        { status: 400 }
      );
    }

    const id = `res_${randomUUID()}`;
    const reservation = {
      id,
      specialistUid: body.specialistUid,
      specialistName: body.specialistName,
      serviceName: body.serviceName,
      customerPhone: body.customerPhone,
      sourceSlug: body.sourceSlug,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    await addDocument("reservations", id, reservation);
    return NextResponse.json({ id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
