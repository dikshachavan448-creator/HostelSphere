import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateComplaint from "./pages/createComplaint";
import MyComplaints from "./pages/myComplaints";
import Profile from "./pages/profile";
import Leave from "./pages/leave";
import NoticeBoard from "./pages/noticeboard";

import ProtectedRoute from "./components/protectedRoute";

import AdminLogin from "./pages/adminLogin";
import AdminDashboard from "./pages/adminDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import ManageComplaints from "./pages/manageComplaints";
import ManageLeave from "./pages/manageLeave";
import ManageNotices from "./pages/manageNotices";
import ManageStudents from "./pages/manageStudents";

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Student Login */}

        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/dashboard" />
              : <Login />
          }
        />



        {/* Student Routes */}


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





        {/* Admin Routes */}



        <Route

          path="/admin"

          element={<AdminLogin />}

        />




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
  path="/admin/leaves"
  element={
    <AdminProtectedRoute>
      <ManageLeave />
    </AdminProtectedRoute>
  }
/>



        
<Route
  path="/admin/notices"
  element={
    <AdminProtectedRoute>
      <ManageNotices />
    </AdminProtectedRoute>
  }
/>
<Route

  path="/admin/students"

  element={

    <AdminProtectedRoute>

      <ManageStudents />

    </AdminProtectedRoute>

  }

/>

        {/* Unknown URL */}

        <Route

          path="*"

          element={<Navigate to="/" />}

        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;
