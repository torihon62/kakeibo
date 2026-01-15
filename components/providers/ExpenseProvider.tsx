"use client";

import { createContext, useContext, useState } from "react";
import { Budget, Expense } from "@/prisma/generated/prisma/browser";

interface ExpenseProviderContextType {
  expenses: Expense[];
  yearMonths: string[];
  budgets: Budget[];
  fetchExpenses: (yearMonth?: string) => Promise<void>;
  fetchYearMonths: () => Promise<void>;
  fetchBudgets: (yearMonth?: string) => Promise<void>;
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
  const [budgets, setBudgets] = useState<Budget[]>([]);

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

  const fetchBudgets = async (yearMonth?: string) => {
    const res = await fetch(
      `/api/budgets${yearMonth === undefined ? "" : `?date=${yearMonth}`}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    setBudgets(json);
  };
  const value: ExpenseProviderContextType = {
    expenses,
    yearMonths,
    budgets,
    fetchExpenses,
    fetchYearMonths,
    fetchBudgets,
  };

  return (
    <ExpenseProviderContext.Provider value={value}>
      {props.children}
    </ExpenseProviderContext.Provider>
  );
};
