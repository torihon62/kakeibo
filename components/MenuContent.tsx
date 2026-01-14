import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const mainListItems = [
  { text: "金額入力", path: "/", icon: <HomeRoundedIcon /> },
  {
    text: "予実表示",
    path: "/budget-and-actual",
    icon: <AnalyticsRoundedIcon />,
  },
  { text: "予算入力", path: "/input-budget", icon: <AssignmentRoundedIcon /> },
  {
    text: "費目設定",
    path: "/setting-expense-item",
    icon: <SettingsRoundedIcon />,
  },
  {
    text: "予算デフォルト設定",
    path: "/setting-default-budget",
    icon: <SettingsRoundedIcon />,
  },
];

interface Props {
  path: string;
}

export default function MenuContent(props: Props) {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            key={`sidemenu-index_${index}`}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              selected={item.path === props.path}
              href={item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
