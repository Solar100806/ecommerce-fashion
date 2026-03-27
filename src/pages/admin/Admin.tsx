import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type IProduct from "../../interfaces/IProduct";

interface IUser {
  id: string;
  username: string;
  email: string;
}

function Admin() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [productRes, userRes] = await Promise.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/users"),
        ]);
        setProducts(productRes.data || []);
        setUsers(userRes.data || []);
      } catch (error) {
        console.error("Lỗi tải dữ liệu dashboard admin:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const totalInventoryValue = useMemo(
    () =>
      products.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      ),
    [products],
  );

  const lowStockProducts = useMemo(
    () => products.filter((item) => Number(item.quantity) <= 10).slice(0, 5),
    [products],
  );

  const topRatedProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        .slice(0, 5),
    [products],
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-sm text-gray-500 mt-1">
          Theo dõi nhanh tình hình sản phẩm và người dùng.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tổng sản phẩm</p>
          <p className="text-2xl font-extrabold text-indigo-600 mt-2">
            {products.length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tổng người dùng</p>
          <p className="text-2xl font-extrabold text-indigo-600 mt-2">
            {users.length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Sản phẩm sắp hết hàng (≤ 10)</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-2">
            {products.filter((item) => Number(item.quantity) <= 10).length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Giá trị tồn kho</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-2">
            {formatPrice(totalInventoryValue)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Sản phẩm sắp hết hàng</h2>
            <Link
              to="/admin/product"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Quản lý sản phẩm
            </Link>
          </div>
          <div className="p-5 space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-gray-500">
                Không có sản phẩm sắp hết hàng.
              </p>
            ) : (
              lowStockProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <span className="text-sm font-bold text-red-500">
                    Kho: {item.quantity}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Top sản phẩm rating cao</h2>
          </div>
          <div className="p-5 space-y-3">
            {topRatedProducts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <span className="text-sm font-bold text-amber-500">
                  {item.rating?.rate || 0}★
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
