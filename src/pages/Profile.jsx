import { useState } from "react";
import { User, Mail, Edit2, BadgeInfo, Hash, Sparkles, LogOut } from "lucide-react";
import { PERSONALITY_TYPES } from "../constants/personalityTypes";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  // Nếu user có avatar thì dùng, không thì random một avatar từ pravatar
  const avatarUrl =
    user.avatar ||
    `https://i.pravatar.cc/150?img=${(user.username || "1").length % 70 + 1}`;

  // Tìm value của personality
  const personalityObj = PERSONALITY_TYPES.find(
    (item) => item.id === user.personality
  );

  // State cho popup chỉnh sửa
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: user.name || "",
    grade: user.grade || "",
    sex: user.sex || "",
    username: user.username || "",
    personality: user.personality || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Xử lý submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://67387e0d4eb22e24fca81726.mockapi.io/api/users/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            grade: form.grade,
            sex: form.sex,
            username: form.username,
            personality: form.personality,
            // giữ lại các trường khác nếu cần
          }),
        }
      );
      if (!res.ok) throw new Error("Cập nhật thất bại!");
      const updated = await res.json();
      localStorage.setItem("userInfo", JSON.stringify(updated));
      setOpen(false);
      window.location.reload(); // reload để cập nhật giao diện
    } catch (err) {
      setError("Cập nhật thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-base-100 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 mt-8">
      {/* Avatar */}
      <div className="avatar mb-2">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-full h-full object-cover"
            onError={e => {
              e.target.onerror = null;
              e.target.src = "https://i.pravatar.cc/150?img=1";
            }}
          />
        </div>
      </div>
      {/* Tên */}
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
        <User className="inline-block text-primary" size={22} /> {user.name || "Chưa có tên"}
      </h2>
      {/* Email */}
      <div className="w-full flex items-center gap-2 bg-base-200 rounded-xl px-4 py-2">
        <Mail size={18} className="text-secondary" />
        <span className="truncate">{user.username || "Chưa có email"}</span>
      </div>
      {/* Lớp */}
      <div className="w-full flex items-center gap-2 bg-base-200 rounded-xl px-4 py-2">
        <Hash size={18} className="text-accent" />
        <span>{user.grade || "Chưa cập nhật lớp"}</span>
      </div>
      {/* Giới tính */}
      <div className="w-full flex items-center gap-2 bg-base-200 rounded-xl px-4 py-2">
        <BadgeInfo size={18} className="text-info" />
        <span>{user.sex || "Chưa cập nhật giới tính"}</span>
      </div>
      {/* Personality */}
      <div className="w-full flex items-center gap-2 bg-base-200 rounded-xl px-4 py-2">
        <Sparkles size={18} className="text-warning" />
        <span>
          {personalityObj
            ? `Tính cách: ${personalityObj.value}`
            : "Chưa có kết quả tính cách"}
        </span>
      </div>
      {/* Nút chỉnh sửa */}
      <button
        className="btn btn-primary btn-wide flex items-center gap-2 mt-2"
        onClick={() => setOpen(true)}
      >
        <Edit2 size={18} /> Chỉnh sửa hồ sơ
      </button>
      {/* Nút đăng xuất */}
      <button
        className="btn btn-error btn-wide flex items-center gap-2 mt-2 shadow hover:scale-105 transition-transform"
        onClick={handleLogout}
      >
        <LogOut size={18} /> Đăng xuất
      </button>

      {/* Popup chỉnh sửa */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            className="bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4 relative"
            onSubmit={handleUpdate}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-2 text-center">Chỉnh sửa hồ sơ</h3>
            <div>
              <label className="label" htmlFor="name">
                <span className="label-text">Tên</span>
              </label>
              <input
                id="name"
                name="name"
                className="input input-bordered w-full"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="username">
                <span className="label-text">Email</span>
              </label>
              <input
                id="username"
                name="username"
                type="email"
                className="input input-bordered w-full"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="grade">
                <span className="label-text">Lớp</span>
              </label>
              <input
                id="grade"
                name="grade"
                className="input input-bordered w-full"
                value={form.grade}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="sex">
                <span className="label-text">Giới tính</span>
              </label>
              <select
                id="sex"
                name="sex"
                className="select select-bordered w-full"
                value={form.sex}
                onChange={handleChange}
              >
                <option value="">Chưa chọn</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="personality">
                <span className="label-text">Tính cách</span>
              </label>
              <select
                id="personality"
                name="personality"
                className="select select-bordered w-full"
                value={form.personality}
                onChange={handleChange}
              >
                <option value="">Chưa chọn</option>
                {PERSONALITY_TYPES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.value}
                  </option>
                ))}
              </select>
            </div>
            {error && (
              <div className="text-error text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className={`btn btn-primary w-full mt-2${loading ? " loading" : ""}`}
              disabled={loading}
            >
              Lưu thay đổi
            </button>
          </form>
        </div>
      )}
    </div>
  );
}