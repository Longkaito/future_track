import { motion } from "framer-motion";
import { Code2, ChartLine, Database } from "lucide-react";

const tracks = [
  { icon: <Code2 />, name: "Frontend Dev", steps: ["HTML/CSS cơ bản", "JavaScript", "React", "State Management", "Build Portfolio"] },
  { icon: <Database />, name: "Data Analyst", steps: ["Excel/SQL", "Python cơ bản", "Data Viz", "Statistics", "Dự án cá nhân"] },
  { icon: <ChartLine />, name: "Product Marketing", steps: ["Customer Insight", "Content/SEO", "Analytics", "Campaign", "Growth"] },
];

export default function Paths() {
  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="space-y-6">
      <h1 className="text-3xl font-bold">Lộ trình tiêu biểu</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tracks.map((t) => (
          <div key={t.name} className="card bg-base-100/80 backdrop-blur shadow-md hover:shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-2 text-primary">{t.icon}<h2 className="card-title">{t.name}</h2></div>
              <ul className="timeline timeline-vertical mt-4">
                {t.steps.map((s, i) => (
                  <li key={i}>
                    <div className="timeline-start">{i+1}</div>
                    <div className="timeline-middle">
                      <div className="badge badge-primary"></div>
                    </div>
                    <div className="timeline-end timeline-box">{s}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
