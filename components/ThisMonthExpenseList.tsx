/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Expense, ExpenseItem } from "@/prisma/generated/prisma/browser";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CircularIndeterminate from "./CircularIndeterminate";
import { deepEqual } from "@/lib/deepEqual";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  expenseItemList: ExpenseItem[];
}

interface RowProps {
  id: number;
  date: Date;
  expenseItem: string;
  money: number;
  note: string;
}

export default function ThisMonthExpenseList(props: Props) {
  const [rows, setRows] = useState<GridRowsProp | undefined>();
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json: Expense[] = await res.json();
      setRows(
        json.map((e) => ({
          id: e.id,
          date: new Date(e.date),
          expenseItem:
            props.expenseItemList.find((l) => l.id === e.expense_item_id)
              ?.name ?? "",
          money: e.money,
          note: e.note,
        }))
      );
    })();
  }, []);

  const handleTableEdit = async (
    updatedRow: RowProps,
    originalRow: RowProps
  ) => {
    if (deepEqual(updatedRow, originalRow)) {
      return updatedRow;
    }
    await fetch(`/api/expenses/${updatedRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: updatedRow.date,
        expense_item_id:
          props.expenseItemList.find((l) => l.name === updatedRow.expenseItem)
            ?.id ?? 0,
        money: updatedRow.money,
        note: updatedRow.note,
      }),
    });

    return updatedRow;
  };

  const handleRowSelect = (rowSelectionModel: GridRowSelectionModel) => {
    const newIds = rowSelectionModel.ids
      .values()
      .map((v) => v)
      .toArray();
    setSelectedRowIds([...newIds]);
  };

  const handleDeleteRow = () => {
    const ok = confirm("選択した行を削除しますか？");
    if (!ok) return;

    (async () => {
      await fetch("/api/expenses", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRowIds),
      });
      setRows(
        rows?.filter((r) =>
          selectedRowIds.every((selectedId) => r.id !== selectedId)
        )
      );
    })();
  };

  return rows === undefined ? (
    <CircularIndeterminate height="50vh" />
  ) : (
    <div style={{ height: 500, width: "100%" }}>
      <Box sx={{ py: 2 }}>
        <Button
          disabled={selectedRowIds.length === 0}
          startIcon={<DeleteIcon />}
          variant="contained"
          color="error"
          onClick={handleDeleteRow}
        >
          選択行を削除
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelect}
        processRowUpdate={(updatedRow, originalRow) => {
          return handleTableEdit(
            updatedRow as RowProps,
            originalRow as RowProps
          );
        }}
        onProcessRowUpdateError={(e) => console.log(e)}
      />
    </div>
  );
}

const columns: GridColDef[] = [
  {
    field: "date",
    type: "date",
    headerName: "日付",
    width: 180,
    editable: true,
  },
  {
    field: "expenseItem",
    headerName: "費目",
    type: "string",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "money",
    headerName: "金額",
    type: "number",
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "note",
    headerName: "備考",
    type: "string",
    width: 220,
    editable: true,
  },
];
