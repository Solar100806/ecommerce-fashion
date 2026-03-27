import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type IProduct from "../../interfaces/IProduct";
import axios from "axios";
import { useCart } from "./context/useCart";
import { useWishlist } from "./context/useWishlist";

function ProductDetail() {
  const { id } = useParams();
  // console.log(id)
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const getProductById = async () => {
      try {
        setloading(true);
        const { data } = await axios.get(
          `http://localhost:3000/products/${id}`,
        );
        // console.log(data)
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    getProductById();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex text-sm text-gray-500 mb-6">
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Trang chủ
          </a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Sản phẩm
          </a>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900 truncate max-w-xs">
            {product?.name}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10">
            <div className="p-8 bg-gray-50 flex items-center justify-center border-r border-gray-100">
              <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-white text-gray-400 hover:text-red-500 transition-all shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>
                {product && (
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      isInWishlist(product.id)
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isInWishlist(product.id)
                      ? "Trong Wishlist"
                      : "Thêm Wishlist"}
                  </button>
                )}
              </div>
            </div>

            <div className="p-8 lg:pr-12 flex flex-col justify-center">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                {product?.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500 font-medium">
                  128 Đánh giá
                </span>
                <span className="text-gray-300">|</span>
                <span
                  className={`text-sm font-bold ${product?.status ? "text-green-600" : "text-red-600"}`}
                >
                  {product?.status ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wider">
                  Giá niêm yết
                </p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-extrabold text-indigo-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(product?.price))}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed border-b border-gray-100 pb-6">
                {product?.description || "Mô tả sản phẩm đang được cập nhật..."}
              </p>

              <div className="mb-8 flex items-center gap-6">
                <div
                  className={`flex items-center border rounded-xl overflow-hidden w-fit bg-white ${product?.quantity === 0 ? "border-gray-200 opacity-50" : "border-gray-300"}`}
                >
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={product?.quantity === 0}
                    className="w-12 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold text-lg disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300 font-semibold text-gray-800">
                    {product?.quantity === 0 ? 0 : quantity}
                  </div>
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(product?.quantity || 1, prev + 1),
                      )
                    }
                    disabled={
                      product?.quantity === 0 ||
                      quantity >= (product?.quantity || 1)
                    }
                    className="w-12 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold text-lg disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  Kho:{" "}
                  <span
                    className={`${product?.quantity === 0 ? "text-red-500" : "text-gray-900"} font-bold`}
                  >
                    {product?.quantity}
                  </span>
                </span>
              </div>

              <div className="flex gap-4 mt-auto">
                <button
                  onClick={() =>
                    product &&
                    product.quantity > 0 &&
                    addToCart(product, quantity)
                  }
                  disabled={product?.quantity === 0}
                  className={`flex-1 border-2 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    product?.quantity === 0
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  {product?.quantity === 0 ? "Hết hàng" : "Thêm giỏ hàng"}
                </button>
                <button
                  onClick={() => {
                    if (product && product.quantity > 0) {
                      addToCart(product, quantity);
                      navigate("/cart");
                    }
                  }}
                  disabled={product?.quantity === 0}
                  className={`flex-1 font-bold py-3.5 px-6 rounded-xl transition-all ${
                    product?.quantity === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95"
                  }`}
                >
                  Mua ngay
                </button>
              </div>
              <div className="flex gap-6 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 bg-green-50 rounded-full p-0.5">
                    ✔
                  </span>{" "}
                  Bảo hành 12 tháng
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 bg-green-50 rounded-full p-0.5">
                    ✔
                  </span>{" "}
                  Đổi trả 7 ngày
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button className="py-4 px-8 font-semibold text-sm border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50">
              Mô tả chi tiết
            </button>
            <button className="py-4 px-8 font-semibold text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              Đánh giá khách hàng
            </button>
          </div>
          <div className="p-8 prose max-w-none text-gray-600">
            <p>Nội dung mô tả sản phẩm sẽ hiển thị ở đây...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
