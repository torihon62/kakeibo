import { prisma } from "@/lib/prisma";
import { transJPDate } from "@/lib/transDate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateStr = searchParams.get("date");

  const date = dateStr !== null ? transJPDate(dateStr) : new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const res = await prisma.budget.findMany({
    where: {
      year,
      month,
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(res);
}
