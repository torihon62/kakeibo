import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function MainGrid(props: Props) {
  return (
    <Box
      sx={{
        pl: { xs: 0, md: "240px" },
      }}
    >
      <Box sx={{ px: 2 }}>{props.children}</Box>
    </Box>
  );
}
