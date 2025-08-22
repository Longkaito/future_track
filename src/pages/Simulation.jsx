import { useState } from "react";
import { motion } from "framer-motion";

const jobSimulations = [
  {
    id: "A",
    name: "Công việc A",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "B",
    name: "Công việc B",
    videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  },
  {
    id: "C",
    name: "Công việc C",
    videoUrl: "https://www.youtube.com/embed/l9PxOanFjxQ",
  },
  {
    id: "D",
    name: "Công việc D",
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
];

export default function Simulation() {
  const [selectedJob, setSelectedJob] = useState(jobSimulations[0].id);

  const currentJob = jobSimulations.find(job => job.id === selectedJob);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6 mt-4"
    >
      <div className="form-control w-full max-w-xs">
        <label className="label mb-2">
          <span className="label-text">Chọn mô phỏng môi trường làm việc</span>
        </label>
        <select
          className="select select-bordered"
          value={selectedJob}
          onChange={e => setSelectedJob(e.target.value)}
        >
          {jobSimulations.map(job => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-base-200 bg-base-100 flex items-center justify-center">
        <iframe
          src={currentJob.videoUrl}
          title={currentJob.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </motion.div>
  );
}
