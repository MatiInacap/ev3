import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/Register";
import UserDashboard from "../pages/user/userdashboard";
import CoachDashboard from "../pages/coach/coachdashboard";
import AdminDashboard from "../pages/admin/admindashboard";
import SportsPage from "../pages/admin/SportsPage";
import UsersPage from "../pages/admin/UsersPage";
import UserLayout from "../layouts/userlayout";
import CoachLayout from "../layouts/coachlayout";
import AdminLayout from "../layouts/adminlayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute rolRequerido="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        <Route
          path="/coach"
          element={
            <ProtectedRoute rolRequerido="coach">
              <CoachLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CoachDashboard />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute rolRequerido="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="deportes" element={<SportsPage />} />
          <Route path="usuarios" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;