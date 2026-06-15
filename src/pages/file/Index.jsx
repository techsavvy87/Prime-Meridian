import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import excelImg from "../../assets/imgs/excel.png";
import folderImg from "../../assets/imgs/folder.png";
import pdfImg from "../../assets/imgs/pdf-icon.png";
import { GoDownload } from "react-icons/go";
import { BsFolder2Open } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import dayImg from "../../assets/imgs/calendar.png";
import moneyImg from "../../assets/imgs/income.png";
import { RxUpload } from "react-icons/rx";
import NavigationDrawer from "../../components/NavigationDrawer";
import DocPreviewModal from "../../components/DocPreviewModal";
import DeleteModal from "../../components/DeleteModal";
import { useDispatch } from "react-redux";
import { openDocPreviewModal } from "../../redux/modal/docPreviewSlice";
import { openDeleteModal } from "../../redux/modal/deleteSlice";

const uploadedDocuments = [
  {
    id: 1,
    name: "W-2 2024",
    type: "Income",
    sort: pdfImg,
    status: "processing",
    added: "12/15/2025",
  },
  {
    id: 2,
    name: "1099-MISC",
    type: "Income",
    sort: pdfImg,
    status: "completed",
    added: "12/10/2025",
  },
  {
    id: 3,
    name: "1099-INT",
    type: "Income",
    sort: pdfImg,
    status: "completed",
    added: "12/05/2025",
  },
  {
    id: 4,
    name: "Schedule C",
    type: "Income",
    sort: folderImg,
    status: "needs-review",
    added: "12/01/2025",
  },
  {
    id: 5,
    name: "Bank Statements",
    type: "Income",
    sort: excelImg,
    status: "needs-review",
    added: "11/28/2025",
  },
];

const prepareTaxs = [
  {
    name: "W-2 2024",
    sort: pdfImg,
    status: "completed",
    added: "12/15/2025",
  },
  {
    name: "1099-MISC",
    sort: pdfImg,
    status: "completed",
    added: "12/10/2025",
  },
  {
    name: "1099-INT",
    sort: pdfImg,
    status: "completed",
    added: "12/05/2025",
  },
];

const File = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Status icons and colors
  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <GiSandsOfTime style={{ color: "Orange" }} />; // Yellow clock
      case "completed":
        return <FaCheck style={{ color: "Green" }} />; // Green check
      case "needs-review":
        return <CiSearch style={{ color: "Red" }} />; // Red exclamation
      default:
        return null;
    }
  };

  const [documents, setDocuments] = useState(uploadedDocuments);
  const [taxs, setTaxs] = useState(prepareTaxs);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const sortData = (key, dataType) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    let dataToSort = dataType === "tax" ? taxs : documents;

    const sorted = [...dataToSort].sort((a, b) => {
      if (key === "added") {
        const dateA = new Date(a[key].split("/").reverse().join("-"));
        const dateB = new Date(b[key].split("/").reverse().join("-"));
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    if (dataType === "tax") {
      setTaxs(sorted);
    } else {
      setDocuments(sorted);
    }
    setSortConfig({ key, direction });
  };

  const getSortIcons = (key) => {
    if (sortConfig.key !== key) {
      return (
        <span className="inline-flex flex-col text-[10px] ml-1">
          <span style={{ color: "#0000004D" }}>▲</span>
          <span style={{ color: "#0000004D" }}>▼</span>
        </span>
      );
    }

    const isAsc = sortConfig.direction === "asc";
    return (
      <span className="inline-flex flex-col text-[10px] ml-1">
        <span style={{ color: isAsc ? "#232323" : "#0000004D" }}>▲</span>
        <span style={{ color: isAsc ? "#0000004D" : "#232323" }}>▼</span>
      </span>
    );
  };

  const handleConfirmDelete = (docId) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };
  return (
    <div className="flex flex-col md:flex-row file min-h-screen">
      <Sidebar />
      <div className="flex md:hidden w-full items-center justify-between">
        <NavigationDrawer />
        <div className="flex items-center gap-2 ml-auto mr-4 p-2 border border-[#00584E] rounded-lg text-[#00584E] cursor-pointer">
          <RxUpload />
          <p className="text-[#00584E] font-semibold text-[14px]">Upload</p>
        </div>
      </div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              TabIndicatorProps={{ style: { display: "none" } }} // ✅ hide default indicator
            >
              <Tab
                value="1"
                label={
                  <div className="flex items-center gap-2">
                    <GoDownload size={24} />
                    <span className="font-semibold text-[15px]">
                      Uploaded documents
                    </span>
                  </div>
                }
                sx={{
                  textTransform: "none", // keep text as-is
                  borderBottom: value === "1" ? 2 : 0,
                  borderColor: value === "1" ? "#00584E" : "transparent",
                  "&.Mui-selected": {
                    color: "#00584E", // text color
                  },
                  // width: {
                  //   xs: "50%",
                  //   sm: "auto",
                  // },
                }}
              />

              <Tab
                value="2"
                label={
                  <div className="flex items-center gap-2">
                    <BsFolder2Open size={24} />
                    <span className="font-semibold text-[15px]">
                      Prepared tax return
                    </span>
                  </div>
                }
                sx={{
                  textTransform: "none", // keep text as-is
                  borderBottom: value === "2" ? 2 : 0,
                  borderColor: value === "2" ? "#00584E" : "transparent",
                  "&.Mui-selected": {
                    color: "#00584E", // text color
                  },
                  // width: {
                  //   xs: "50%",
                  //   sm: "auto",
                  // },
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <table className="pc-shape w-full border-collapse">
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th onClick={() => sortData("name", "document")}>
                    <div className="flex items-center gap-2.5">
                      File Name {getSortIcons("name")}
                    </div>
                  </th>
                  <th onClick={() => sortData("type", "document")}>
                    <div className="flex items-center gap-2.5">
                      Type {getSortIcons("type")}
                    </div>
                  </th>
                  <th onClick={() => sortData("status", "document")}>
                    <div className="flex items-center gap-2.5">
                      Status {getSortIcons("status")}
                    </div>
                  </th>
                  <th onClick={() => sortData("added", "document")}>
                    <div className="flex items-center gap-2.5">
                      Added {getSortIcons("added")}
                    </div>
                  </th>
                  <th
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3 flex items-center gap-2">
                      <img
                        src={doc.sort}
                        className="w-6 h-6 mr-2"
                        alt="sort icon"
                      />
                      {doc.name}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-[#232323] text-[14px]">
                        <img
                          src={moneyImg}
                          className="w-[15px] h-[15px] mr-2"
                          alt="money icon"
                        />
                        {doc.type}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-[6px] px-[15px] py-[6px] rounded-md text-sm font-medium ${
                          doc.status === "processing"
                            ? "bg-[#FFBF00]/15 text-[#FFBF00]"
                            : doc.status === "completed"
                            ? "bg-[#34C759]/15 text-[#34C759]"
                            : "bg-[#FF383C]/15 text-[#FF383C]"
                        }`}
                      >
                        {getStatusIcon(doc.status)}
                        {doc.status === "processing"
                          ? "Processing"
                          : doc.status === "completed"
                          ? "Completed"
                          : "Needs Review"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-[#232323] text-[14px]">
                        <img
                          src={dayImg}
                          className="w-[15px] h-[15px] mr-2"
                          alt="calendar icon"
                        />
                        {doc.added}
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        className="px-3 py-1.5 bg-[#00584E] text-white border-none rounded-lg cursor-pointer text-sm mr-2"
                        onClick={() => dispatch(openDocPreviewModal())}
                      >
                        Review
                      </button>
                      <button
                        className="px-3 py-1.5 border font-medium border-[#FF0000] rounded-lg text-[#FF0000] cursor-pointer text-sm"
                        onClick={() => dispatch(openDeleteModal(doc))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mobile-shape">
              {documents.map((doc, index) => (
                <div
                  className="border border-[#BFBFBF] rounded-lg bg-[#FEFEFE] mb-2 p-4"
                  key={index}
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={doc.sort}
                      className="w-9 h-9 mr-2"
                      alt="sort icon"
                    />
                    <p className="text-[#232323] font-medium text-[20px]">
                      {doc.name}
                    </p>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-5">
                      <img
                        src={moneyImg}
                        className="w-[15px] h-[15px] mr-2"
                        alt="money icon"
                      />
                      <p className="text-[#717171] text-[12px]">{doc.type}</p>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={dayImg}
                        className="w-[15px] h-[15px] mr-2"
                        alt="calendar icon"
                      />
                      <p className="text-[#717171] text-[12px]">{doc.added}</p>
                    </div>
                  </div>
                  <div className="flex mb-5">
                    <span
                      className={`inline-flex items-center gap-[6px] px-[10px] py-[3px] rounded-md text-sm font-medium ${
                        doc.status === "processing"
                          ? "bg-[#FFBF00]/15 text-[#FFBF00]"
                          : doc.status === "completed"
                          ? "bg-[#34C759]/15 text-[#34C759]"
                          : "bg-[#FF383C]/15 text-[#FF383C]"
                      }`}
                    >
                      {getStatusIcon(doc.status)}
                      {doc.status === "processing"
                        ? "Processing"
                        : doc.status === "completed"
                        ? "Completed"
                        : "Needs Review"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 bg-[#00584E] text-white border-none rounded-lg cursor-pointer text-sm mr-2"
                      onClick={() => dispatch(openDocPreviewModal())}
                    >
                      Review
                    </button>
                    <button
                      className="px-3 py-1.5 border font-medium border-[#FF0000] rounded-lg text-[#FF0000] cursor-pointer text-sm"
                      onClick={() => dispatch(openDeleteModal(doc))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2">
            {" "}
            <table className="pc-shape w-full border-collapse">
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th onClick={() => sortData("name", "tax")}>
                    <div className="flex items-center gap-2.5">
                      File Name {getSortIcons("name")}
                    </div>
                  </th>
                  <th onClick={() => sortData("status", "tax")}>
                    <div className="flex items-center gap-2.5">
                      Status {getSortIcons("status")}
                    </div>
                  </th>
                  <th onClick={() => sortData("added", "tax")}>
                    <div className="flex items-center gap-2.5">
                      Added {getSortIcons("added")}
                    </div>
                  </th>
                  <th
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {taxs.map((tax, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3 flex items-center gap-2">
                      <img
                        src={tax.sort}
                        className="w-6 h-6 mr-2"
                        alt="sort icon"
                      />
                      {tax.name}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-[6px] px-[15px] py-[6px] rounded-md text-sm font-medium bg-[#34C759]/10 text-green-500`}
                      >
                        <FaCheck style={{ color: "Green" }} />
                        Completed
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-[#232323] text-[14px]">
                        <img
                          src={dayImg}
                          className="w-[15px] h-[15px] mr-2"
                          alt="calendar icon"
                        />
                        {tax.added}
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        className="px-3 py-1.5 bg-[#00584E] text-white border-none rounded-lg cursor-pointer text-sm mr-2"
                        onClick={() => dispatch(openDocPreviewModal())}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mobile-shape">
              {taxs.map((tax, index) => (
                <div
                  className="border border-[#BFBFBF] rounded-lg bg-[#FEFEFE] mb-2 p-4"
                  key={index}
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={tax.sort}
                      className="w-9 h-9 mr-2"
                      alt="sort icon"
                    />
                    <p className="text-[#232323] font-medium text-[20px]">
                      {tax.name}
                    </p>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-5">
                      <img
                        src={moneyImg}
                        className="w-[15px] h-[15px] mr-2"
                        alt="money icon"
                      />
                      <p className="text-[#717171] text-[12px]">{tax.type}</p>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={dayImg}
                        className="w-[15px] h-[15px] mr-2"
                        alt="calendar icon"
                      />
                      <p className="text-[#717171] text-[12px]">{tax.added}</p>
                    </div>
                  </div>
                  <div className="flex mb-5">
                    <span
                      className={`inline-flex items-center gap-[6px] px-[10px] py-[3px] rounded-md text-sm font-medium bg-[#34C759]/10 text-green-500`}
                    >
                      <FaCheck style={{ color: "Green" }} />
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 bg-[#00584E] text-white border-none rounded-lg cursor-pointer text-sm mr-2"
                      onClick={() => dispatch(openDocPreviewModal())}
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
      <div className="hidden md:flex absolute top-[4%] right-[10%] items-center gap-2 ml-auto mr-4 p-2 border border-[#00584E] rounded-lg text-[#00584E] cursor-pointer">
        <RxUpload />
        <p className="text-[#00584E] font-semibold text-[14px]">Upload</p>
      </div>

      {/* Document Preview Modal */}
      <DocPreviewModal />
      {/* Delete Modal */}
      <DeleteModal onConfirm={handleConfirmDelete} />
    </div>
  );
};
export default File;
