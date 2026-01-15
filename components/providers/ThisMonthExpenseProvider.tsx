"use client";

import { createContext, useContext, useState } from "react";

interface ThisMonthExpenseProviderContextType {
  loadTrigger: boolean;
  toggleLoadTrigger: () => void;
}

const ThisMonthExpenseProviderContext =
  createContext<ThisMonthExpenseProviderContextType>(
    {} as ThisMonthExpenseProviderContextType
  );

export const useThisMonthExpenseProviderContext =
  (): ThisMonthExpenseProviderContextType => {
    return useContext<ThisMonthExpenseProviderContextType>(
      ThisMonthExpenseProviderContext
    );
  };

interface Props {
  children: React.ReactNode;
}

export const ThisMonthExpenseProvider = (props: Props) => {
  const [loadTrigger, setLoadTrigger] = useState<boolean>(true);

  const toggleLoadTrigger = () => {
    setLoadTrigger((prev) => !prev);
  };

  const value: ThisMonthExpenseProviderContextType = {
    loadTrigger,
    toggleLoadTrigger,
  };

  return (
    <ThisMonthExpenseProviderContext.Provider value={value}>
      {props.children}
    </ThisMonthExpenseProviderContext.Provider>
  );
};
