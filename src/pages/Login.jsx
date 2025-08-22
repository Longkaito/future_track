import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, UserCircle2 } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Lấy danh sách user từ API
      const res = await fetch("https://67387e0d4eb22e24fca81726.mockapi.io/api/users");
      const users = await res.json();

      // 2. Tìm user theo email (username)
      const user = users.find(u => u.username === form.email);

      if (!user) {
        setError("Email không tồn tại trong hệ thống.");
        setLoading(false);
        return;
      }

      // 3. Mã hóa password nhập vào để so sánh
      const hashedPassword = CryptoJS.SHA256(form.password).toString();

      if (user.password !== hashedPassword) {
        setError("Mật khẩu không đúng.");
        setLoading(false);
        return;
      }

      // 4. Đăng nhập thành công
      localStorage.setItem("userInfo", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError("Đăng nhập thất bại, vui lòng thử lại.");
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
          <UserCircle2 size={56} className="text-primary mb-2" />
          <h2 className="text-2xl font-bold text-center">Đăng nhập</h2>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="email">
              <span className="label-text font-semibold">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute z-50 left-3 top-1/2 -translate-y-1/2 text-base-content/60" size={18} />
              <input
                id="email"
                name="email"
                type="email"
                className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="password">
              <span className="label-text font-semibold">Mật khẩu</span>
            </label>
            <div className="relative">
              <Lock className="absolute z-50 left-3 top-1/2 -translate-y-1/2 text-base-content/60" size={18} />
              <input
                id="password"
                name="password"
                type="password"
                className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
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
            Đăng nhập
          </button>
        </form>
        <div className="divider my-6">hoặc</div>
        <div className="text-center text-sm text-base-content/60">
          Chưa có tài khoản?{" "}
          <a
            href="#"
            className="link link-primary font-semibold"
            onClick={e => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Đăng ký
          </a>
        </div>
      </motion.div>
    </div>
  );
} 