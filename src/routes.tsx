import { createBrowserRouter } from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TrackingPage from "./pages/TrackingPage";
import Protected from "./components/Protected";

export const router = createBrowserRouter([
  { path: "/", element: <OnboardingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/tracking",
    element: (
      <Protected>
        <TrackingPage />
      </Protected>
    ),
  },
]);
