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
            Sản phẩm
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
            Admin Dashboard
          </div>
          <div className="flex items-center gap-5">
            <Link
              to="/admin/product/add"
              className="text-sm font-semibold bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              + Thêm sản phẩm
            </Link>
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
