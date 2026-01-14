import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function FormItemTitle(props: Props) {
  return <Typography sx={{ fontSize: "smaller" }}>{props.children}</Typography>;
}
