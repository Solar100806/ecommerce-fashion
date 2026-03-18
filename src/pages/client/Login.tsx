import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface LoginInput {
  email: string;
  password?: string;
}

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      const user = users.find(
        (u: LoginInput) => u.email === data.email && u.password === data.password,
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        navigate("/product");
      } else {
        alert("Email hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Máy chủ đang gặp sự cố, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Chào mừng trở lại
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Đăng nhập để quản lý tài khoản của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Địa chỉ email không hợp lệ",
                },
              })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-gray-700">
                Mật khẩu
              </label>
              <a href="#" className="text-xs text-indigo-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <input
              type="password"
              {...register("password", {
                required: "Mật khẩu là bắt buộc",
                minLength: { value: 6, message: "Mật khẩu phải từ 6 ký tự" },
              })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 border-t pt-6">
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            Tạo tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
