import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./App";
import Signup from "./Signup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Navigate to="/signup" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
