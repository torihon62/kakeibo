/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { MenuItem, TextField } from "@mui/material";
import { useExpenseProviderContext } from "./providers/ExpenseProvider";
import { useEffect, useState } from "react";

export default function ExpenseDisplayDateSelector() {
  const ctx = useExpenseProviderContext();
  const [selectedYearMonth, setSelectedYearMonth] = useState<string>();

  useEffect(() => {
    (async () => {
      await ctx.fetchYearMonths();
    })();
  }, []);

  useEffect(() => {
    if (ctx.yearMonths.length === 0) return;
    console.log(ctx.yearMonths[0]);
    setSelectedYearMonth(ctx.yearMonths[0]);
  }, [ctx.yearMonths]);

  useEffect(() => {
    if (selectedYearMonth === undefined) return;

    (async () => {
      await ctx.fetchExpenses(selectedYearMonth);
      await ctx.fetchBudgets(selectedYearMonth);
    })();
  }, [selectedYearMonth]);

  return selectedYearMonth !== undefined ? (
    <TextField
      select
      size="small"
      label="表示年月"
      value={selectedYearMonth}
      onChange={(e) => setSelectedYearMonth(e.target.value)}
    >
      {ctx.yearMonths.map((ym) => (
        <MenuItem key={ym} value={ym}>
          {ym}
        </MenuItem>
      ))}
    </TextField>
  ) : null;
}
