import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import CryptoJS from "crypto-js";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    class: null,
    gender: null,
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name || !form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ các trường bắt buộc.");
      setLoading(false);
      return;
    }

    // Mã hóa password bằng SHA256
    const hashedPassword = CryptoJS.SHA256(form.password).toString();

    try {
      // 1. Lấy toàn bộ users
      const resUsers = await fetch("https://67387e0d4eb22e24fca81726.mockapi.io/api/users");
      const users = await resUsers.json();

      // 2. Kiểm tra email đã tồn tại chưa (username là email)
      const existed = users.some(u => u.username === form.email);
      if (existed) {
        setError("Email đã tồn tại trong hệ thống.");
        setLoading(false);
        return;
      }

      // 3. Nếu chưa tồn tại, tiến hành đăng ký
      const res = await fetch("https://67387e0d4eb22e24fca81726.mockapi.io/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.email,
          password: hashedPassword,
          sex: form.gender,
          grade: form.class,
        }),
      });

      if (!res.ok) throw new Error("Đăng ký thất bại!");

      const data = await res.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError("Đăng ký thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-base-100 rounded-3xl shadow-2xl p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <Users size={56} className="text-primary mb-2 drop-shadow-lg bg-gradient-to-br from-primary/80 to-secondary/80 p-3 rounded-full" />
          <h2 className="text-2xl font-bold text-center">Đăng ký</h2>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="name">
              <span className="label-text font-semibold">Tên <span className="text-error">*</span></span>
            </label>
            <div className="relative">
              <User className="absolute z-50 left-3 top-1/2 -translate-y-1/2 text-base-content/60 pointer-events-none" size={18} />
              <input
                id="name"
                name="name"
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="Họ và tên"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="class">
              <span className="label-text font-semibold">Lớp</span>
            </label>
            <input
              id="class"
              name="class"
              type="text"
              className="input input-bordered w-full"
              placeholder="VD: 12A1"
              value={form.class}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label" htmlFor="gender">
              <span className="label-text font-semibold">Giới tính</span>
            </label>
            <select
              id="gender"
              name="gender"
              className="select select-bordered w-full"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Chọn giới tính (không bắt buộc)</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="email">
              <span className="label-text font-semibold">Email <span className="text-error">*</span></span>
            </label>
            <div className="relative">
              <Mail className="absolute z-50 left-3 top-1/2 -translate-y-1/2 text-base-content/60 pointer-events-none" size={18} />
              <input
                id="email"
                name="email"
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="password">
              <span className="label-text font-semibold">Mật khẩu <span className="text-error">*</span></span>
            </label>
            <div className="relative">
              <Lock className="absolute z-50 left-3 top-1/2 -translate-y-1/2 text-base-content/60 pointer-events-none" size={18} />
              <input
                id="password"
                name="password"
                type="password"
                className="input input-bordered w-full pl-10"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && (
            <div className="text-error text-sm text-center animate-pulse">{error}</div>
          )}
          <button
            type="submit"
            className={clsx(
              "btn w-full mt-2 bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-md hover:from-secondary hover:to-primary transition-all",
              loading && "loading"
            )}
            disabled={loading}
          >
            Đăng ký
          </button>
        </form>
        <div className="divider my-6">hoặc</div>
        <div className="text-center text-sm text-base-content/60">
          Đã có tài khoản?{" "}
          <a
            href="#"
            className="link link-primary font-semibold"
            onClick={e => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Đăng nhập
          </a>
        </div>
      </motion.div>
    </div>
  );
} 