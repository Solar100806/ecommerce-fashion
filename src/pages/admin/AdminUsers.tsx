import { useEffect, useMemo, useState } from "react";
import axios from "axios";

interface IUser {
  id: string;
  username: string;
  email: string;
}

function AdminUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/users");
        setUsers(data || []);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách người dùng.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const value = keyword.trim().toLowerCase();
    if (!value) return users;
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value),
    );
  }, [keyword, users]);

  const handleDeleteUser = async (id: string) => {
    const ok = window.confirm("Bạn có chắc muốn xóa người dùng này?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
      alert("Xóa người dùng thành công.");
    } catch (err) {
      console.error(err);
      alert("Xóa người dùng thất bại.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-center text-red-500 font-medium bg-red-50 rounded-lg border border-red-100">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Người dùng</h2>
        <p className="text-sm text-gray-500 mt-1">
          Hiển thị: {filteredUsers.length}/{users.length} người dùng
        </p>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm theo username hoặc email..."
          className="mt-4 w-full md:w-1/2 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{user.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900 transition-colors bg-red-50 hover:bg-red-100 p-2 rounded-md text-sm font-medium"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500 border-t border-gray-100">
          Không có người dùng phù hợp.
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
