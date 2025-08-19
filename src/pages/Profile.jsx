import { User, Mail, Edit2 } from "lucide-react";

export default function Profile() {
  // Giả lập dữ liệu user, sau này có thể lấy từ API hoặc context
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    bio: "Sinh viên năm 3 ngành Công nghệ thông tin. Đam mê lập trình web và AI.",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user.avatar} alt="avatar" />
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <User className="inline-block" size={22} /> {user.name}
        </h2>
        <p className="text-base-content/70 flex items-center justify-center gap-2 mt-2">
          <Mail size={18} /> {user.email}
        </p>
        <p className="mt-4">{user.bio}</p>
      </div>
      <button className="btn btn-primary btn-wide flex items-center gap-2">
        <Edit2 size={18} /> Chỉnh sửa hồ sơ
      </button>
    </div>
  );
} 