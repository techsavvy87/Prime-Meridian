import { useState } from "react";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { RxDashboard } from "react-icons/rx";
import { IoChatbubbleOutline, IoSettingsOutline } from "react-icons/io5";
import { CiBank, CiFileOn, CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import LogoutModal from "./LogoutModal";
import { openLogoutModal } from "../redux/modal/logoutSlice";

const menuItems = [
  { name: "Dashboard", icon: <RxDashboard size={24} />, link: "/dashboard" },
  {
    name: "AI Online Chat",
    icon: <IoChatbubbleOutline size={24} />,
    link: "/chat",
  },
  { name: "My Files", icon: <CiFileOn size={24} />, link: "/file" },
  { name: "Banking", icon: <CiBank size={24} />, link: "/bank" },
  {
    name: "Settings",
    icon: <IoSettingsOutline size={24} />,
    link: "/setting",
  },
];

const NavigationDrawer = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="block md:hidden">
      <MenuIcon
        sx={{ fontSize: 40, margin: "20px 0 0 0" }}
        onClick={toggleDrawer(true)}
      />

      {/* Drawer */}
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: "80%" },
        }}
        anchor="left"
      >
        <aside className="w-full min-h-screen bg-[#232323] px-[10px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between py-10">
              <p className="font-semibold font-inter text-[18px] text-white ">
                Prime Meridian
              </p>
              <IoMdClose
                style={{ fontSize: 36, color: "white" }}
                onClick={toggleDrawer(false)}
              />
            </div>

            <nav>
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-4 rounded-lg mb-5 ${
                          isActive
                            ? "bg-white text-[#232323] shadow-[0_7px_20.8px_0_rgba(255,255,255,0.25)]"
                            : "text-white"
                        }`
                      }
                    >
                      <span className="w-5 h-5 flex items-center">
                        {item.icon}
                      </span>
                      <span className="font-medium text-[18px]">
                        {item.name}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="px-4 pb-8">
              <div className="border-t border-[#bfbfbf]/30 mt-6 pt-6"></div>

              <button
                className="mt-4 flex items-center gap-3"
                onClick={() => dispatch(openLogoutModal())}
              >
                <CiLogout className="w-5 h-5 text-white" />
                <span className="font-medium text-[18px] text-white">
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </aside>
      </Drawer>
      <LogoutModal />
    </div>
  );
};

export default NavigationDrawer;
