import React, { useMemo, useRef, useState } from "react";
import axios from "axios";

export default function CVEditor() {
  const [data, setData] = useState(() => ({
    name: "Nguyễn Văn A",
    role: "Chuyên viên Marketing",
    summary:
      "4 năm kinh nghiệm trong lĩnh vực Digital Marketing: Content, SEO, Performance. Tư duy dữ liệu, giao tiếp tốt, quản lý dự án hiệu quả.",
    email: "email@example.com",
    phone: "0123 456 789",
    website: "linkedin.com/in/yourname",
    address: "Hà Nội, Việt Nam",
    strengths: ["Tư duy phân tích", "Chủ động", "Làm việc nhóm", "Quản lý thời gian"],
    skills: [
      "Content Strategy",
      "SEO",
      "Google Ads",
      "Facebook Ads",
      "Canva",
      "Excel",
    ],
    experience: [
      {
        title: "Content Writer",
        company: "Công ty ABC",
        start: "08/2022",
        end: "09/2024",
        bullets: [
          "Lên kế hoạch & triển khai lịch nội dung đa kênh (Web, FB, TikTok).",
          "Tối ưu SEO giúp tăng 65% organic traffic sau 6 tháng.",
          "Phối hợp team Ads tạo >50 mẫu quảng cáo, CTR tăng 22%.",
        ],
      },
    ],
    education: [
      {
        degree: "Cử nhân Kinh tế",
        school: "ĐH Kinh tế Quốc dân",
        year: "2021",
      },
    ],
    projects: [
      {
        name: "Dự án SEO E‑commerce",
        description:
          "Tối ưu cấu trúc site, viết 40+ bài pillar & cluster; doanh thu kênh SEO +38%/năm.",
        link: "",
      },
    ],
    accent: "#0ea5e9",
  }));

  const baseCSS = `
    :root{ --accent:${data.accent} !important; --text:#111827 !important; --muted:#6b7280 !important; --bg:#f8fafc !important; }
    *{ box-sizing:border-box !important; }
    html,body,#root{ height:100% !important; }
    body{ margin:0 !important; color:var(--text) !important; background:var(--bg) !important; font-family: ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, 'Apple Color Emoji', 'Segoe UI Emoji' !important; }

    .container{ display:grid !important; grid-template-columns: 360px 1fr !important; gap:24px !important; padding:24px !important; }
    .editor{ background:#fff !important; border:1px solid #e5e7eb !important; border-radius:16px !important; padding:16px !important; position:sticky !important; top:16px !important; height: calc(100vh - 48px) !important; overflow:auto !important; }
    .editor h2{ margin:8px 0 12px !important; font-size:18px !important; }
    .editor .group{ border-top:1px dashed #e5e7eb !important; padding-top:12px !important; margin-top:12px !important; }
    .row{ display:grid !important; grid-template-columns: 1fr 1fr !important; gap:8px !important; }
    label{ display:block !important; font-size:12px !important; color:var(--muted) !important; margin:8px 0 4px !important; }
    input, textarea, select{ width:100% !important; padding:10px 12px !important; border:1px solid #e5e7eb !important; border-radius:10px !important; font-size:14px !important; outline:none !important; background:#fff !important; }
    textarea{ min-height:88px !important; resize:vertical !important; }
    .chiplist{ display:flex !important; gap:8px !important; flex-wrap:wrap !important; margin-top:8px !important; }
    .chip{ background:rgba(14,165,233,.08) !important; color:#0c4a6e !important; border:1px solid rgba(14,165,233,.25) !important; padding:6px 10px !important; border-radius:999px !important; font-size:13px !important; display:flex !important; gap:8px !important; align-items:center !important; }
    .chip button{ border:none !important; background:transparent !important; cursor:pointer !important; font-size:14px !important; opacity:.7 !important; }
    .btn{ display:inline-flex !important; align-items:center !important; gap:8px !important; padding:10px 14px !important; border-radius:12px !important; border:1px solid #e5e7eb !important; background:#fff !important; cursor:pointer !important; font-weight:600 !important; color: #0ea5e9; }
    .btn.primary{ background:var(--accent) !important; border-color:var(--accent) !important; color:#fff !important; }
    .btn.ghost{ background:transparent !important; }
    .btnbar{ display:flex !important; gap:10px !important; flex-wrap:wrap !important; margin-top:12px !important; }

    /* CV Canvas */
    .stage{ display:flex !important; justify-content:center !important; align-items:flex-start !important; }
    .page{ width:210mm !important; min-height:297mm !important; background:#fff !important; color:var(--text) !important; box-shadow: 0 20px 60px rgba(2,6,23,0.12) !important; border-radius:20px !important; overflow:hidden !important; border:1px solid #f1f5f9 !important; }
    .header{ display:flex !important; align-items:flex-end !important; gap:24px !important; padding:28px 32px !important; background:linear-gradient(120deg, rgba(14,165,233,.12), rgba(14,165,233,0)) !important; border-bottom: 3px solid var(--accent) !important; }
    .avatar{ width:86px !important; height:86px !important; border-radius:16px !important; background: #e2f2fb !important; border:2px solid var(--accent) !important; flex: 0 0 auto !important; display:flex !important; align-items:center !important; justify-content:center !important; font-weight:800 !important; font-size:28px !important; color:#075985 !important; }
    .titlearea h1{ margin:0 !important; font-size:28px !important; letter-spacing:.2px !important; }
    .titlearea p{ margin:6px 0 0 !important; color:var(--muted) !important; font-weight:500 !important; }

    .content{ display:grid !important; grid-template-columns: 38% 1fr !important; gap:20px !important; padding:24px 32px 36px !important; }
    .card{ border:1px solid #eef2f7 !important; border-radius:14px !important; padding:14px !important; }
    .section h3{ margin:0 0 8px !important; font-size:14px !important; text-transform:uppercase !important; letter-spacing:1.2px !important; color:#0f172a !important; }
    .divider{ height:4px !important; width:48px !important; background:var(--accent) !important; border-radius:999px !important; margin:6px 0 12px !important; }

    .contact li{ list-style:none !important; margin:8px 0 !important; display:flex !important; gap:10px !important; align-items:center !important; }
    .contact small{ color:var(--muted) !important; }

    .badges{ display:flex !important; gap:8px !important; flex-wrap:wrap !important; }
    .badge{ background: #0ea5e91a !important; border: 1px solid #7dd3fc !important; padding:6px 10px !important; font-size:12px !important; border-radius:999px !important; color: #111827 }

    .summary{ color:#111827 !important; line-height:1.6 !important; }

    .expitem{ margin-bottom:14px !important; }
    .expitem h4{ margin:0 !important; font-size:14px !important; }
    .expitem .meta{ color:var(--muted) !important; font-size:12px !important; margin:4px 0 4px !important; }
    .expitem ul{ margin:6px 0 0 16px !important; padding:0 !important; }
    .expitem li{ margin:4px 0 !important; }

    .eduitem{ margin:8px 0 !important; }

    .accentbar{ height:8px !important; width:100% !important; background: repeating-linear-gradient(90deg, var(--accent) 0 24px, transparent 24px 32px) !important; opacity:.65 !important; }

    .footer{ padding:10px 16px 20px !important; color:var(--muted) !important; text-align:center !important; font-size:11px !important; }

    /* Print Styles */
    @page{ size:A4 !important; margin:12mm !important; }
    @media print{
      body{ background:#fff !important; }
      .container{ display:block !important; padding:0 !important; }
      .editor{ display:none !important; }
      .page{ width:auto !important; min-height:auto !important; box-shadow:none !important; border:none !important; border-radius:0 !important; }
      .footer{ display:none !important; }
    }

    /* Responsive for mobile */
    @media (max-width: 900px) {
      .container { grid-template-columns: 1fr !important; padding: 8px !important; gap: 8px !important; }
      .editor { position: static !important; height: auto !important; margin-bottom: 16px !important; }
      .stage { flex-direction: column !important; align-items: stretch !important; }
      .page { width: 100% !important; min-width: 0 !important; min-height: 0 !important; border-radius: 12px !important; }
      .content { grid-template-columns: 1fr !important; padding: 12px !important; gap: 12px !important; }
      .header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; padding: 16px !important; }
    }
    @media (max-width: 600px) {
      .page { box-shadow: none !important; border-radius: 0 !important; }
      .content, .header { padding: 8px !important; }
      .card { padding: 8px !important; }
      .footer { font-size: 10px !important; padding: 6px 4px 10px !important; }
    }
  `;

  const cvRef = useRef(null);

  const initials = useMemo(() => {
    if (!data.name) return "";
    return data.name
      .split(/\s+/)
      .slice(0, 2)
      .map((x) => x[0])
      .join("")
      .toUpperCase();
  }, [data.name]);

  const setField = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const addTo = (key, value = "") =>
    setData((d) => ({ ...d, [key]: [...d[key], value] }));
  const removeFrom = (key, idx) =>
    setData((d) => ({ ...d, [key]: d[key].filter((_, i) => i !== idx) }));

  const addExperience = () =>
    setData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        { title: "Vị trí", company: "Công ty", start: "", end: "", bullets: ["Mô tả công việc"] },
      ],
    }));
  const updateExperience = (idx, patch) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e, i) => (i === idx ? { ...e, ...patch } : e)),
    }));
  const removeExperience = (idx) =>
    setData((d) => ({ ...d, experience: d.experience.filter((_, i) => i !== idx) }));

  const addEducation = () =>
    setData((d) => ({
      ...d,
      education: [...d.education, { degree: "Bằng cấp", school: "Trường", year: "" }],
    }));
  const updateEducation = (idx, patch) =>
    setData((d) => ({
      ...d,
      education: d.education.map((e, i) => (i === idx ? { ...e, ...patch } : e)),
    }));
  const removeEducation = (idx) =>
    setData((d) => ({ ...d, education: d.education.filter((_, i) => i !== idx) }));

  const addProject = () =>
    setData((d) => ({ ...d, projects: [...d.projects, { name: "Dự án", description: "Mô tả ngắn", link: "" }] }));
  const updateProject = (idx, patch) =>
    setData((d) => ({
      ...d,
      projects: d.projects.map((p, i) => (i === idx ? { ...p, ...patch } : p)),
    }));
  const removeProject = (idx) =>
    setData((d) => ({ ...d, projects: d.projects.filter((_, i) => i !== idx) }));

  const handleCopyHTML = async () => {
    const html = buildStandaloneHTML(data);
    try{
      await navigator.clipboard.writeText(html);
      alert("Đã copy mã HTML đầy đủ vào clipboard ✔");
    }catch(e){
      alert("Không thể copy tự động. Hãy dùng nút Tải HTML.");
    }
  };

  const handleDownloadHTML = () => {
    const html = buildStandaloneHTML(data);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CV_${(data.name || "no_name").replace(/\s+/g, "_")}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const [loading, setLoading] = useState(false);

  const handleExportPDF = async () => {
    const html = buildStandaloneHTML(data);
    const options = {
      method: "POST",
      url: "https://api.pdfendpoint.com/v1/convert",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer pdfe_live_b6335a000c86d8095905e2b411d009ca67ba"
      },
      data: JSON.stringify({
        html: html,
        filename: `CV_${data.name ?? "no_name"}`,
        margin_top: "1cm",
        margin_bottom: "1cm",
        margin_right: "1cm",
        margin_left: "1cm",
        no_backgrounds: true
      })
    };

    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.request(options);
      if (response.data && response.data.data.url) {
        window.open(response.data.data.url, "_blank");
      } else if (response.data && response.data.pdf_base64) {
        const link = document.createElement("a");
        link.href = "data:application/pdf;base64," + response.data.pdf_base64;
        link.download = `CV_${(data.name || "no_name").replace(/\s+/g, "_")}.pdf`;
        link.click();
      } else {
        alert("Tạo PDF thành công, nhưng không tìm thấy file PDF.");
      }
    } catch (error) {
      alert("Có lỗi khi tạo PDF!");
      console.error(error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const buildStandaloneHTML = (state) => {
    // Reuse same CSS and HTML structure for a faithful export
    const safe = (s) => String(s || "");

    const expHTML = state.experience
      .map(
        (e) => `
        <div class="expitem">
          <h4>${safe(e.title)} · ${safe(e.company)}</h4>
          <div class="meta">${safe(e.start)} – ${safe(e.end) || "Hiện tại"}</div>
          <ul>${(e.bullets || [])
            .map((b) => `<li>${safe(b)}</li>`) 
            .join("")}</ul>
        </div>`
      )
      .join("");

    const eduHTML = state.education
      .map(
        (ed) => `<div class="eduitem"><strong>${safe(ed.degree)}</strong>, ${safe(
          ed.school
        )} — ${safe(ed.year)}</div>`
      )
      .join("");

    const projHTML = (state.projects || [])
      .map(
        (p) => `<div class="eduitem"><strong>${safe(p.name)}</strong> — ${safe(
          p.description
        )} ${p.link ? `(<a href="${p.link}">${p.link}</a>)` : ""}</div>`
      )
      .join("");

    const contactHTML = `
      <ul class="contact">
        <li><span>📧</span><div><div>${safe(state.email)}</div><small>Email</small></div></li>
        <li><span>📱</span><div><div>${safe(state.phone)}</div><small>Điện thoại</small></div></li>
        <li><span>🔗</span><div><div>${safe(state.website)}</div><small>Website/LinkedIn</small></div></li>
        <li><span>📍</span><div><div>${safe(state.address)}</div><small>Địa chỉ</small></div></li>
      </ul>`;

    const strengthsHTML = (state.strengths || [])
      .map((s) => `<span class="badge">${safe(s)}</span>`) 
      .join("");

    const skillsHTML = (state.skills || [])
      .map((s) => `<span class="badge">${safe(s)}</span>`) 
      .join("");

    const exportCSS = baseCSS.replace(`--accent:${data.accent}`, `--accent:${state.accent}`);

    return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>CV ${safe(state.name)}</title>
<style>${exportCSS}</style>
</head>
<body>
  <div class="stage">
    <div class="page">
      <div class="header">
        <div class="avatar">${initials || "CV"}</div>
        <div class="titlearea">
          <h1>${safe(state.name)}</h1>
          <p>${safe(state.role)}</p>
        </div>
      </div>
      <div class="content">
        <aside class="section">
          <div class="card">
            <h3>Liên hệ</h3>
            <div class="divider"></div>
            ${contactHTML}
          </div>
          <div class="card" style="margin-top:12px">
            <h3>Sở trường</h3>
            <div class="divider"></div>
            <div class="badges">${strengthsHTML}</div>
          </div>
          <div class="card" style="margin-top:12px">
            <h3>Kỹ năng</h3>
            <div class="divider"></div>
            <div class="badges">${skillsHTML}</div>
          </div>
        </aside>
        <main class="section">
          <div class="card">
            <h3>Tóm tắt</h3>
            <div class="divider"></div>
            <p class="summary">${safe(state.summary)}</p>
          </div>
          <div class="card" style="margin-top:12px">
            <h3>Kinh nghiệm</h3>
            <div class="divider"></div>
            ${expHTML}
          </div>
          <div class="card" style="margin-top:12px">
            <h3>Học vấn</h3>
            <div class="divider"></div>
            ${eduHTML}
          </div>
          ${projHTML ? `<div class="card" style="margin-top:12px"><h3>Dự án</h3><div class="divider"></div>${projHTML}</div>` : ""}
        </main>
      </div>
      <div class="accentbar"></div>
    </div>
  </div>
</body>
</html>`;
  };

  return (
    <div className="container">
      <style dangerouslySetInnerHTML={{ __html: baseCSS }} />

      {/* ======= EDITOR PANEL ======= */}
      <aside className="editor">
        <h2>🧩 Thông tin cơ bản</h2>
        <label>Họ và tên</label>
        <input value={data.name} onChange={(e) => setField("name", e.target.value)} />
        <label>Chức danh</label>
        <input value={data.role} onChange={(e) => setField("role", e.target.value)} />

        <div className="row">
          <div>
            <label>Email</label>
            <input value={data.email} onChange={(e) => setField("email", e.target.value)} />
          </div>
          <div>
            <label>Điện thoại</label>
            <input value={data.phone} onChange={(e) => setField("phone", e.target.value)} />
          </div>
        </div>
        <div className="row">
          <div>
            <label>Website / LinkedIn</label>
            <input value={data.website} onChange={(e) => setField("website", e.target.value)} />
          </div>
          <div>
            <label>Địa chỉ</label>
            <input value={data.address} onChange={(e) => setField("address", e.target.value)} />
          </div>
        </div>

        <label>Tóm tắt năng lực</label>
        <textarea value={data.summary} onChange={(e) => setField("summary", e.target.value)} />

        <div className="group">
          <h2>🎨 Giao diện</h2>
          <label>Màu chủ đạo</label>
          <input type="color" value={data.accent} onChange={(e) => setField("accent", e.target.value)} />
          <div className="btnbar">
            <button className="btn" onClick={handleExportPDF}>🖨️ In ra PDF</button>
            <button className="btn" onClick={handleCopyHTML}>📋 Copy HTML</button>
            <button className="btn" onClick={handleDownloadHTML}>⬇️ Tải HTML</button>
          </div>
        </div>

        <div className="group">
          <h2>💪 Sở trường</h2>
          <div className="chiplist">
            {data.strengths.map((s, i) => (
              <span className="chip" key={i}>
                <input
                  value={s}
                  onChange={(e) => setData((d) => ({
                    ...d,
                    strengths: d.strengths.map((x, idx) => (idx === i ? e.target.value : x)),
                  }))}
                  style={{ border: "none", outline: "none", width: Math.max(80, s.length * 8) }}
                />
                <button onClick={() => removeFrom("strengths", i)}>×</button>
              </span>
            ))}
          </div>
          <div className="btnbar">
            <button className="btn ghost" onClick={() => addTo("strengths", "Kỹ năng mềm")}>+ Thêm</button>
          </div>
        </div>

        <div className="group">
          <h2>🛠️ Kỹ năng</h2>
          <div className="chiplist">
            {data.skills.map((s, i) => (
              <span className="chip" key={i}>
                <input
                  value={s}
                  onChange={(e) => setData((d) => ({
                    ...d,
                    skills: d.skills.map((x, idx) => (idx === i ? e.target.value : x)),
                  }))}
                  style={{ border: "none", outline: "none", width: Math.max(80, s.length * 8) }}
                />
                <button onClick={() => removeFrom("skills", i)}>×</button>
              </span>
            ))}
          </div>
          <div className="btnbar">
            <button className="btn ghost" onClick={() => addTo("skills", "New Skill")}>+ Thêm</button>
          </div>
        </div>

        <div className="group">
          <h2>💼 Kinh nghiệm</h2>
          {data.experience.map((e, i) => (
            <div key={i} style={{ border:"1px dashed #e5e7eb", borderRadius:12, padding:12, marginBottom:10 }}>
              <div className="row">
                <div>
                  <label>Vị trí</label>
                  <input value={e.title} onChange={(ev) => updateExperience(i, { title: ev.target.value })} />
                </div>
                <div>
                  <label>Công ty</label>
                  <input value={e.company} onChange={(ev) => updateExperience(i, { company: ev.target.value })} />
                </div>
              </div>
              <div className="row">
                <div>
                  <label>Bắt đầu</label>
                  <input value={e.start} onChange={(ev) => updateExperience(i, { start: ev.target.value })} />
                </div>
                <div>
                  <label>Kết thúc</label>
                  <input value={e.end} onChange={(ev) => updateExperience(i, { end: ev.target.value })} />
                </div>
              </div>
              <label>Mô tả (mỗi dòng là 1 gạch đầu dòng)</label>
              <textarea
                value={(e.bullets || []).join("\n")}
                onChange={(ev) => updateExperience(i, { bullets: ev.target.value.split(/\n+/).filter(Boolean) })}
              />
              <div className="btnbar">
                <button className="btn" onClick={() => removeExperience(i)}>🗑️ Xóa</button>
              </div>
            </div>
          ))}
          <button className="btn ghost" onClick={addExperience}>+ Thêm kinh nghiệm</button>
        </div>

        <div className="group">
          <h2>🎓 Học vấn</h2>
          {data.education.map((ed, i) => (
            <div key={i} style={{ border:"1px dashed #e5e7eb", borderRadius:12, padding:12, marginBottom:10 }}>
              <div className="row">
                <div>
                  <label>Bằng cấp</label>
                  <input value={ed.degree} onChange={(ev) => updateEducation(i, { degree: ev.target.value })} />
                </div>
                <div>
                  <label>Trường</label>
                  <input value={ed.school} onChange={(ev) => updateEducation(i, { school: ev.target.value })} />
                </div>
              </div>
              <label>Năm</label>
              <input value={ed.year} onChange={(ev) => updateEducation(i, { year: ev.target.value })} />
              <div className="btnbar">
                <button className="btn" onClick={() => removeEducation(i)}>🗑️ Xóa</button>
              </div>
            </div>
          ))}
          <button className="btn ghost" onClick={addEducation}>+ Thêm học vấn</button>
        </div>

        <div className="group">
          <h2>📦 Dự án (tuỳ chọn)</h2>
          {data.projects.map((p, i) => (
            <div key={i} style={{ border:"1px dashed #e5e7eb", borderRadius:12, padding:12, marginBottom:10 }}>
              <label>Tên dự án</label>
              <input value={p.name} onChange={(ev) => updateProject(i, { name: ev.target.value })} />
              <label>Mô tả</label>
              <textarea value={p.description} onChange={(ev) => updateProject(i, { description: ev.target.value })} />
              <label>Link</label>
              <input value={p.link} onChange={(ev) => updateProject(i, { link: ev.target.value })} />
              <div className="btnbar">
                <button className="btn" onClick={() => removeProject(i)}>🗑️ Xóa</button>
              </div>
            </div>
          ))}
          <button className="btn ghost" onClick={addProject}>+ Thêm dự án</button>
        </div>
      </aside>

      {/* ======= CV PREVIEW (PRINTABLE) ======= */}
      <div className="stage">
        <div className="page" ref={cvRef}>
          <div className="header">
            <div className="avatar">{initials || "CV"}</div>
            <div className="titlearea">
              <h1>{data.name}</h1>
              <p>{data.role}</p>
            </div>
          </div>

          <div className="content">
            <aside className="section">
              <div className="card">
                <h3>Liên hệ</h3>
                <div className="divider"></div>
                <ul className="contact">
                  <li><span>📧</span><div><div>{data.email}</div><small>Email</small></div></li>
                  <li><span>📱</span><div><div>{data.phone}</div><small>Điện thoại</small></div></li>
                  <li><span>🔗</span><div><div>{data.website}</div><small>Website/LinkedIn</small></div></li>
                  <li><span>📍</span><div><div>{data.address}</div><small>Địa chỉ</small></div></li>
                </ul>
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h3>Sở trường</h3>
                <div className="divider"></div>
                <div className="badges">
                  {data.strengths.map((s, i) => (
                    <span className="badge" key={i}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h3>Kỹ năng</h3>
                <div className="divider"></div>
                <div className="badges">
                  {data.skills.map((s, i) => (
                    <span className="badge" key={i}>{s}</span>
                  ))}
                </div>
              </div>
            </aside>

            <main className="section">
              <div className="card">
                <h3>Tóm tắt</h3>
                <div className="divider"></div>
                <p className="summary">{data.summary}</p>
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h3>Kinh nghiệm</h3>
                <div className="divider"></div>
                {data.experience.map((e, i) => (
                  <div className="expitem" key={i}>
                    <h4>{e.title} · {e.company}</h4>
                    <div className="meta">{e.start} – {e.end || "Hiện tại"}</div>
                    <ul>
                      {(e.bullets || []).map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h3>Học vấn</h3>
                <div className="divider"></div>
                {data.education.map((ed, i) => (
                  <div className="eduitem" key={i}>
                    <strong>{ed.degree}</strong>, {ed.school} — {ed.year}
                  </div>
                ))}
              </div>

              {data.projects?.length ? (
                <div className="card" style={{ marginTop: 12 }}>
                  <h3>Dự án</h3>
                  <div className="divider"></div>
                  {data.projects.map((p, i) => (
                    <div className="eduitem" key={i}>
                      <strong>{p.name}</strong> — {p.description} {p.link ? (<a href={p.link}>{p.link}</a>) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </main>
          </div>

          <div className="accentbar"></div>
          <div className="footer">CV template HTML/CSS – in đẹp trên khổ A4. Nhấn “In ra PDF”.</div>
          {loading && <div className="loading">Đang tạo PDF, vui lòng chờ...</div>}
        </div>
      </div>
    </div>
  );
}
