// import { User, LogOut, Languages, RefreshCw } from "lucide-react";
import { PROFILE as ProfileIcon, LOGOUT as LogoutIcon } from '@/constants/icons';

type HeaderActions = {
  handleLogout: () => void;
  handleProfile: () => void;
  handleSwitchRole: () => void;
  handleLanguage: () => void;
};

export const getProfileMenuItems = (actions: HeaderActions) => [
  {
    label: "Profile",
    icon: ProfileIcon,
    onClick: actions.handleProfile,
  },

  // Optional
  // {
  //   label: "Switch role",
  //   onClick: actions.handleSwitchRole,
  // },
  // {
  //   label: "Language",
  //   onClick: actions.handleLanguage,
  // },

  {
    type: "separator",
  },
  {
    label: "Logout",
    icon: LogoutIcon,
    onClick: actions.handleLogout,
    danger: true
  },
];


// export const profileMenuItems = [
//   {
//     label: "Profile",
//     icon: ProfileIcon,
//     onClick: () => console.log("go to profile"),
//   },
// //   {
// //     label: "Switch role",
// //     icon: RefreshCw,
// //     onClick: () => console.log("switch role"),
// //   },
// //   {
// //     label: "Language",
// //     icon: Languages,
// //     onClick: () => console.log("change language"),
// //   },
//   {
//     type: "separator",
//   },
//   {
//     label: "Logout",
//     icon: LogoutIcon,
//     onClick: handleLogout,
//     danger: true,
//   },
// ];