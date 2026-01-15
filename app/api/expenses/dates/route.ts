import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function extractYearMonths(dates: Date[]): string[] {
  const set = new Set<string>();

  for (const d of dates) {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    set.add(`${y}年${m}月`);
  }

  return Array.from(set).sort((a, b) => {
    const [ay, am] = a.match(/\d+/g)!.map(Number);
    const [by, bm] = b.match(/\d+/g)!.map(Number);

    return by * 12 + bm - (ay * 12 + am);
  });
}

export async function GET() {
  const res = await prisma.expense.findMany();

  const dates = res.map((r) => r.date);

  return NextResponse.json(extractYearMonths(dates));
}
