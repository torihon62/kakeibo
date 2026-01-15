import { prisma } from "@/lib/prisma";
import { transJPDate } from "@/lib/transDate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateStr = searchParams.get("date");

  const date = dateStr !== null ? transJPDate(dateStr) : new Date();

  // 初日
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  // 最終日
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const res = await prisma.expense.findMany({
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  await prisma.expense.create({ ...body });

  return NextResponse.json({ ...body });
}

export async function DELETE(request: NextRequest) {
  const ids = await request.json();

  await prisma.expense.deleteMany({ where: { id: { in: ids } } });
  return NextResponse.json({ status: 200 });
}
