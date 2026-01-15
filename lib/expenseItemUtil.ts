import { ExpenseItem } from "@/prisma/generated/prisma/browser";

export const getExpenseItemNameById = (
  expenseItem: ExpenseItem[],
  id: number
): string | undefined => {
  return expenseItem.find((i) => i.id === id)?.name;
};

export const getExpenseItemIdByName = (
  expenseItem: ExpenseItem[],
  name: string
): number | undefined => {
  return expenseItem.find((i) => i.name === name)?.id;
};
