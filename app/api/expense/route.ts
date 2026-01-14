import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();

  await prisma.expense.create({ ...body });

  return NextResponse.json({ ...body });
}
