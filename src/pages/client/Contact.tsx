import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactFormInput } from "../../interfaces/Contact";

function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>();

  const onSubmit = async (data: ContactFormInput) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Dữ liệu liên hệ:", data);
      setIsSuccess(true);
      reset();

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề trang */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Liên hệ với chúng tôi
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Bạn có câu hỏi hoặc cần hỗ trợ? Hãy gửi tin nhắn cho chúng tôi, đội
            ngũ hỗ trợ sẽ phản hồi bạn trong thời gian sớm nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-10 border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Thông tin trực tiếp
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      Văn phòng chính
                    </h3>
                    <p className="mt-1 text-gray-600 leading-relaxed">
                      Chung cư Athena Complex
                      <br />
                      Phường Phương Canh
                      <br />
                      TP. Hà Nội
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.08-7.074-6.97l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      Điện thoại
                    </h3>
                    <p className="mt-1 text-gray-600">0394031258</p>
                    <p className="text-sm text-gray-500 mt-1">
                      (Thứ 2 - Thứ 6: 8h00 - 17h00)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      Email hỗ trợ
                    </h3>
                    <p className="mt-1 text-gray-600">
                      halilintarhieu@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 rounded-xl overflow-hidden h-40 bg-gray-200 relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                alt="Office"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Gửi tin nhắn
            </h2>

            {isSuccess && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-green-800">
                    Gửi thành công!
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi qua email của
                    bạn sớm nhất.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Họ và tên */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  {...register("fullname", {
                    required: "Vui lòng nhập họ tên",
                  })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.fullname
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Nhập họ và tên của bạn"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa chỉ Email *
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Chủ đề *
                </label>
                <select
                  {...register("subject", { required: "Vui lòng chọn chủ đề" })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white ${
                    errors.subject
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                >
                  <option value="">-- Chọn chủ đề liên hệ --</option>
                  <option value="Tư vấn sản phẩm">Tư vấn sản phẩm</option>
                  <option value="Hỗ trợ đơn hàng">
                    Hỗ trợ đơn hàng / Vận chuyển
                  </option>
                  <option value="Hợp tác kinh doanh">Hợp tác kinh doanh</option>
                  <option value="Góp ý khiếu nại">Góp ý / Khiếu nại</option>
                  <option value="Khác">Vấn đề khác</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Lời nhắn *
                </label>
                <textarea
                  {...register("message", {
                    required: "Vui lòng nhập nội dung tin nhắn",
                    minLength: {
                      value: 10,
                      message: "Nội dung cần dài ít nhất 10 ký tự",
                    },
                  })}
                  rows={4}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder="Hãy mô tả chi tiết vấn đề bạn cần hỗ trợ..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md flex justify-center items-center gap-2 mt-2 ${
                  isSubmitting ? "opacity-70 cursor-wait" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi tin nhắn
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
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
