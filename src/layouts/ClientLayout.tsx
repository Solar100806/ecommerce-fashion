import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../pages/client/context/useCart";
import { useWishlist } from "../pages/client/context/useWishlist";

function ClientLayout() {
  const [user, setUser] = useState<any>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  return (
    <div>
      <header>
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-900">
                  StyleStore
                </span>
              </div>

              <div className="hidden md:flex space-x-8">
                <Link
                  to="/"
                  className="text-primary font-medium hover:text-indigo-800 transition"
                >
                  Trang chủ
                </Link>
                <Link
                  to="/product"
                  className="text-primary font-medium hover:text-indigo-800 transition"
                >
                  Sản phẩm
                </Link>
                <Link
                  to="cart"
                  className="text-gray-500 hover:text-gray-900 transition"
                >
                  Giỏ hàng ({cartItems.length})
                </Link>
                <Link
                  to="wishlist"
                  className="text-gray-500 hover:text-gray-900 transition"
                >
                  Yêu thích ({wishlistItems.length})
                </Link>
                <Link
                  to="contact"
                  className="text-gray-500 hover:text-gray-900 transition"
                >
                  Liên hệ
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-700">
                      Hi, {user.email?.split("@")[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-red-500 hover:text-red-700 transition"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-700 hover:text-primary transition"
                    >
                      Đăng ký
                    </Link>
                    <Link
                      to="login"
                      className="text-sm font-medium text-gray-700 hover:text-primary transition"
                    >
                      Đăng nhập
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
      <footer>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © 2026 WD20306. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default ClientLayout;
