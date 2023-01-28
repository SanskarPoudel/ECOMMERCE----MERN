import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminWrapper() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
