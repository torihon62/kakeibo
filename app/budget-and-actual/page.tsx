import BaseLayout from "@/components/BaseLayout";
import MainGrid from "@/components/MainGrid";
import Title from "@/components/Title";
import { Box } from "@mui/material";
import "dotenv/config";
import { ExpenseProvider } from "@/components/providers/ExpenseProvider";
import ExpenseDisplayDateSelector from "@/components/ExpenseDisplayDateSelector";
import ExpenseStatDisplay from "@/components/ExpenseStatDisplay";

export default async function Home() {
  return (
    <Box>
      <BaseLayout>
        <MainGrid>
          <ExpenseProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title>予実表示</Title>
              <ExpenseDisplayDateSelector />
            </Box>
            <ExpenseStatDisplay />
          </ExpenseProvider>
        </MainGrid>
      </BaseLayout>
    </Box>
  );
}
