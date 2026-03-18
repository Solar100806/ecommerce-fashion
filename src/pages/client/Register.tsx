import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import type { RegisterInput } from "../../interfaces/IAuth";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();
  const passwordValue = watch("password");

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await axios.post("http://localhost:3000/users", data);
      if (response.status === 201) {
        alert("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Đăng ký tài khoản
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              {...register("username", {
                required: "Tên đăng nhập không được để trống",
                minLength: {
                  value: 3,
                  message: "Tên đăng nhập phải từ 3 ký tự",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.username
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="hieu_poly"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Địa chỉ email không hợp lệ",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Mật khẩu không được để trống",
                minLength: { value: 6, message: "Mật khẩu phải từ 6 ký tự" },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
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

          {/* rePassword */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              {...register("rePassword", {
                required: "Vui lòng xác nhận lại mật khẩu",
                validate: (value) =>
                  value === passwordValue || "Mật khẩu xác nhận không khớp",
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.rePassword
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="••••••••"
            />
            {errors.rePassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Đang tạo tài khoản..." : "Đăng ký ngay"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
