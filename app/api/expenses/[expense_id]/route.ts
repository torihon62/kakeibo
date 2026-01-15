import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  expense_id: string;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { expense_id } = await params;
  const body = await request.json();

  const res = await prisma.expense.update({
    where: { id: parseInt(expense_id) },
    data: body,
  });

  return NextResponse.json({ status: 200, res });
}
