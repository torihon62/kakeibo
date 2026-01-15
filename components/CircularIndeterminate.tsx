import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Props {
  height?: string;
}

export default function CircularIndeterminate(props: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: props.height,
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
