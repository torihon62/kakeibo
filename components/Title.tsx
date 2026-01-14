import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function Title(props: Props) {
  return (
    <Typography
      component={"h2"}
      variant={"h2"}
      sx={{ fontSize: "large", fontWeight: "bold", py: 2 }}
    >
      {props.children}
    </Typography>
  );
}
