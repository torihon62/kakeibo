import BaseLayout from "@/components/BaseLayout";
import InputActualForm from "@/components/InputActualForm";
import MainGrid from "@/components/MainGrid";
import Title from "@/components/Title";
import { prisma } from "@/lib/prisma";
import { Box } from "@mui/material";

export default async function Home() {
  const expenseItems = await prisma.expenseItem.findMany();
  return (
    <Box>
      <BaseLayout>
        <MainGrid>
          <Title>金額入力</Title>
          <InputActualForm expenseItems={expenseItems} />
        </MainGrid>
      </BaseLayout>
    </Box>
  );
}
