"use client";

import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import StatCard from "@/components/StatCard";
import { useExpenseProviderContext } from "./providers/ExpenseProvider";
import { sum } from "@/lib/stat";
import {
  Budget,
  Expense,
  ExpenseItem,
} from "@/prisma/generated/prisma/browser";
import CircularIndeterminate from "./CircularIndeterminate";
import { getExpenseItemNameById } from "@/lib/expenseItemUtil";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";

interface Props {
  expenseItems: ExpenseItem[];
}

const makeAggregateData = (
  expenses: Expense[],
  expenseItems: ExpenseItem[],
  budgets: Budget[]
) => {
  const map = new Map<string, number>();

  for (const item of expenses) {
    const expenseItemName =
      getExpenseItemNameById(expenseItems, item.expense_item_id) ?? "";
    map.set(expenseItemName, (map.get(expenseItemName) ?? 0) + item.money);
  }

  return Array.from(map.entries())
    .map(([label, value], index) => ({
      id: index,
      label,
      value,
      budget: budgets.find(
        (b) => getExpenseItemNameById(expenseItems, b.expense_item_id) === label
      )?.money,
    }))
    .sort((a, b) => b.value - a.value)
    .map((item, i) => ({ ...item, id: i }));
};

export default function ExpenseStatDisplay(props: Props) {
  const theme = useTheme();
  const ctx = useExpenseProviderContext();
  const expenses = ctx.expenses;
  const budgets = ctx.budgets;
  const allMoney = sum(expenses.map((e) => e.money));
  const aggregateData = makeAggregateData(
    expenses,
    props.expenseItems,
    budgets
  );

  console.log(aggregateData);

  return expenses.length === 0 ? (
    <CircularIndeterminate />
  ) : (
    <Grid container spacing={2}>
      {/* 1列目 */}
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard title="支出合計" value={`${allMoney.toLocaleString()} 円`} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="食費合計"
          value={`${
            aggregateData
              .find((d) => d.label === "食費")
              ?.value.toLocaleString() ?? 0
          } 円`}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <StatCard
          title="外食費合計"
          value={`${
            aggregateData
              .find((d) => d.label === "外食費")
              ?.value.toLocaleString() ?? 0
          } 円`}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}></Grid>

      {/* 2列目 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TableContainer component={Paper}>
          <Table size="small" sx={{ tableLayout: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  費目
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  予算
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  実績
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  予算と実績の差
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aggregateData.map((d) => (
                <TableRow
                  key={`budget-and-actual-table-row_${d.id}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {d.label}
                  </TableCell>
                  <TableCell>{d.budget}</TableCell>
                  <TableCell>{d.value}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        (d.budget ?? d.value) - d.value >= 0
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    }}
                  >
                    {(d.budget ?? d.value) - d.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Box>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value.toLocaleString()}円`,
                arcLabelMinAngle: 10,
                arcLabelRadius: "80%",
                data: aggregateData,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontSize: "small",
              },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
