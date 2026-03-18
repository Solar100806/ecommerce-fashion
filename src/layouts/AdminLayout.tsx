import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-indigo-600 border-b border-gray-100 tracking-wider">
          WD20306
        </div>
        <nav className="flex-1 py-4">
          <Link
            to="/admin"
            className="block px-6 py-3 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-r-4 hover:border-indigo-600 transition-all"
          >
            Trang chủ
          </Link>
          <Link
            to="/admin/product"
            className="block px-6 py-3 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-r-4 hover:border-indigo-600 transition-all"
          >
            Đơn hàng
          </Link>
          <Link
            to="/admin/users"
            className="block px-6 py-3 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-r-4 hover:border-indigo-600 transition-all"
          >
            Người dùng
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white px-8 py-4 border-b border-gray-200 z-10">
          <div className="text-xl font-semibold text-gray-800">
            Xin chào, Admin
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm w-64 transition-shadow"
              />
            </div>

            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold border border-indigo-200 cursor-pointer shadow-sm">
              AD
            </div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
