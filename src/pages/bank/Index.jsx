import { forwardRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import bankImg from "../../assets/imgs/bank.png";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { LuCopy } from "react-icons/lu";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { TbInvoice } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { LiaDollarSignSolid } from "react-icons/lia";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import NavigationDrawer from "../../components/NavigationDrawer.jsx";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    style={{
      border: "1px solid #D9D9D9",
      padding: "10px 12px",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      background: "#fff",
    }}
  >
    <span className="text-[#1C1C1C] font-medium text-[14px]">
      {value || "Select date range"}
    </span>
    <span style={{ marginLeft: "8px" }}>
      <CiCalendar size={25} />
    </span>
  </div>
));

const BankDisable = () => {
  return (
    <div className="p-3 md:p-8 pb-15 w-full md:w-[80%]">
      <p className="text-[32px] text-[#1c1c1c] font-semibold">
        Refund Debit Card
      </p>
      <p className="text-[18px] text-[#7c7c7c]">
        Your card will activate once your IRS refund arrives. We'll notify you
        when it's ready.
      </p>
      <img src={bankImg} alt="Bank" className="mt-4 opacity-30" />
    </div>
  );
};

const BankActive = () => {
  const [startDate, setStartDate] = useState(new Date(2026, 3, 15));
  const [endDate, setEndDate] = useState(new Date(2026, 4, 15));
  return (
    <div className="p-3 md:p-8 pb-15 w-full md:w-[80%]">
      <p className="text-[32px] text-[#1c1c1c] font-semibold">
        Refund Debit Card
      </p>
      <p className="text-[18px] text-[#7c7c7c]">Your card for refund.</p>
      <img
        src={bankImg}
        alt="Bank"
        className="mt-4 w-[65%] md:w-auto mx-auto md:mx-0"
      />
      <div className="flex gap-5 justify-between md:justify-normal">
        <button className="flex items-center gap-2 text-[#00584E] font-medium text-[14px] border border-[#00584E] py-2 px-5 rounded-lg cursor-pointer">
          <VisibilityOutlinedIcon /> Show Details
        </button>
        <button className="flex items-center gap-2 text-[#00584E] font-medium text-[14px] border border-[#00584E] py-2 px-5 rounded-lg cursor-pointer">
          <LuCopy /> Copy Number
        </button>
      </div>
      <p className="font-semibold text-[20px] text-[#1c1c1c] pt-8 pb-4">
        Transactions History
      </p>
      <div className="flex justify-items-normal md:items-center justify-between md:flex-row flex-col gap-4">
        <div className="w-full md:w-auto">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={([start, end]) => {
              setStartDate(start);
              setEndDate(end);
            }}
            dateFormat="MMMM dd, yyyy"
            customInput={<CustomInput />}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button className="flex items-center gap-2 text-white font-medium text-[14px] bg-[#00584E] py-2 px-5 rounded-lg cursor-pointer">
            <CiExport size={20} /> Export CSV
          </button>
          <button className="flex items-center gap-2 text-white font-medium text-[14px] bg-[#00584E] py-2 px-5 rounded-lg cursor-pointer">
            <TbInvoice size={20} /> Download Invoices
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 mt-7">
        <div className="border border-[#DBDBDB] rounded-lg flex items-start gap-4 p-3 md:p-6 mb-3">
          <div className="bg-[#F7F7F7] w-11 h-11 rounded-[50%] flex items-center justify-center">
            <BsCurrencyDollar size={20} className="text-[#818181]" />
          </div>
          <div>
            <p className="text-[#7c7c7c] text-[18px] ml-[10px]">
              Available Balance
            </p>
            <div className="flex items-center">
              <LiaDollarSignSolid size={32} />
              <p className="text-[#1c1c1c] font-semibold text-[20px] md:text-[32px]">
                15,187.30
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#DBDBDB] rounded-lg flex items-start gap-4 p-3 md:p-6 mb-3">
          <div className="bg-[#F7F7F7] w-11 h-11 rounded-[50%] flex items-center justify-center">
            <FaArrowDown size={20} className="text-[#818181]" />
          </div>
          <div>
            <p className="text-[#7c7c7c] text-[18px] ml-[10px]">Incomes</p>
            <div className="flex items-center">
              <LiaDollarSignSolid size={32} />
              <p className="text-[#1c1c1c] font-semibold text-[20px] md:text-[32px]">
                15,187.30
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#DBDBDB] rounded-lg flex items-start gap-4 p-3 md:p-6 mb-3">
          <div className="bg-[#F7F7F7] w-11 h-11 rounded-[50%] flex items-center justify-center">
            <FaArrowUp size={20} className="text-[#818181]" />
          </div>
          <div>
            <p className="text-[#7c7c7c] text-[18px] ml-[10px]">Expenses</p>
            <div className="flex items-center">
              <LiaDollarSignSolid size={32} />
              <p className="text-[#1c1c1c] font-semibold text-[20px] md:text-[32px]">
                15,187.30
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Bank = () => {
  return (
    <div className="bank flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex md:hidden w-full items-center justify-between p-3 pb-0">
        <NavigationDrawer />
      </div>
      <BankActive />
    </div>
  );
};

export default Bank;
