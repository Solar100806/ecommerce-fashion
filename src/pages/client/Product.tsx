import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type IProduct from "../../interfaces/IProduct";
import { useCart } from "./context/useCart";

function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const getALLProduct = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/products");
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    getALLProduct();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-indigo-600 pl-4">
          Sản phẩm nổi bật
        </h1>
        <button className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1 transition-colors">
          Xem tất cả sản phẩm
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products &&
          products.map((item: IProduct) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              {/* 1. Phần Ảnh & Badge */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={item.name}
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 shadow-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">
                  {item.category}
                </div>

                <h2
                  className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 min-h-[3.5rem] hover:text-indigo-600 transition-colors cursor-pointer"
                  title={item.name}
                >
                  {item.name}
                </h2>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-4 h-4 ${i < Math.round(item.rating?.rate || 0) ? "text-yellow-400" : "text-gray-200"}`}
                      >
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium italic">
                    {item.rating?.rate || 0}/5 ({item.rating?.count || 0} đánh giá)
                  </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-auto pt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">Giá ưu đãi</span>
                    <span className="text-xl font-extrabold text-indigo-600">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 font-medium mb-1">Kho hàng</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${item.quantity > 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}>
                      {item.quantity > 0 ? `${item.quantity} sản phẩm` : "Hết hàng"}
                    </span>
                  </div>
                </div>

            
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-1 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:bg-white hover:border-indigo-200 hover:text-indigo-600"
                  >
                    Chi tiết
                  </Link>
                  <button
                    onClick={() => addToCart(item)} 
                    disabled={item.quantity === 0}
                    className={`flex items-center justify-center rounded-xl px-4 py-2.5 text-white transition-all ${item.quantity > 0 ? "bg-indigo-600 hover:bg-indigo-700 active:scale-95" : "bg-gray-400 cursor-not-allowed"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Product;