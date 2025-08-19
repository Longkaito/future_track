import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Khám phá bản thân",
    desc: "Làm bài trắc nghiệm nhanh để hiểu điểm mạnh, sở thích, phong cách làm việc.",
    cta: "Bắt đầu quiz",
    to: "/quiz",
  },
  {
    title: "Lộ trình nghề",
    desc: "Xem roadmap rõ ràng cho từng ngành hot: Product, Data, Dev, Marketing…",
    cta: "Xem lộ trình",
    to: "/paths",
  },
  {
    title: "Tài nguyên học",
    desc: "Tổng hợp khóa học, cộng đồng, sự kiện tuyển dụng dành cho bạn.",
    cta: "Sắp ra mắt",
    to: "/",
  },
];

export default function Home() {
  return (
    <section className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-10"
      >
        
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((c) => (
          <div key={c.title} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <h2 className="card-title">{c.title}</h2>
              <p className="text-base-content/80">{c.desc}</p>
              <div className="card-actions justify-end">
                <Link to={c.to} className="btn btn-outline">
                  {c.cta} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
