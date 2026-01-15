import BaseLayout from "@/components/BaseLayout";
import MainGrid from "@/components/MainGrid";
import Title from "@/components/Title";
import { Box } from "@mui/material";

export default async function Home() {
  return (
    <Box>
      <BaseLayout>
        <MainGrid>
          <Title>予算デフォルト設定</Title>
        </MainGrid>
      </BaseLayout>
    </Box>
  );
}
