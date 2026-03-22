import React, { useState } from 'react';

const templates = [
  { id: 'Terminal', name: 'The Terminal', description: 'Dark theme, monospace fonts, resembling a CLI' },
  { id: 'Glassmorphism', name: 'Glassmorphism', description: 'Modern, frosted glass effect with blur' },
  { id: 'Sidebar', name: 'The Sidebar', description: 'Classic layout with vertical navigation' },
  { id: 'Gradient', name: 'The Gradient', description: 'Bold gradients with asymmetrical layout' },
  { id: 'Minimalist', name: 'Minimalist', description: 'Clean white space, serif fonts, elegant' },
];

const templateStyles = {
  Terminal: { bg: '#0d1117', accent: '#3B82F6', font: 'monospace' },
  Glassmorphism: { bg: '#1a1a2e', accent: '#8b5cf6', font: 'sans-serif' },
  Sidebar: { bg: '#1a1a2e', accent: '#3B82F6', font: 'sans-serif' },
  Gradient: { bg: '#0f0f1a', accent: '#3B82F6', font: 'sans-serif' },
  Minimalist: { bg: '#ffffff', accent: '#2d2d2d', font: 'serif' },
};

export default function TemplateGallery({ portfolioData, onSelect, onBack }) {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const getPreviewHTML = (templateId) => {
    const style = templateStyles[templateId];
    const name = portfolioData?.fullName || 'Your Name';
    const title = portfolioData?.professionalTitle || 'Developer';
    const bio = portfolioData?.bio || 'Passionate developer crafting digital experiences.';
    const skills = (portfolioData?.skills || ['React', 'Node.js', 'Python']).slice(0, 4);
    const projects = (portfolioData?.projects || []).slice(0, 2);

    const previews = {
      Terminal: `
        <div style="font-family:monospace;background:${style.bg};color:#c9d1d9;padding:20px;height:100%;">
          <div style="display:flex;gap:8px;margin-bottom:20px;">
            <span style="width:12px;height:12px;border-radius:50%;background:#ff5f56;"></span>
            <span style="width:12px;height:12px;border-radius:50%;background:#ffbd2e;"></span>
            <span style="width:12px;height:12px;border-radius:50%;background:#27ca40;"></span>
          </div>
          <p style="color:#79c0ff;margin-bottom:8px;">const developer = {</p>
          <p style="color:#7ee787;margin-left:16px;">name: "${name}",</p>
          <p style="color:#7ee787;margin-left:16px;">title: "${title}",</p>
          <p style="color:#7ee787;margin-left:16px;">bio: "${bio.substring(0,50)}..."</p>
          <p style="color:#79c0ff;">};</p>
          <div style="margin-top:20px;display:flex;flex-wrap:wrap;gap:8px;">
            ${skills.map(s => `<span style="background:#161b22;padding:4px 12px;border-radius:4px;border:1px solid ${style.accent};font-size:12px;">${s}</span>`).join('')}
          </div>
          <p style="margin-top:20px;color:${style.accent};">$ <span style="animation:blink 1s infinite">█</span></p>
        </div>`,
      Glassmorphism: `
        <div style="font-family:sans-serif;background:linear-gradient(135deg,#1a1a2e,#16213e);padding:20px;height:100%;display:flex;flex-direction:column;align-items:center;">
          <div style="width:60px;height:60px;border-radius:50%;background:${style.accent};margin-bottom:12px;"></div>
          <h1 style="color:#fff;font-size:18px;margin:8px 0;">${name}</h1>
          <p style="color:${style.accent};font-size:12px;">${title}</p>
          <p style="color:rgba(255,255,255,0.8);font-size:11px;text-align:center;margin:12px 0;max-width:200px;">${bio.substring(0,80)}...</p>
          <div style="display:flex;gap:8px;margin-top:12px;">
            ${skills.map(s => `<span style="background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:20px;font-size:10px;color:#fff;">${s}</span>`).join('')}
          </div>
        </div>`,
      Sidebar: `
        <div style="font-family:sans-serif;display:flex;height:100%;">
          <div style="width:40%;background:${style.bg};padding:20px;color:#fff;">
            <div style="width:50px;height:50px;border-radius:50%;background:${style.accent};margin-bottom:12px;"></div>
            <h1 style="font-size:14px;margin-bottom:4px;">${name}</h1>
            <p style="color:${style.accent};font-size:11px;">${title}</p>
            <nav style="margin-top:20px;display:flex;flex-direction:column;gap:8px;">
              <a style="color:#fff;text-decoration:none;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.1);">About</a>
              <a style="color:#fff;text-decoration:none;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.1);">Skills</a>
              <a style="color:#fff;text-decoration:none;font-size:12px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.1);">Projects</a>
            </nav>
          </div>
          <div style="flex:1;background:#f8f9fa;padding:20px;">
            <h2 style="color:#333;font-size:14px;margin-bottom:12px;">About</h2>
            <p style="color:#666;font-size:11px;">${bio.substring(0,100)}...</p>
          </div>
        </div>`,
      Gradient: `
        <div style="font-family:sans-serif;position:relative;height:100%;background:${style.bg};padding:20px;overflow:hidden;">
          <div style="position:absolute;width:150px;height:150px;background:${style.accent};border-radius:50%;filter:blur(60px);opacity:0.5;top:-50px;left:-50px;"></div>
          <div style="position:relative;z-index:1;">
            <div style="width:70px;height:70px;border-radius:16px;background:${style.accent};transform:rotate(-5deg);margin-bottom:16px;"></div>
            <h1 style="color:#fff;font-size:22px;margin-bottom:4px;">${name}</h1>
            <p style="color:${style.accent};font-size:14px;margin-bottom:8px;">${title}</p>
            <p style="color:rgba(255,255,255,0.8);font-size:11px;">${bio.substring(0,60)}...</p>
          </div>
        </div>`,
      Minimalist: `
        <div style="font-family:serif;background:#fff;padding:20px;height:100%;">
          <div style="border-bottom:1px solid #e5e5e5;padding-bottom:16px;margin-bottom:16px;">
            <h1 style="font-size:20px;color:#2d2d2d;margin-bottom:4px;">${name}</h1>
            <p style="color:${style.accent};font-size:12px;">${title}</p>
          </div>
          <p style="color:#6b6b6b;font-size:11px;line-height:1.6;margin-bottom:16px;">${bio.substring(0,80)}...</p>
          <div style="color:#6b6b6b;font-size:11px;margin-bottom:12px;">
            <strong>Skills:</strong> ${skills.join(' · ')}
          </div>
        </div>`,
    };

    return previews[templateId] || previews.Minimalist;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Form
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Template</h2>
        <p className="text-purple-200">Select a template for your portfolio</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-card bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer ${
              hoveredTemplate === template.id ? 'ring-4 ring-blue-500' : ''
            }`}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            onClick={() => onSelect(template.id)}
          >
            <div className="iframe-container h-64">
              <iframe
                srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;overflow:hidden;}</style></head><body>${getPreviewHTML(template.id)}</body></html>`}
                className="w-full h-full border-0"
                title={template.name}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{template.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{template.description}</p>
              <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium">
                Select Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
