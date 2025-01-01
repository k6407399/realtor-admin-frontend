import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import ListProperty from "./pages/ListProperty";
import ManageProperty from "./pages/ManageProperty";
import Appointments from "./pages/Appointments";
import Approvals from "./pages/Approvals";
import Blocklist from "./pages/Blocklist";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="list-property" element={<ListProperty />} />
          <Route path="manage-property" element={<ManageProperty />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="blocklist" element={<Blocklist />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
