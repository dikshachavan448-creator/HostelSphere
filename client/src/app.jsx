import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateComplaint from "./pages/createcomplaint";
import MyComplaints from "./pages/mycomplaints";
import Profile from "./pages/profile";
import Leave from "./pages/leave";
import NoticeBoard from "./pages/noticeboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/adminlogin";
import AdminDashboard from "./pages/admindashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ManageComplaints from "./pages/managecomplaints";
import ManageLeave from "./pages/manageleave";
import ManageNotices from "./pages/managenotices";
function App() {
  return (
    <BrowserRouter>
  <Routes>

    <Route path="/" element={<Login />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/create-complaint"
      element={
        <ProtectedRoute>
          <CreateComplaint />
        </ProtectedRoute>
      }
    />

    <Route
      path="/my-complaints"
      element={
        <ProtectedRoute>
          <MyComplaints />
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />

    <Route
      path="/leave"
      element={
        <ProtectedRoute>
          <Leave />
        </ProtectedRoute>
      }
    />

    <Route
      path="/noticeboard"
      element={
        <ProtectedRoute>
          <NoticeBoard />
        </ProtectedRoute>
      }
    />
    <Route path="/admin" element={<AdminLogin />} />

<Route
  path="/admin-dashboard"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/manage-complaints"
  element={
    <AdminProtectedRoute>
      <ManageComplaints />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/manage-leave"
  element={
    <AdminProtectedRoute>
      <ManageLeave />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/manage-notices"
  element={
    <AdminProtectedRoute>
      <ManageNotices />
    </AdminProtectedRoute>
  }
/>

  </Routes>
</BrowserRouter>
  );
}

export default App;