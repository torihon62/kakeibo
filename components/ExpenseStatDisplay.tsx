"use client";

import { Grid } from "@mui/material";
import StatCard from "@/components/StatCard";
import { useExpenseProviderContext } from "./providers/ExpenseProvider";

export default function ExpenseStatDisplay() {
  const ctx = useExpenseProviderContext();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard title="支出合計" value="¥234,234円" />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard title="食費合計" value="¥234,234円" />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard title="外食費合計" value="¥234,234円" />
      </Grid>
    </Grid>
  );
}
