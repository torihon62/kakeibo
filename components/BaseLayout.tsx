import { CssBaseline } from "@mui/material";
import AppNavBar from "./AppNavBar";
import SideMenu from "./SideMenu";

export default function BaseLayout() {
  return (
    <>
      <CssBaseline />
      <AppNavBar />
      <SideMenu />
    </>
  );
}
