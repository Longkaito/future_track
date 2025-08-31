import { useState } from "react";
import { motion } from "framer-motion";
import CVEditor from "./CVEditor"; // Nếu bạn tách file, còn nếu cùng file thì không cần
import cv1 from "../assets/images/cv_1.webp"
import cv2 from "../assets/images/cv_2.webp"
import cv3 from "../assets/images/cv_3.webp"
import cv4 from "../assets/images/cv_4.webp"

const categories = ["Tất cả", "Kinh doanh", "Thiết kế", "Công nghệ"];
const cvTemplates = [
  {
    id: 1,
    name: "CV Chuyên nghiệp",
    category: "Kinh doanh",
    preview: cv1,
    content: {
      name: "Nguyễn Văn A",
      position: "Nhân viên kinh doanh",
    }
  },
  {
    id: 2,
    name: "CV Sáng tạo",
    category: "Thiết kế",
    preview: cv2,
    content: {
      name: "Trần Thị B",
      position: "Designer",
    }
  },
  {
    id: 3,
    name: "CV Công nghệ",
    category: "Công nghệ",
    preview: cv3,
    content: {
      name: "Lê Văn C",
      position: "Lập trình viên",
    }
  },
  {
    id: 4,
    name: "CV Marketing",
    category: "Kinh doanh",
    preview: cv4,
    content: {
      name: "Phạm Thị D",
      position: "Chuyên viên Marketing",
    }
  },
];

export default function CVTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [editingTemplate, setEditingTemplate] = useState(null);

  const filteredTemplates = selectedCategory === "Tất cả"
    ? cvTemplates
    : cvTemplates.filter(t => t.category === selectedCategory);

  if (editingTemplate) {
    return (
      <CVEditor
        template={editingTemplate}
        onBack={() => setEditingTemplate(null)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 mt-8"
    >
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6 drop-shadow">
        Chọn mẫu CV
      </h1>
      <div className="flex justify-center mb-6">
        <select
          className="select select-bordered"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTemplates.map(tpl => (
          <div
            key={tpl.id}
            className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition"
            onClick={() => setEditingTemplate(tpl)}
          >
            <img src={tpl.preview} alt={tpl.name} className="w-full h-100 object-cover rounded mb-2" />
            <div className="font-semibold text-center">{tpl.name}</div>
            {/* <div className="text-xs text-center text-gray-400">{tpl.category}</div> */}
          </div>
        ))}
      </div>
    </motion.div>
  );
}