import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import type IProduct from "../../interfaces/IProduct";

function AddProduct() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IProduct>();

  const watchImage = watch("image");

  // Xử lý khi bấm Thêm mới
  const onSubmit = async (data: IProduct) => {
    try {
      const newProductData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        rating: {
          rate: 5.0,
          count: 0,
        },
      };
      await axios.post("http://localhost:3000/products", newProductData);

      alert("Thêm sản phẩm mới thành công!");
      navigate("/admin/product");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Thêm mới thất bại, vui lòng kiểm tra lại server!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Thêm sản phẩm mới
            </h1>
            <p className="text-gray-500 mt-1">
              Điền thông tin bên dưới để tạo sản phẩm
            </p>
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Quay lại
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tên sản phẩm */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Vui lòng nhập tên sản phẩm",
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder="VD: Áo Thun Cotton Nam"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Giá sản phẩm */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Giá bán (VNĐ) *
                </label>
                <input
                  type="number"
                  {...register("price", {
                    required: "Vui lòng nhập giá",
                    min: { value: 0, message: "Giá không được âm" },
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.price
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder="VD: 150000"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Số lượng */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Số lượng kho *
                </label>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Vui lòng nhập số lượng",
                    min: { value: 0, message: "Số lượng không được âm" },
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.quantity
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder="VD: 50"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Danh mục */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Danh mục *
                </label>
                <select
                  {...register("category", {
                    required: "Vui lòng chọn danh mục",
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white ${
                    errors.category
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                >
                  <option value="">-- Chọn danh mục --</option>
                  <option value="Áo Thun">Áo Thun</option>
                  <option value="Áo Sơ Mi">Áo Sơ Mi</option>
                  <option value="Áo Khoác">Áo Khoác</option>
                  <option value="Quần">Quần</option>
                  <option value="Đồ Thể Thao">Đồ Thể Thao</option>
                  <option value="Váy & Đầm">Váy & Đầm</option>
                  <option value="Đồ Âu">Đồ Âu</option>
                  <option value="Đồ Mặc Nhà">Đồ Mặc Nhà</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* URL Hình ảnh */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Link hình ảnh *
                </label>
                <input
                  type="text"
                  {...register("image", { required: "Vui lòng nhập link ảnh" })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.image
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder="https://..."
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Mô tả */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mô tả sản phẩm *
                </label>
                <textarea
                  {...register("description", {
                    required: "Vui lòng nhập mô tả",
                  })}
                  rows={4}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                    errors.description
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Nhập chi tiết về chất liệu, kiểu dáng..."
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Khung xem trước hình ảnh (Preview) */}
            {watchImage && (
              <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex gap-4 items-center">
                <div className="w-20 h-20 rounded shadow-sm overflow-hidden bg-white">
                  <img
                    src={watchImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/150?text=Lỗi+ảnh")
                    }
                  />
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  Ảnh xem trước
                </span>
              </div>
            )}

            {/* Nút hành động */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Link
                to="/admin"
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Hủy bỏ
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-wait" : ""
                }`}
              >
                {isSubmitting ? "Đang xử lý..." : "Thêm sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
