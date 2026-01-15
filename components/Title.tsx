import { Box, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function Title(props: Props) {
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        component={"h2"}
        variant={"h2"}
        sx={{ fontSize: "x-large", fontWeight: "bold" }}
      >
        {props.children}
      </Typography>
    </Box>
  );
}
