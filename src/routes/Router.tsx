import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Pages imports
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import VansPage from "../pages/Vans/VansPage";
import VansDetailsPage from "../pages/Vans/VansDetailsPage";
import {
  Dashboard,
  HostPricing,
  HostVanDetail,
  HostVanPhotos,
  HostVans,
  Income,
  Reviews,
} from "../pages/Host";
import NotFoundPage from "../pages/NotFoundPage";
import AuthPage from "../pages/AuthPage";
import OtpPage from "../pages/OtpPage";
// Layout components imports
import Layout from "../components/Layout/Layout";
import HostLayout from "../components/Layout/HostLayout";
import HostVanDetailLayout from "../components/Layout/HostVanDetailLayout";
import ProtectRoutes from "../components/ProtectRoutes";

export const  Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="otp" element={<OtpPage />} />
      <Route path="vans" element={<VansPage />} />
      <Route path="vans/:id" element={<VansDetailsPage />} />
      <Route element={<ProtectRoutes />}>
        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="vans" element={<HostVans />} />
          <Route path="vans/:id" element={<HostVanDetailLayout />}>
            <Route index element={<HostVanDetail />} />
            <Route path="pricing" element={<HostPricing />} />
            <Route path="photos" element={<HostVanPhotos />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
