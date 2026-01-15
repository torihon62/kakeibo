"use client";

import { ExpenseItem } from "@/prisma/generated/prisma/browser";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import FormItemTitle from "./FormItemTitle";
import { useSnackbarProviderContext } from "@/components/providers/SnackbarProvider";

interface Props {
  expenseItems: ExpenseItem[];
}

export default function InputActualForm(props: Props) {
  const d = new Date();
  const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
  const FieldPadding = <Box sx={{ py: 1 }} />;
  const snackbar = useSnackbarProviderContext();

  const [busy, setBusy] = useState(false);

  const [inputDate, setInputDate] = useState(dateString);
  const [selectedExpenseItem, setSelectedExpenseItem] = useState<number>(
    props.expenseItems[0].id
  );
  const [inputActual, setInputActual] = useState<number>();
  const [inputNote, setInputNote] = useState("");

  const onSave = () => {
    if (inputActual === undefined) return;
    setBusy(true);

    (async () => {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            date: `${inputDate}T00:00:00Z`,
            expense_item_id: selectedExpenseItem,
            money: inputActual,
            note: inputNote,
          },
        }),
      });
      setBusy(false);
      if (res.status >= 400) {
        snackbar.openSnackbar(
          `エラーが発生しました。code: ${res.status}`,
          "error"
        );
        return;
      }
      snackbar.openSnackbar("入力内容を保存しました。", "success");
    })();
  };

  return (
    <Box>
      <FormItemTitle>日付</FormItemTitle>
      <TextField
        type="date"
        size="small"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
        fullWidth
      />
      {FieldPadding}
      <FormItemTitle>費目</FormItemTitle>
      <Select
        size="small"
        value={selectedExpenseItem}
        onChange={(e) => setSelectedExpenseItem(e.target.value)}
        fullWidth
      >
        {props.expenseItems.map((item) => (
          <MenuItem key={`expense-item_${item.id}`} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {FieldPadding}
      <FormItemTitle>金額</FormItemTitle>
      <TextField
        value={inputActual}
        onChange={(e) => setInputActual(parseInt(e.target.value))}
        size="small"
        type="number"
        fullWidth
      />
      {FieldPadding}
      <FormItemTitle>備考</FormItemTitle>
      <TextField
        value={inputNote}
        onChange={(e) => setInputNote(e.target.value)}
        size="small"
        fullWidth
      />
      {FieldPadding}
      <Button
        onClick={onSave}
        variant="contained"
        disabled={busy || !inputActual}
      >
        保存
      </Button>
    </Box>
  );
}
