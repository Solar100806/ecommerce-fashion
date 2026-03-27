import { Link } from "react-router-dom";
import { useCart } from "./context/useCart";
import { useWishlist } from "./context/useWishlist";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Sản phẩm yêu thích
          </h1>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm font-semibold text-red-500 hover:text-red-700"
            >
              Xóa toàn bộ
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Chưa có sản phẩm yêu thích
            </h2>
            <p className="text-gray-500 mb-6">
              Hãy thêm sản phẩm vào Wishlist để mua nhanh hơn sau này.
            </p>
            <Link
              to="/product"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="h-52 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs uppercase tracking-wider text-indigo-500 font-semibold mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[3rem]">
                    {item.name}
                  </h3>
                  <p className="text-indigo-600 text-xl font-extrabold mt-3">
                    {formatPrice(item.price)}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="col-span-1 text-center rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:border-indigo-200"
                    >
                      Chi tiết
                    </Link>
                    <button
                      onClick={() => addToCart(item)}
                      disabled={item.quantity === 0}
                      className={`col-span-1 rounded-lg py-2 text-sm font-semibold ${
                        item.quantity === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      Thêm giỏ
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="col-span-1 rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
