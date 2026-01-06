import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SensitivityTester from './pages/sensitivity-tester';
import TutorialGuide from './pages/tutorial-guide';
import SensitivityCalculator from './pages/sensitivity-calculator';
import UserProfile from './pages/user-profile';
import DashboardHome from './pages/dashboard-home';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/sensitivity-tester" element={<SensitivityTester />} />
        <Route path="/tutorial-guide" element={<TutorialGuide />} />
        <Route path="/sensitivity-calculator" element={<SensitivityCalculator />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
