import { RxDashboard } from "react-icons/rx";
import { IoChatbubbleOutline, IoSettingsOutline } from "react-icons/io5";
import { CiBank, CiFileOn, CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLogoutModal } from "../redux/modal/logoutSlice";
import LogoutModal from "./LogoutModal";

const Sidebar = () => {
  const dispatch = useDispatch();
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

  return (
    <aside className="w-[20%] min-h-screen bg-[#232323] pl-[30px] pr-5 hidden md:block">
      <div className="flex flex-col h-full">
        <p className="font-semibold font-inter text-[16px] text-white my-6 pt-[5%] pb-[20%]">
          Prime Meridian
        </p>

        <nav className="px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-4 rounded-lg ${
                      isActive
                        ? "bg-white text-[#232323] shadow-[0_7px_20.8px_0_rgba(255,255,255,0.25)]"
                        : "text-white"
                    }`
                  }
                >
                  <span className="w-5 h-5 flex items-center">{item.icon}</span>
                  <span className="font-medium text-[18px]">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 pb-8">
          <div className="border-t border-[#bfbfbf]/30 mt-6 pt-6"></div>

          <button
            className="mt-4 flex items-center gap-3 cursor-pointer"
            onClick={() => dispatch(openLogoutModal())}
          >
            <CiLogout className="w-5 h-5 text-white" />
            <span className="font-medium text-[18px] text-white">Log Out</span>
          </button>
        </div>
      </div>
      <LogoutModal />
    </aside>
  );
};

export default Sidebar;
