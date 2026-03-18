import React, { useState, useEffect } from "react";
import axios from "axios";
import type IProduct from "../../interfaces/IProduct";
import { useCart } from "./context/useCart";

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:3000/products");
        const data = response.data;
        setProducts(data.products || data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || err.message || "Lỗi khi gọi API",
          );
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Đã xảy ra lỗi không xác định");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 font-medium">
          Đang tải dữ liệu...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-4">
        <div className="text-red-500 font-medium text-lg">Lỗi: {error}</div>
      </div>
    );
  }
  const topRatedProducts = [...products]
    .sort((a, b) => (b.rate || 0) - (a.rate || 0))
    .slice(0, 4);
  const premiumProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 4);
  const rareProducts = [...products]
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* SECTION 1: ĐÁNH GIÁ CAO NHẤT */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              Đánh giá cao nhất
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Được cộng đồng tin dùng và bình chọn cao
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative h-56 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                  <svg
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900">
                    {product.rate || "Chưa có"}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-100 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx={9} cy={21} r={1} />
                      <circle cx={20} cy={21} r={1} />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: SẢN PHẨM ĐẮT NHẤT */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-gray-900 text-white p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0l-7.59 7.59Z" />
                </svg>
              </span>
              Bộ sưu tập Premium
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Sản phẩm phân khúc cao cấp & đắt đỏ nhất
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg border-t-4 border-purple-800 overflow-hidden flex flex-col"
            >
              <div className="relative h-64 bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-0 right-0 bg-purple-800 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Premium
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-800">
                    {formatPrice(product.price)}
                  </span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-purple-100 p-2 rounded-full hover:bg-purple-800 hover:text-white transition-colors text-purple-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx={9} cy={21} r={1} />
                      <circle cx={20} cy={21} r={1} />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SẮP CHÁY HÀNG */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-red-100 text-red-600 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 22h14" />
                  <path d="M5 2h14" />
                  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                </svg>
              </span>
              Sắp cháy hàng
            </h2>
            <p className="text-red-500 text-sm mt-1 font-medium">
              Nhanh tay trước khi hết!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rareProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-red-200 shadow-sm relative opacity-90 hover:opacity-100 transition-opacity"
            >
              <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse z-10">
                CHỈ CÒN {product.quantity}
              </div>
              <div className="h-48 bg-gray-100 overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 truncate">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-900 font-bold">
                    {formatPrice(product.price)}
                  </span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-red-50 p-1.5 rounded-full hover:bg-red-600 hover:text-white transition-colors text-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx={9} cy={21} r={1} />
                      <circle cx={20} cy={21} r={1} />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
