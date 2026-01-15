"use client";

import { createContext, useContext, useState } from "react";
import { Expense } from "@/prisma/generated/prisma/browser";

type Severity = "info" | "success" | "warning" | "error";

interface ExpenseProviderContextType {
  expenses: Expense[];
  yearMonths: string[];
  fetchExpenses: (yearMonth?: string) => Promise<void>;
  fetchYearMonths: () => Promise<void>;
}

const ExpenseProviderContext = createContext<ExpenseProviderContextType>(
  {} as ExpenseProviderContextType
);

export const useExpenseProviderContext = (): ExpenseProviderContextType => {
  return useContext<ExpenseProviderContextType>(ExpenseProviderContext);
};

interface Props {
  children: React.ReactNode;
}

export const ExpenseProvider = (props: Props) => {
  const [expenses, setExpense] = useState<Expense[]>([]);
  const [yearMonths, setYearMonths] = useState<string[]>([]);

  const fetchExpenses = async (yearMonth?: string) => {
    const res = await fetch(
      `/api/expenses${yearMonth === undefined ? "" : `?date=${yearMonth}`}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    setExpense(json);
  };

  const fetchYearMonths = async () => {
    const res = await fetch("/api/expenses/dates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    setYearMonths(json);
  };

  const value: ExpenseProviderContextType = {
    expenses,
    yearMonths,
    fetchExpenses,
    fetchYearMonths,
  };

  return (
    <ExpenseProviderContext.Provider value={value}>
      {props.children}
    </ExpenseProviderContext.Provider>
  );
};
