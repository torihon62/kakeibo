"use client";

import Box from "@mui/material/Box";
import MenuContent from "./MenuContent";
import { usePathname } from "next/navigation";
import { Divider, Toolbar } from "@mui/material";

export default function SideMenu() {
  const path = usePathname();
  return (
    <Box
      sx={{
        overflow: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MenuContent path={path} />
    </Box>
  );
}
