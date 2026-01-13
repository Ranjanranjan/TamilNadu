// App.tsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { useLanguageStore } from "@/stores/languageStore";
import useAnalytics from "@/hooks/useAnalytics";

// Pages
import LanguageSelection from "./pages/LanguageSelection";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProblemDetail from "./pages/ProblemDetail";
import NotFound from "./pages/NotFound";

// Admin
import KuyavanAdmin from "./pages/__KuyavanAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPrayerRequests from "./pages/AdminPrayerRequests";
import AdminGuard from "./components/AdminGuard";

const queryClient = new QueryClient();

/* -----------------------------------
   LANGUAGE PROTECTED ROUTE
----------------------------------- */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { hasSelectedLanguage } = useLanguageStore();

  if (!hasSelectedLanguage) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};

/* -----------------------------------
   ANALYTICS WRAPPER
----------------------------------- */
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useAnalytics(); // 🔥 Global analytics init
  return <>{children}</>;
};

/* -----------------------------------
   APP
----------------------------------- */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <AnalyticsWrapper>
          <Routes>
            {/* Language selection */}
            <Route path="/welcome" element={<LanguageSelection />} />

            {/* Public pages (language protected) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />

            <Route
              path="/problem/:slug"
              element={
                <ProtectedRoute>
                  <ProblemDetail />
                </ProtectedRoute>
              }
            />

            {/* Admin auth */}
            <Route path="/__kuyavan_admin" element={<KuyavanAdmin />} />

            {/* Admin protected */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminGuard>
                  <AdminDashboard />
                </AdminGuard>
              }
            />

            <Route
              path="/admin-prayer-requests"
              element={
                <AdminGuard>
                  <AdminPrayerRequests />
                </AdminGuard>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnalyticsWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
