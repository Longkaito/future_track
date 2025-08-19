import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  { q: "Bạn thích hoạt động nào nhất?", opts: ["Phân tích số liệu", "Viết/Thiết kế", "Làm việc với khách hàng", "Lập trình"] },
  { q: "Bạn thích môi trường làm việc:", opts: ["Ổn định", "Năng động", "Tự do", "Cạnh tranh"] },
];

export default function Quiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handlePick = (i, v) => {
    const next = [...answers]; next[i] = v; setAnswers(next);
  };

  const completed = answers.every((a) => a !== null);
  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Trắc nghiệm nhanh</h1>
      <div className="space-y-4">
        {questions.map((item, i) => (
          <div key={i} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{i+1}. {item.q}</h2>
              <div className="grid sm:grid-cols-2 gap-2 mt-2">
                {item.opts.map((o) => (
                  <button
                    key={o}
                    onClick={() => handlePick(i, o)}
                    className={`btn ${answers[i]===o ? "btn-primary" : "btn-outline"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary w-full" disabled={!completed}>
        Xem gợi ý nghề phù hợp
      </button>
      {!completed && <p className="text-center text-sm opacity-70">Hãy trả lời hết các câu hỏi nhé.</p>}
    </motion.div>
  );
}
