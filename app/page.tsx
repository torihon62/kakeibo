import BaseLayout from "@/components/BaseLayout";
import InputActualForm from "@/components/InputActualForm";
import MainGrid from "@/components/MainGrid";
import ThisMonthExpenseList from "@/components/ThisMonthExpenseList";
import Title from "@/components/Title";
import { prisma } from "@/lib/prisma";
import { Box, Grid } from "@mui/material";

export default async function Home() {
  const expenseItems = await prisma.expenseItem.findMany();
  return (
    <Box>
      <BaseLayout>
        <MainGrid>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5.5 }}>
              <Title>金額入力</Title>
              <InputActualForm expenseItems={expenseItems} />
            </Grid>
            <Grid size={{ xs: 12, md: 5.5 }}>
              <Title>今月の入力一覧</Title>
              <ThisMonthExpenseList expenseItemList={expenseItems} />
            </Grid>
            <Grid size={{ xs: 12, md: 1 }} />
          </Grid>
        </MainGrid>
      </BaseLayout>
    </Box>
  );
}
