import Signup from "../pages/auth/Signup.jsx";
import VerifyEmail from "../pages/auth/VerifyEmail.jsx";
import SetPassword from "../pages/auth/SetPassword.jsx";
import Login from "../pages/auth/Login.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import VerifyPassword from "../pages/auth/VerifyPassword.jsx";
import UploadDoc from "../pages/onboarding/UploadDoc.jsx";
import LayoutOnboarding from "../components/LayoutOnboarding.jsx";
import Questionnaire from "../pages/onboarding/Questionnaire.jsx";
import Confirm from "../pages/onboarding/Confirm.jsx";
import Dashboard from "../pages/dashboard/Index.jsx";
import Chat from "../pages/chat/Index.jsx";
import LayoutAuth from "../components/LayoutAuth.jsx";
import File from "../pages/file/Index.jsx";
import Setting from "../pages/setting/Index.jsx";
import Bank from "../pages/bank/Index.jsx";
import TestPage from "../pages/test.jsx";

export const routes = [
  {
    path: "/test",
    component: <TestPage />,
  },
  {
    path: "/signup",
    layout: LayoutAuth,
    component: <Signup />,
  },
  {
    path: "/verify-email",
    layout: LayoutAuth,
    component: <VerifyEmail />,
  },
  {
    path: "/set-password",
    layout: LayoutAuth,
    component: <SetPassword />,
  },
  {
    path: "/login",
    layout: LayoutAuth,
    component: <Login />,
  },
  {
    path: "/reset-password",
    layout: LayoutAuth,
    component: <ResetPassword />,
  },
  {
    path: "/verify-password",
    layout: LayoutAuth,
    component: <VerifyPassword />,
  },
  {
    path: "/upload-doc",
    layout: LayoutOnboarding,
    component: <UploadDoc />,
  },
  {
    path: "/questionnaire",
    layout: LayoutOnboarding,
    component: <Questionnaire />,
  },
  {
    path: "/confirm",
    layout: LayoutOnboarding,
    component: <Confirm />,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/chat",
    component: <Chat />,
  },
  {
    path: "/file",
    component: <File />,
  },
  {
    path: "/setting",
    component: <Setting />,
  },
  {
    path: "/bank",
    component: <Bank />,
  },
];
