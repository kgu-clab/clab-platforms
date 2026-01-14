import { GoHomeFill } from "react-icons/go";
import { ImBubbles } from "react-icons/im";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { IoBook, IoPerson } from "react-icons/io5";
import { ROUTE } from "@/shared/config/route";
import type { BottomNavbarItemProps } from "./BottomNavbar";

export const BOTTOM_NAVBAR_CONFIG: BottomNavbarItemProps[] = [
  {
    icon: <ImBubbles />,
    label: "커뮤니티",
    href: ROUTE.COMMUNITY,
  },
  {
    icon: <HiMiniSquare3Stack3D />,
    label: "활동",
    href: ROUTE.ACTIVITY,
  },
  {
    icon: <GoHomeFill />,
    label: "홈",
    href: ROUTE.HOME,
  },
  {
    icon: <IoBook />,
    label: "도서관",
    href: ROUTE.LIBRARY,
  },
  {
    icon: <IoPerson />,
    label: "마이",
    href: ROUTE.MY,
  },
];
