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
    personality: "INTJ",
  },
  {
    title: "Top ngành nghề hot năm 2024",
    desc: "Theo báo cáo mới nhất, các ngành như Data Science, Product Management, Digital Marketing tiếp tục dẫn đầu về nhu cầu tuyển dụng và mức lương hấp dẫn.",
    thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    content: "Theo báo cáo mới nhất, các ngành như Data Science, Product Management, Digital Marketing tiếp tục dẫn đầu về nhu cầu tuyển dụng và mức lương hấp dẫn. Các doanh nghiệp đang tìm kiếm những ứng viên có kỹ năng phân tích dữ liệu, quản lý sản phẩm và tiếp thị số để đáp ứng nhu cầu phát triển kinh doanh.",
    personality: "ENTJ",
  },
  {
    title: "Bí quyết phỏng vấn thành công",
    desc: "Chuẩn bị kỹ lưỡng, tự tin và thể hiện sự phù hợp với vị trí ứng tuyển là những yếu tố then chốt giúp bạn ghi điểm trong mắt nhà tuyển dụng.",
    thumb: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
    content: "Chuẩn bị kỹ lưỡng, tự tin và thể hiện sự phù hợp với vị trí ứng tuyển là những yếu tố then chốt giúp bạn ghi điểm trong mắt nhà tuyển dụng. Ngoài ra, việc tìm hiểu kỹ về công ty và đặt câu hỏi thông minh cũng giúp bạn nổi bật hơn so với các ứng viên khác.",
    personality: "ENFJ",
  },
  {
    title: "Kỹ năng mềm quan trọng trong thời đại số",
    desc: "Kỹ năng giao tiếp, làm việc nhóm và giải quyết vấn đề ngày càng được các nhà tuyển dụng đánh giá cao.",
    thumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    content: "Trong thời đại số, kỹ năng mềm như giao tiếp, làm việc nhóm, giải quyết vấn đề và thích nghi với thay đổi là yếu tố then chốt giúp bạn thành công trong môi trường làm việc hiện đại.",
    personality: "ESFJ",
  },
  {
    title: "Làm việc từ xa: Xu hướng hay thách thức?",
    desc: "Làm việc từ xa mang lại sự linh hoạt nhưng cũng đòi hỏi kỹ năng tự quản lý và giao tiếp hiệu quả.",
    thumb: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    content: "Làm việc từ xa đang trở thành xu hướng phổ biến, nhưng cũng đặt ra nhiều thách thức về quản lý thời gian, duy trì động lực và giao tiếp hiệu quả với đồng nghiệp.",
    personality: "INFP",
  },
  {
    title: "Tương lai ngành công nghệ thông tin",
    desc: "Ngành CNTT tiếp tục phát triển mạnh mẽ với nhiều cơ hội việc làm hấp dẫn cho các bạn trẻ.",
    thumb: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    content: "Công nghệ thông tin là lĩnh vực có tốc độ phát triển nhanh, mở ra nhiều cơ hội việc làm với mức lương cạnh tranh và môi trường sáng tạo.",
    personality: "ISTP",
  },
  {
    title: "Nghề sáng tạo: Cơ hội cho người nghệ sĩ",
    desc: "Thiết kế, nhiếp ảnh, nghệ thuật số... là những ngành nghề hấp dẫn cho người yêu sáng tạo.",
    thumb: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    content: "Các ngành nghề sáng tạo như thiết kế đồ họa, nhiếp ảnh, nghệ thuật số đang thu hút nhiều bạn trẻ đam mê sáng tạo và mong muốn thể hiện cá tính riêng.",
    personality: "ISFP",
  },
  {
    title: "Vai trò của nhà lãnh đạo trong doanh nghiệp hiện đại",
    desc: "Nhà lãnh đạo cần có tầm nhìn, khả năng truyền cảm hứng và quản lý đội nhóm hiệu quả.",
    thumb: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    content: "Lãnh đạo hiện đại không chỉ là người ra quyết định mà còn là người truyền cảm hứng, xây dựng văn hóa doanh nghiệp và phát triển đội ngũ.",
    personality: "ENTP",
  },
  {
    title: "Phụ nữ và sự nghiệp: Vượt qua rào cản",
    desc: "Ngày càng nhiều phụ nữ thành công trong các lĩnh vực STEM, quản lý và khởi nghiệp.",
    thumb: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    content: "Phụ nữ ngày nay đang khẳng định vị thế trong nhiều lĩnh vực, vượt qua định kiến và tạo dấu ấn mạnh mẽ trong sự nghiệp.",
    personality: "INFJ",
  },
  {
    title: "Học tập suốt đời: Chìa khóa thành công",
    desc: "Việc liên tục học hỏi và cập nhật kiến thức giúp bạn thích nghi với sự thay đổi của thị trường lao động.",
    thumb: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    content: "Học tập suốt đời là yếu tố quan trọng giúp bạn phát triển bản thân, nâng cao năng lực và mở rộng cơ hội nghề nghiệp.",
    personality: "ISTJ",
  },
  {
    title: "Khởi nghiệp: Cơ hội và thách thức cho người trẻ",
    desc: "Khởi nghiệp mang lại nhiều cơ hội nhưng cũng đòi hỏi sự kiên trì, sáng tạo và chấp nhận rủi ro.",
    thumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    content: "Khởi nghiệp là hành trình đầy thử thách, đòi hỏi bạn trẻ phải có ý chí, sáng tạo và khả năng thích nghi với thay đổi.",
    personality: "ESTP",
  },
  {
    title: "Tư duy phản biện: Kỹ năng không thể thiếu",
    desc: "Tư duy phản biện giúp bạn phân tích, đánh giá và đưa ra quyết định chính xác trong công việc.",
    thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    content: "Kỹ năng tư duy phản biện giúp bạn giải quyết vấn đề hiệu quả, nâng cao năng lực lãnh đạo và thích nghi với môi trường làm việc hiện đại.",
    personality: "INTP",
  },
  {
    title: "Quản lý thời gian hiệu quả",
    desc: "Biết cách sắp xếp công việc và ưu tiên nhiệm vụ giúp bạn đạt hiệu suất cao.",
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    content: "Quản lý thời gian là kỹ năng quan trọng giúp bạn cân bằng giữa công việc và cuộc sống, đồng thời nâng cao hiệu quả làm việc.",
    personality: "ESTJ",
  },
  {
    title: "Tìm kiếm việc làm trong thời đại số",
    desc: "Các nền tảng tuyển dụng trực tuyến và mạng xã hội mở ra nhiều cơ hội việc làm mới.",
    thumb: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    content: "Việc sử dụng các nền tảng tuyển dụng trực tuyến và xây dựng thương hiệu cá nhân trên mạng xã hội giúp bạn tiếp cận nhiều cơ hội việc làm hấp dẫn.",
    personality: "ENFP",
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

  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let filteredNews = news;
  if (!!user.personality) {
    filteredNews = news.filter(
      (item) => !user.personality || item.personality === user.personality
    );
  }

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
          {filteredNews.map((item) => (
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
                // window.location.reload();
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
