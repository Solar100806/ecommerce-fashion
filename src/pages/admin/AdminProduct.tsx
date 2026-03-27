import { useEffect, useMemo, useState } from "react";
import type IProduct from "../../interfaces/IProduct";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProduct() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/products");
        if (!data) return;
        setProducts(data);
      } catch (error) {
        setError("Lỗi khi tải dữ liệu từ máy chủ");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (!id) return;
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.",
      )
    ) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        // Cập nhật lại state để giao diện mất đi sản phẩm vừa xóa mà không cần reload trang
        setProducts(products.filter((product) => product.id !== id));
        alert("Xóa sản phẩm thành công!");
      } catch (error) {
        alert("Xóa thất bại, vui lòng thử lại!"); // Đã sửa lỗi logic ở đây
        console.error(error);
      }
    }
  };

  // Hàm format tiền tệ
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const categories = useMemo(
    () => ["all", ...new Set(products.map((item) => item.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "stock-asc") {
      result.sort((a, b) => Number(a.quantity) - Number(b.quantity));
    } else if (sortBy === "stock-desc") {
      result.sort((a, b) => Number(b.quantity) - Number(a.quantity));
    }

    return result;
  }, [categoryFilter, products, searchKeyword, sortBy]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-5 text-center text-red-500 font-medium bg-red-50 rounded-lg border border-red-100">
        {error}
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header của bảng */}
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Quản lý Sản phẩm</h2>
          <p className="text-sm text-gray-500 mt-1">
            Hiển thị: {filteredProducts.length}/{products.length} sản phẩm
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          to="/admin/product/add"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Thêm sản phẩm
        </Link>
      </div>

      <div className="p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-50">
        <input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Tìm theo tên hoặc mô tả..."
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "Tất cả danh mục" : category}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
        >
          <option value="default">Sắp xếp mặc định</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="stock-asc">Kho tăng dần</option>
          <option value="stock-desc">Kho giảm dần</option>
        </select>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Giá bán
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Kho
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Đánh giá
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts &&
              filteredProducts.map((item: IProduct) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Ảnh */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-14 w-14 rounded-lg border border-gray-200 overflow-hidden bg-gray-100">
                      <img
                        className="h-full w-full object-cover"
                        src={item.image}
                        alt={item.name}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://via.placeholder.com/150")
                        }
                      />
                    </div>
                  </td>

                  {/* Tên */}
                  <td className="px-6 py-4">
                    <div
                      className="text-sm font-semibold text-gray-900 line-clamp-2 max-w-[200px]"
                      title={item.name}
                    >
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                      {item.description}
                    </div>
                  </td>

                  {/* Danh mục */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                      {item.category}
                    </span>
                  </td>

                  {/* Giá */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </div>
                  </td>

                  {/* Số lượng */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${item.quantity > 10 ? "text-gray-900" : "text-red-600"}`}
                    >
                      {item.quantity}
                    </span>
                  </td>

                  {/* Rating - Gọi đúng cấu trúc db.json */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-sm font-medium text-gray-700">
                        {item.rating?.rate || 0}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      ({item.rating?.count || 0} lượt)
                    </div>
                  </td>

                  {/* Hành động */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/admin/product/edit/${item.id}`}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors bg-indigo-50 hover:bg-indigo-100 p-2 rounded-md"
                        title="Sửa"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id as string | number)}
                        className="text-red-600 hover:text-red-900 transition-colors bg-red-50 hover:bg-red-100 p-2 rounded-md"
                        title="Xóa"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {filteredProducts.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500 border-t border-gray-100">
          Không có sản phẩm phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </div>
  );
}

export default AdminProduct;
