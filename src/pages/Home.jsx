import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { PERSONALITY_TYPES } from "../constants/personalityTypes";

const news = [
  {
    title: "AI đang thay đổi thị trường việc làm",
    desc: "Trí tuệ nhân tạo (AI) đang tác động mạnh mẽ đến nhiều ngành nghề, từ sản xuất đến dịch vụ. Các chuyên gia dự báo rằng trong 5 năm tới, kỹ năng liên quan đến AI sẽ trở thành yêu cầu bắt buộc ở nhiều vị trí công việc.",
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    content: "Trí tuệ nhân tạo (AI) đang tác động mạnh mẽ đến nhiều ngành nghề, từ sản xuất đến dịch vụ. Các chuyên gia dự báo rằng trong 5 năm tới, kỹ năng liên quan đến AI sẽ trở thành yêu cầu bắt buộc ở nhiều vị trí công việc. Điều này đòi hỏi người lao động phải liên tục cập nhật kiến thức và kỹ năng mới để thích nghi với sự thay đổi nhanh chóng của thị trường lao động.",
  },
  {
    title: "Top ngành nghề hot năm 2024",
    desc: "Theo báo cáo mới nhất, các ngành như Data Science, Product Management, Digital Marketing tiếp tục dẫn đầu về nhu cầu tuyển dụng và mức lương hấp dẫn.",
    thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    content: "Theo báo cáo mới nhất, các ngành như Data Science, Product Management, Digital Marketing tiếp tục dẫn đầu về nhu cầu tuyển dụng và mức lương hấp dẫn. Các doanh nghiệp đang tìm kiếm những ứng viên có kỹ năng phân tích dữ liệu, quản lý sản phẩm và tiếp thị số để đáp ứng nhu cầu phát triển kinh doanh.",
  },
  {
    title: "Bí quyết phỏng vấn thành công",
    desc: "Chuẩn bị kỹ lưỡng, tự tin và thể hiện sự phù hợp với vị trí ứng tuyển là những yếu tố then chốt giúp bạn ghi điểm trong mắt nhà tuyển dụng.",
    thumb: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
    content: "Chuẩn bị kỹ lưỡng, tự tin và thể hiện sự phù hợp với vị trí ứng tuyển là những yếu tố then chốt giúp bạn ghi điểm trong mắt nhà tuyển dụng. Ngoài ra, việc tìm hiểu kỹ về công ty và đặt câu hỏi thông minh cũng giúp bạn nổi bật hơn so với các ứng viên khác.",
  },
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const surveyUrl = "https://mbti.vn/"; // Thay bằng link khảo sát thực tế
  const [selectedNews, setSelectedNews] = useState(null);
  const [showPersonalityPopup, setShowPersonalityPopup] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const [showToast, setShowToast] = useState(false);

  async function updateUserPersonality(userId, personalityId) {
    try {
      const res = await fetch(
        `https://67387e0d4eb22e24fca81726.mockapi.io/api/users/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ personality: personalityId }),
        }
      );
      if (!res.ok) throw new Error("Cập nhật thất bại!");
      return await res.json();
    } catch (err) {
      throw err;
    }
  }

  // Hàm mở tab mới
  const openSurvey = () => {
    window.open(surveyUrl, "_blank", "noopener,noreferrer");
    setShowModal(true);
  };

  // Nếu click "No", mở lại tab khảo sát
  const handleNo = () => {
    window.open(surveyUrl, "_blank", "noopener,noreferrer");
  };

  // Khi mở popup, binding lại giá trị personality hiện tại
  const handleOpenPersonalityPopup = () => {
    const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
    setSelectedPersonality(user.personality || "");
    setShowPersonalityPopup(true);
  };

  return (
    <div className="min-h-screen">
      {/* Button khảo sát ở góc trái */}
      <button
        className="btn btn-primary btn-sm flex items-center gap-2 shadow-lg mt-8"
        onClick={openSurvey}
      >
        <AlertCircle size={18} /> Khảo sát tính cách
      </button>

      <section className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
        >
          <h2 className="text-xl font-bold col-span-full">Tin tức</h2>
          {news.map((item) => (
            <div
              key={item.title}
              className="card flex-row bg-base-100 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-base-200"
              onClick={() => setSelectedNews(item)}
            >
              {/* Ảnh thumbnail bên trái */}
              <div className="w-28 h-full flex-shrink-0 ">
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="object-cover w-full h-28 rounded-l-xl mt-4"
                />
              </div>
              {/* Nội dung bên phải */}
              <div className="card-body flex-1 p-4 flex flex-col justify-center">
                <h3 className="card-title text-base">{item.title}</h3>
                <p className="text-base-content/80 line-clamp-3">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Modal popup xác nhận */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-base-100 rounded-xl shadow-lg p-6 max-w-xs w-full text-center">
            <div className="mb-4 flex flex-col items-center">
              <AlertCircle size={32} className="text-warning mb-2" />
              <h3 className="font-bold text-lg">Bạn đã hoàn thành khảo sát chưa?</h3>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="btn btn-success"
                onClick={handleOpenPersonalityPopup}
              >
                Yes
              </button>
              <button
                className="btn btn-error"
                onClick={handleNo}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showPersonalityPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            className="bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-xs space-y-4 relative"
            onSubmit={async (e) => {
              e.preventDefault();
              const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
              const userId = user.id;
              try {
                const updatedUser = await updateUserPersonality(userId, selectedPersonality);
                localStorage.setItem("userInfo", JSON.stringify(updatedUser));
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
                setShowPersonalityPopup(false);
                setShowModal(false);
              } catch (err) {
                alert("Cập nhật thất bại!");
              }
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setShowPersonalityPopup(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">Chọn nhóm tính cách</h3>
            <select
              className="select select-bordered w-full"
              value={selectedPersonality}
              onChange={e => setSelectedPersonality(e.target.value)}
              required
            >
              <option value="">Chưa chọn</option>
              {PERSONALITY_TYPES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.value}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
            >
              Xác nhận
            </button>
          </form>
        </div>
      )}
      {showToast && (
        <div className="toast toast-top toast-end z-[9999]">
          <div className="alert alert-success flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span>Cập nhật thành công!</span>
          </div>
        </div>
      )}
      {/* Modal chi tiết */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-base-100 rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedNews(null)}
              aria-label="Đóng"
            >
              ✕
            </button>
            <img
              src={selectedNews.thumb}
              alt={selectedNews.title}
              className="w-full h-40 object-cover rounded-lg my-4"
            />
            <h3 className="text-lg font-bold mb-3">{selectedNews.title}</h3>
            <p className="text-base-content/80">{selectedNews.content}</p>
          </div>
        </div>
      )}
      
    </div>
  );
}
