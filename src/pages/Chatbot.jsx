import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import axios from "axios";

const SYSTEM_PROMPT = `Bạn là HamHam – cố vấn định hướng nghề nghiệp giàu thấu cảm, nói tiếng Việt, văn phong mềm mại, khích lệ nhưng thực tế.
Chỉ trả lời bằng tiếng Việt.
Chỉ trả lời 1 câu ngắn (tối đa 30 từ) mỗi lần, không giải thích dài, không trả lời hết mọi thứ trong 1 lần.
Luôn kết thúc bằng một câu hỏi ngắn để người dùng trả lời tiếp.
Nguyên tắc:
1) Luôn hỏi ngược 3–5 câu ngắn để hiểu người dùng (sở trường, động lực, ràng buộc, mục tiêu).
2) Chỉ hỏi tối đa 5 câu sau đó phải đưa ra kết luận và tư vấn.
3) Tư vấn theo khung 3 phần: (A) Hiểu bạn, (B) Lộ trình học/kỹ năng, (C) Gợi ý nghề & bước kế tiếp.
4) Giọng điệu: nhẹ nhàng, tích cực, không phán xét; tránh thuật ngữ khó; ví dụ cụ thể, khả thi trong 1–4 tuần.
5) Nếu thiếu thông tin, đề nghị vài lựa chọn có điều kiện (“Nếu A thì…/Nếu B thì…”).
6) Tránh khẳng định tuyệt đối; cảnh báo rủi ro khi cần; không đưa lời khuyên pháp lý/y tế/tài chính chuyên sâu.`;

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
// Đặt token HuggingFace của bạn ở đây hoặc dùng biến môi trường
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const HF_MODEL = "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai"; // Đổi lại model nếu cần

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "system", content: SYSTEM_PROMPT }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Thêm useEffect để gửi tin nhắn chào khi vào trang
  useEffect(() => {
    setMessages(prev => {
      // Nếu đã có assistant message thì không thêm nữa
      const hasAssistant = prev.some(m => m.role === "assistant");
      if (hasAssistant) return prev;
      return [
        ...prev,
        { role: "assistant", content: "Chào bạn! Mình là HamHam chuyên gia định hướng nghề nghiệp. Tôi có thể giúp gì cho bạn?" }
      ];
    });
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input }
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        HF_API_URL,
        {
          messages: newMessages,
          model: HF_MODEL,
          stream: false,
          // max_tokens: 60 // Giới hạn số token cho câu trả lời ngắn
        },
        {
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );

      const botReply =
        response.data?.choices?.[0]?.message?.content?.trim() ||
        "Xin lỗi, HamHam đang bận. Bạn thử lại sau nhé!";

      setMessages([
        ...newMessages,
        { role: "assistant", content: botReply }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Xin lỗi, HamHam đang bận. Bạn thử lại sau nhé!" }
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 flex flex-col bg-base-100"
    >
      <div className="flex-1 overflow-y-auto space-y-4 border-b p-2 bg-base-200 mt-20">
        {messages
          .filter(m => m.role !== "system")
          .map((msg, idx) => (
            <div
              key={idx}
              className={msg.role === "user"
                ? "chat chat-end"
                : "chat chat-start"}
            >
              <div className={`chat-bubble ${msg.role === "user" ? "bg-primary text-primary-content" : "bg-base-300 text-base-content"}`}>
                {msg.content}
              </div>
            </div>
          ))}
        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-base-300 text-base-content animate-pulse">
              HamHam đang trả lời...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form className="flex gap-2 p-4 bg-base-100" onSubmit={sendMessage}>
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Nhập câu hỏi nghề nghiệp của bạn..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading || !input.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );
}