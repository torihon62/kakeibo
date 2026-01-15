"use client";

import { Grid } from "@mui/material";
import StatCard from "@/components/StatCard";
import { useExpenseProviderContext } from "./providers/ExpenseProvider";
import { sum } from "@/lib/stat";
import { ExpenseItem } from "@/prisma/generated/prisma/browser";
import CircularIndeterminate from "./CircularIndeterminate";

interface Props {
  expenseItems: ExpenseItem[];
}

export default function ExpenseStatDisplay(props: Props) {
  const ctx = useExpenseProviderContext();
  const expenses = ctx.expenses;
  const allMoney = sum(expenses.map((e) => e.money));
  const foodExpenseItem = props.expenseItems.find((i) => i.name === "食費");
  const eatingOutExpenseItem = props.expenseItems.find(
    (i) => i.name === "外食費"
  );
  const allfoodMoney = sum(
    expenses
      .filter((e) => e.expense_item_id === foodExpenseItem?.id)
      .map((e) => e.money)
  );
  const allEatingOutMoney = sum(
    expenses
      .filter((e) => e.expense_item_id === eatingOutExpenseItem?.id)
      .map((e) => e.money)
  );

  return expenses.length === 0 ? (
    <CircularIndeterminate />
  ) : (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="支出合計"
          value={`¥ ${allMoney.toLocaleString()} 円`}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="食費合計"
          value={`¥ ${allfoodMoney.toLocaleString()} 円`}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="外食費合計"
          value={`¥ ${allEatingOutMoney.toLocaleString()} 円`}
        />
      </Grid>
    </Grid>
  );
}
