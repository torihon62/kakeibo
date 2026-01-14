import BaseLayout from "@/components/BaseLayout";
import MainGrid from "@/components/MainGrid";
import { Title } from "@mui/icons-material";
import { Box } from "@mui/material";

export default async function Home() {
  return (
    <Box>
      <BaseLayout>
        <MainGrid>
          <Title>費目設定</Title>
        </MainGrid>
      </BaseLayout>
    </Box>
  );
}
