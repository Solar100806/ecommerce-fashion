import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/useCart";

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );
  const shippingFee = subtotal > 0 ? 30000 : 0; 
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Vui lòng đăng nhập để tiến hành thanh toán!");
      return;
    }
    
    // Simulate API call for checkout
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(true);
    }, 800);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Giỏ hàng của bạn
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-500 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng.
            </p>
            <Link
              to="/product" 
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row gap-6 items-center"
                    >
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex-1 flex flex-col w-full">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                              <Link
                                to={`/product/${item.id}`}
                                className="hover:text-indigo-600 transition-colors"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.category}
                            </p>
                          </div>
                          <p className="text-lg font-bold text-indigo-600 sm:ml-4 mt-2 sm:mt-0 whitespace-nowrap">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 font-medium text-gray-900 border-l border-r border-gray-300">
                              {item.cartQuantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Xóa
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4 text-sm text-gray-600 border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <p>Tạm tính</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(subtotal)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Phí vận chuyển</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(shippingFee)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4">
                  <p className="text-base font-bold text-gray-900">Tổng cộng</p>
                  <p className="text-2xl font-extrabold text-indigo-600">
                    {formatPrice(total)}
                  </p>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md flex justify-center items-center gap-2 mt-2"
                >
                  Tiến hành thanh toán
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                <div className="mt-4 text-center">
                  <Link
                    to="/product"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                  >
                    hoặc Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {checkoutSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h3>
            <p className="text-gray-500 text-sm mb-6">Cảm ơn bạn đã mua sắm tại StyleStore. Đơn hàng của bạn đang được xử lý.</p>
            <Link 
              to="/product" 
              className="block w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;