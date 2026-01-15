import { CssBaseline } from "@mui/material";
import AppNavBar from "./AppNavBar";
import SideMenu from "./SideMenu";
import { SnackbarProvider } from "./providers/SnackbarProvider";

interface Props {
  children: React.ReactNode;
}

export default function BaseLayout(props: Props) {
  return (
    <SnackbarProvider>
      <CssBaseline />
      <AppNavBar />
      {props.children}
    </SnackbarProvider>
  );
}
