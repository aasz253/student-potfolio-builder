const generateTemplateA = (data) => {
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || {};
  const socialLinks = data.socialLinks || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} | Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="terminal">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <span class="btn-close"></span>
        <span class="btn-minimize"></span>
        <span class="btn-maximize"></span>
      </div>
      <div class="terminal-title">${data.fullName}@portfolio ~ bash</div>
    </div>
    <div class="terminal-body">
      <div class="terminal-line"><span class="prompt">$</span> whoami</div>
      <div class="section">
        <h1><span class="keyword">const</span> <span class="variable">developer</span> = {</h1>
        <p class="property">  <span class="key">name</span>: <span class="string">"${data.fullName}"</span>,</p>
        <p class="property">  <span class="key">title</span>: <span class="string">"${data.professionalTitle || 'Developer'}"</span>,</p>
        <p class="property">  <span class="key">bio</span>: <span class="string">"${data.bio || 'Passionate developer crafting digital experiences.'}"</span></p>
        <p>};</p>
      </div>
      <div class="terminal-line"><span class="prompt">$</span> ls skills/</div>
      <div class="skills-grid">
        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('\n        ')}
      </div>
      <div class="terminal-line"><span class="prompt">$</span> cat experience.log</div>
      <div class="section">
        ${experience.map(exp => `
        <div class="experience-item">
          <p><span class="comment">//</span> ${exp.company}</p>
          <p><span class="variable">position</span>: <span class="string">"${exp.jobTitle}"</span></p>
          <p><span class="variable">period</span>: <span class="string">"${exp.startDate || 'Start'} - ${exp.endDate || 'Present'}"</span></p>
          <ul class="bullets">${(exp.bullets || []).map(b => `<li><span class="comment">//</span> ${b}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>
      <div class="terminal-line"><span class="prompt">$</span> ls projects/</div>
      <div class="projects-grid">
        ${projects.map(proj => `
        <div class="project-card">
          <h3>${proj.name}</h3>
          <p>${proj.description || 'No description available'}</p>
          <div class="project-links">
            ${proj.liveUrl ? `<a href="${proj.liveUrl}">\u2192 live demo</a>` : ''}
            ${proj.githubUrl ? `<a href="${proj.githubUrl}">\u2192 source code</a>` : ''}
          </div>
        </div>`).join('')}
      </div>
      <div class="terminal-line"><span class="prompt">$</span> cat education.json</div>
      <div class="section">
        <p>{</p>
        <p>  <span class="key">degree</span>: <span class="string">"${education.degree || 'Degree'}"</span>,</p>
        <p>  <span class="key">institution</span>: <span class="string">"${education.institution || 'University'}"</span>,</p>
        <p>  <span class="key">year</span>: <span class="string">"${education.graduationYear || '2024'}"</span></p>
        <p>}</p>
      </div>
      <div class="terminal-line"><span class="prompt">$</span> ./contact.sh</div>
      <div class="contact-section">
        <p><span class="comment">// Connect with me</span></p>
        <div class="social-links">
          ${socialLinks.github ? `<a href="${socialLinks.github}">GitHub</a>` : ''}
          ${socialLinks.linkedin ? `<a href="${socialLinks.linkedin}">LinkedIn</a>` : ''}
          ${socialLinks.twitter ? `<a href="${socialLinks.twitter}">Twitter</a>` : ''}
          ${socialLinks.blog ? `<a href="${socialLinks.blog}">Blog</a>` : ''}
          ${data.resumeUrl ? `<a href="${data.resumeUrl}">Resume</a>` : ''}
        </div>
      </div>
      <div class="terminal-line"><span class="prompt">$</span> <span class="cursor">\u2588</span></div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`;

  const css = `*{margin:0;padding:0;box-sizing:border-box}:root{--bg-primary:#0d1117;--bg-secondary:#161b22;--text-primary:#c9d1d9;--text-secondary:#8b949e;--accent:${data.brandColor||'#3B82F6'};--success:#3fb950}body{font-family:'JetBrains Mono','Fira Code',monospace;background:var(--bg-primary);color:var(--text-primary);min-height:100vh;padding:2rem;line-height:1.6}.terminal{max-width:1200px;margin:0 auto;background:var(--bg-secondary);border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5)}.terminal-header{background:var(--bg-primary);padding:12px 16px;display:flex;align-items:center;gap:12px}.terminal-buttons{display:flex;gap:8px}.terminal-buttons span{width:12px;height:12px;border-radius:50%}.btn-close{background:#ff5f56}.btn-minimize{background:#ffbd2e}.btn-maximize{background:#27ca40}.terminal-title{color:var(--text-secondary);font-size:.85rem;margin-left:auto}.terminal-body{padding:2rem}.terminal-line{margin-bottom:1rem}.prompt{color:var(--accent);margin-right:8px;font-weight:600}.keyword{color:#ff7b72}.variable{color:#79c0ff}.string{color:#a5d6ff}.key{color:#7ee787}.comment{color:var(--text-secondary)}.section{margin:1rem 0 2rem 1.5rem;padding-left:1rem;border-left:2px solid var(--accent)}.experience-item{margin-bottom:1.5rem}.bullets{list-style:none;margin-top:.5rem}.bullets li::before{content:'\u2192 ';color:var(--accent)}.skills-grid{display:flex;flex-wrap:wrap;gap:.5rem;margin:1rem 0 2rem 1.5rem}.skill-tag{background:var(--bg-primary);padding:.25rem .75rem;border-radius:4px;font-size:.85rem;border:1px solid var(--accent)}.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem;margin:1rem 0 2rem 1.5rem}.project-card{background:var(--bg-primary);padding:1.25rem;border-radius:8px;border:1px solid #30363d;transition:border-color .2s}.project-card:hover{border-color:var(--accent)}.project-card h3{color:var(--accent);margin-bottom:.5rem;font-size:1rem}.project-card p{color:var(--text-secondary);font-size:.9rem;margin-bottom:.75rem}.project-links{display:flex;gap:1rem;font-size:.85rem}.project-links a{color:var(--success);text-decoration:none}.project-links a:hover{text-decoration:underline}.contact-section{margin-top:1rem}.social-links{display:flex;flex-wrap:wrap;gap:1rem;margin-top:.5rem}.social-links a{color:var(--accent);text-decoration:none;padding:.5rem 1rem;background:var(--bg-primary);border-radius:4px;border:1px solid var(--accent);transition:all .2s}.social-links a:hover{background:var(--accent);color:var(--bg-primary)}.cursor{animation:blink 1s infinite}@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}@media(max-width:768px){body{padding:1rem}.terminal-body{padding:1rem}.section{margin-left:.5rem}.projects-grid{grid-template-columns:1fr}}`;

  const js = `document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a').forEach(a=>{a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')})});`;

  return { html, css, js };
};

const generateTemplateB = (data) => {
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || {};
  const socialLinks = data.socialLinks || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} | Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="glass-bg"></div>
  <div class="container">
    <header class="hero">
      ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.fullName}" class="profile-img">` : `<div class="profile-placeholder"><span>${data.fullName.charAt(0)}</span></div>`}
      <h1>${data.fullName}</h1>
      <p class="title">${data.professionalTitle || 'Developer'}</p>
      <p class="bio">${data.bio || 'Passionate developer crafting digital experiences.'}</p>
      <div class="social-links">
        ${socialLinks.github ? `<a href="${socialLinks.github}" class="glass-btn">GitHub</a>` : ''}
        ${socialLinks.linkedin ? `<a href="${socialLinks.linkedin}" class="glass-btn">LinkedIn</a>` : ''}
        ${socialLinks.twitter ? `<a href="${socialLinks.twitter}" class="glass-btn">Twitter</a>` : ''}
        ${socialLinks.blog ? `<a href="${socialLinks.blog}" class="glass-btn">Blog</a>` : ''}
      </div>
    </header>
    <section class="glass-card">
      <h2>Skills</h2>
      <div class="skills-wrap">${skills.map(s => `<span class="skill">${s}</span>`).join('')}</div>
    </section>
    <section class="glass-card">
      <h2>Experience</h2>
      ${experience.map(exp => `
      <div class="exp-item">
        <div class="exp-header">
          <h3>${exp.jobTitle}</h3>
          <span class="company">${exp.company}</span>
          <span class="date">${exp.startDate || ''} - ${exp.endDate || 'Present'}</span>
        </div>
        <ul>${(exp.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
      </div>`).join('')}
    </section>
    <section class="glass-card">
      <h2>Projects</h2>
      <div class="projects-grid">${projects.map(p => `
        <div class="project-card glass-card-sm">
          <h3>${p.name}</h3>
          <p>${p.description || ''}</p>
          <div class="proj-links">${p.liveUrl ? `<a href="${p.liveUrl}">Live Demo</a>` : ''}${p.githubUrl ? `<a href="${p.githubUrl}">Code</a>` : ''}</div>
        </div>`).join('')}</div>
    </section>
    <section class="glass-card">
      <h2>Education</h2>
      <div class="edu-item">
        <h3>${education.degree || 'Degree'}</h3>
        <p>${education.institution || 'University'}</p>
        <span>${education.graduationYear || ''}</span>
      </div>
    </section>
    ${data.resumeUrl ? `<a href="${data.resumeUrl}" class="resume-btn glass-btn">Download Resume</a>` : ''}
  </div>
  <script src="script.js"></script>
</body>
</html>`;

  const css = `*{margin:0;padding:0;box-sizing:border-box}:root{--accent:${data.brandColor||'#3B82F6'};--glass-bg:rgba(255,255,255,0.05);--glass-border:rgba(255,255,255,0.1);--text:#ffffff}body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);color:var(--text);min-height:100vh;line-height:1.6}.glass-bg{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;background:radial-gradient(circle at 30% 20%,rgba(59,130,246,0.2) 0%,transparent 50%);z-index:0}.container{position:relative;z-index:1;max-width:1000px;margin:0 auto;padding:3rem 1.5rem}.hero{text-align:center;margin-bottom:3rem}.profile-img{width:160px;height:160px;border-radius:50%;object-fit:cover;border:4px solid var(--accent);box-shadow:0 8px 32px rgba(0,0,0,0.3)}.profile-placeholder{width:160px;height:160px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;margin:0 auto;font-size:4rem;font-weight:600;box-shadow:0 8px 32px rgba(0,0,0,0.3)}.hero h1{font-size:2.5rem;margin:1rem 0 .5rem;font-weight:700}.hero .title{font-size:1.25rem;color:var(--accent);margin-bottom:1rem}.hero .bio{max-width:600px;margin:0 auto;color:rgba(255,255,255,0.8)}.hero .social-links{display:flex;gap:1rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap}.glass-btn{padding:.75rem 1.5rem;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:12px;color:var(--text);text-decoration:none;backdrop-filter:blur(10px);transition:all .3s}.glass-btn:hover{background:var(--accent);border-color:var(--accent);transform:translateY(-2px)}.glass-card{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:20px;padding:2rem;margin-bottom:2rem;backdrop-filter:blur(10px)}.glass-card h2{font-size:1.5rem;margin-bottom:1.5rem;color:var(--accent)}.skills-wrap{display:flex;flex-wrap:wrap;gap:.75rem}.skill{padding:.5rem 1rem;background:rgba(255,255,255,0.1);border-radius:20px;font-size:.9rem;border:1px solid var(--glass-border)}.exp-item{margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid var(--glass-border)}.exp-item:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none}.exp-header{display:flex;flex-wrap:wrap;gap:.5rem;align-items:baseline;margin-bottom:.75rem}.exp-header h3{font-size:1.1rem}.exp-header .company{color:var(--accent)}.exp-header .date{font-size:.85rem;opacity:.7}.exp-item ul{margin-left:1.25rem;color:rgba(255,255,255,0.85)}.exp-item li{margin-bottom:.25rem}.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1.5rem}.project-card{padding:1.5rem;background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid var(--glass-border)}.project-card h3{color:var(--accent);margin-bottom:.5rem}.project-card p{font-size:.9rem;opacity:.8;margin-bottom:1rem}.proj-links{display:flex;gap:1rem}.proj-links a{color:var(--text);text-decoration:none;font-size:.85rem;padding:.25rem .75rem;background:rgba(255,255,255,0.1);border-radius:6px;transition:background .2s}.proj-links a:hover{background:var(--accent)}.edu-item h3{color:var(--accent);margin-bottom:.25rem}.edu-item p{opacity:.9}.edu-item span{font-size:.85rem;opacity:.7}.resume-btn{display:block;width:fit-content;margin:2rem auto 0}@media(max-width:768px){.hero h1{font-size:2rem}.glass-card{padding:1.5rem}}`;

  const js = `document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a').forEach(a=>{a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')})});`;

  return { html, css, js };
};

const generateTemplateC = (data) => {
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || {};
  const socialLinks = data.socialLinks || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} | Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-inner">
        ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.fullName}" class="avatar">` : `<div class="avatar-placeholder">${data.fullName.charAt(0)}</div>`}
        <h1>${data.fullName}</h1>
        <p class="role">${data.professionalTitle || 'Developer'}</p>
        <nav class="nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
        <div class="sidebar-links">${socialLinks.github ? `<a href="${socialLinks.github}">GitHub</a>` : ''}${socialLinks.linkedin ? `<a href="${socialLinks.linkedin}">LinkedIn</a>` : ''}${socialLinks.twitter ? `<a href="${socialLinks.twitter}">Twitter</a>` : ''}</div>
      </div>
    </aside>
    <main class="content">
      <section id="about" class="section">
        <h2>About Me</h2>
        <p>${data.bio || 'Passionate developer crafting digital experiences.'}</p>
      </section>
      <section id="skills" class="section">
        <h2>Skills</h2>
        <div class="skills-grid">${skills.map(s => `<div class="skill-card"><h4>${s}</h4></div>`).join('')}</div>
      </section>
      <section id="experience" class="section">
        <h2>Experience</h2>
        ${experience.map(exp => `
        <div class="exp-card">
          <div class="exp-top"><h3>${exp.jobTitle}</h3><span class="company">${exp.company}</span></div>
          <span class="period">${exp.startDate || ''} - ${exp.endDate || 'Present'}</span>
          <ul>${(exp.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
        </div>`).join('')}
      </section>
      <section id="projects" class="section">
        <h2>Projects</h2>
        <div class="projects-list">${projects.map(p => `
        <div class="project-item">
          <h3>${p.name}</h3>
          <p>${p.description || ''}</p>
          <div class="proj-btns">${p.liveUrl ? `<a href="${p.liveUrl}" class="btn-primary">Live Demo</a>` : ''}${p.githubUrl ? `<a href="${p.githubUrl}" class="btn-outline">Source Code</a>` : ''}</div>
        </div>`).join('')}</div>
      </section>
      <section id="education" class="section">
        <h2>Education</h2>
        <div class="edu-card"><h3>${education.degree || 'Degree'}</h3><p>${education.institution || 'University'}</p><span>${education.graduationYear || ''}</span></div>
      </section>
      <section id="contact" class="section">
        <h2>Contact</h2>
        <div class="contact-links">${socialLinks.blog ? `<a href="${socialLinks.blog}">Blog</a>` : ''}${data.resumeUrl ? `<a href="${data.resumeUrl}">Resume</a>` : ''}</div>
      </section>
    </main>
  </div>
  <script src="script.js"></script>
</body>
</html>`;

  const css = `*{margin:0;padding:0;box-sizing:border-box}:root{--accent:${data.brandColor||'#3B82F6'};--dark:#1a1a2e;--light:#f8f9fa;--gray:#6c757d}.layout{display:flex;min-height:100vh}aside.sidebar{width:300px;background:var(--dark);padding:2rem;position:fixed;height:100vh;overflow-y:auto}aside .sidebar-inner{position:sticky;top:2rem}.avatar{width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid var(--accent)}.avatar-placeholder{width:120px;height:120px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:600;color:#fff;margin:0 auto 1rem}aside h1{font-size:1.5rem;color:#fff;margin-bottom:.25rem}aside .role{color:var(--accent);margin-bottom:2rem;font-size:.95rem}nav{display:flex;flex-direction:column;gap:.75rem}nav a{color:rgba(255,255,255,0.8);text-decoration:none;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,0.1);transition:all .2s}nav a:hover{color:var(--accent);padding-left:.5rem}.sidebar-links{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:2rem}.sidebar-links a{color:rgba(255,255,255,0.7);text-decoration:none;font-size:.85rem;padding:.25rem .75rem;background:rgba(255,255,255,0.1);border-radius:4px}.sidebar-links a:hover{background:var(--accent)}main.content{flex:1;margin-left:300px;padding:3rem;background:var(--light)}.section{margin-bottom:3rem;padding-bottom:3rem;border-bottom:1px solid #dee2e6}.section h2{font-size:1.75rem;margin-bottom:1.5rem;color:var(--dark);position:relative;padding-left:1rem}.section h2::before{content:'';position:absolute;left:0;top:.25rem;bottom:.25rem;width:4px;background:var(--accent);border-radius:2px}.section p{color:var(--gray);line-height:1.8}.skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem}.skill-card{background:#fff;padding:1rem;text-align:center;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.05);border:1px solid #e9ecef}.skill-card h4{color:var(--dark);font-size:.9rem;font-weight:500}.exp-card{background:#fff;padding:1.5rem;border-radius:12px;margin-bottom:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,0.05)}.exp-top{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:.5rem}.exp-top h3{color:var(--dark);font-size:1.1rem}.exp-top .company{color:var(--accent);font-weight:500}.exp-card .period{font-size:.85rem;color:var(--gray)}.exp-card ul{margin-left:1.25rem;margin-top:1rem;color:var(--gray)}.projects-list{display:grid;gap:1.5rem}.project-item{background:#fff;padding:2rem;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.05)}.project-item h3{color:var(--dark);margin-bottom:.75rem}.project-item p{color:var(--gray);margin-bottom:1.25rem}.proj-btns{display:flex;gap:1rem}.btn-primary,.btn-outline{padding:.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:500;transition:all .2s}.btn-primary{background:var(--accent);color:#fff}.btn-primary:hover{filter:brightness(1.1)}.btn-outline{border:2px solid var(--accent);color:var(--accent)}.btn-outline:hover{background:var(--accent);color:#fff}.edu-card{background:#fff;padding:1.5rem;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.05)}.edu-card h3{color:var(--dark);margin-bottom:.25rem}.edu-card p{color:var(--accent);font-weight:500}.edu-card span{font-size:.85rem;color:var(--gray)}.contact-links{display:flex;gap:1rem;flex-wrap:wrap}.contact-links a{padding:.75rem 1.5rem;background:#fff;border-radius:8px;text-decoration:none;color:var(--dark);box-shadow:0 2px 8px rgba(0,0,0,0.05);transition:all .2s}.contact-links a:hover{background:var(--accent);color:#fff}@media(max-width:900px){.layout{flex-direction:column}aside.sidebar{width:100%;position:relative;height:auto}main.content{margin-left:0}}`;

  const js = `document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a').forEach(a=>{a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')});document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'})})})});`;

  return { html, css, js };
};

const generateTemplateD = (data) => {
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || {};
  const socialLinks = data.socialLinks || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} | Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="hero">
    <div class="gradient-orb orb1"></div>
    <div class="gradient-orb orb2"></div>
    <div class="hero-content">
      ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.fullName}" class="hero-img">` : ''}
      <h1 class="glitch" data-text="${data.fullName}">${data.fullName}</h1>
      <p class="hero-title">${data.professionalTitle || 'Developer'}</p>
      <p class="hero-bio">${data.bio || 'Passionate developer crafting digital experiences.'}</p>
      <div class="hero-links">${socialLinks.github ? `<a href="${socialLinks.github}" class="link-btn">GitHub</a>` : ''}${socialLinks.linkedin ? `<a href="${socialLinks.linkedin}" class="link-btn">LinkedIn</a>` : ''}${socialLinks.twitter ? `<a href="${socialLinks.twitter}" class="link-btn">Twitter</a>` : ''}</div>
    </div>
  </header>
  <section class="section skills-section">
    <h2>Skills</h2>
    <div class="skills-strip">${skills.map(s => `<span class="skill-chip">${s}</span>`).join('')}</div>
  </section>
  <section class="section">
    <h2>Experience</h2>
    <div class="timeline">${experience.map((exp,i) => `
      <div class="timeline-item" style="--delay:${i}">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>${exp.jobTitle}</h3>
          <span class="company">${exp.company}</span>
          <span class="period">${exp.startDate || ''} - ${exp.endDate || 'Present'}</span>
          <ul>${(exp.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
        </div>
      </div>`).join('')}</div>
  </section>
  <section class="section">
    <h2>Projects</h2>
    <div class="projects-asymmetric">${projects.map(p => `
      <div class="project-block">
        <h3>${p.name}</h3>
        <p>${p.description || ''}</p>
        <div class="block-links">${p.liveUrl ? `<a href="${p.liveUrl}">Demo</a>` : ''}${p.githubUrl ? `<a href="${p.githubUrl}">Code</a>` : ''}</div>
      </div>`).join('')}</div>
  </section>
  <section class="section">
    <h2>Education</h2>
    <div class="edu-block"><h3>${education.degree || 'Degree'}</h3><p>${education.institution || 'University'}</p><span>${education.graduationYear || ''}</span></div>
  </section>
  <footer class="footer">
    <div class="footer-links">${socialLinks.blog ? `<a href="${socialLinks.blog}">Blog</a>` : ''}${data.resumeUrl ? `<a href="${data.resumeUrl}">Resume</a>` : ''}</div>
  </footer>
  <script src="script.js"></script>
</body>
</html>`;

  const css = `*{margin:0;padding:0;box-sizing:border-box}:root{--accent:${data.brandColor||'#3B82F6'};--dark:#0f0f1a}.hero{position:relative;min-height:80vh;display:flex;align-items:center;justify-content:center;background:var(--dark);overflow:hidden;padding:4rem 2rem}.gradient-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.6}.orb1{width:400px;height:400px;background:${data.brandColor||'#3B82F6'};top:-100px;left:-100px}.orb2{width:300px;height:300px;background:#8b5cf6;bottom:-50px;right:-50px}.hero-content{position:relative;z-index:1;text-align:center}.hero-img{width:180px;height:180px;border-radius:20px;object-fit:cover;border:4px solid var(--accent);margin-bottom:2rem;transform:rotate(-3deg);box-shadow:0 20px 40px rgba(0,0,0,0.3)}.hero h1{font-family:'Space Grotesk',sans-serif;font-size:4rem;font-weight:700;color:#fff;margin-bottom:.5rem;position:relative}.glitch{animation:glitch 3s infinite}.glitch::before{left:2px;text-shadow:-2px 0 var(--accent);animation:glitch-1 2s infinite}.glitch::after{left:-2px;text-shadow:2px 0 #ff00c1;animation:glitch-2 2s infinite}@keyframes glitch{0%,90%,100%{transform:none}92%{transform:skewX(5deg)}}@keyframes glitch-1{0%,100%{clip-path:inset(0 0 100% 0)}50%{clip-path:inset(20% 0 60% 0)}}@keyframes glitch-2{0%,100%{clip-path:inset(100% 0 0 0)}50%{clip-path:inset(40% 0 20% 0)}}.hero-title{font-size:1.5rem;color:var(--accent);margin-bottom:1rem;font-weight:500}.hero-bio{max-width:600px;margin:0 auto 2rem;color:rgba(255,255,255,0.8);line-height:1.6}.hero-links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}.link-btn{padding:1rem 2rem;background:linear-gradient(135deg,var(--accent),#8b5cf6);color:#fff;text-decoration:none;border-radius:50px;font-weight:600;transition:transform .3s,box-shadow .3s}.link-btn:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(59,130,246,0.4)}.section{padding:5rem 2rem;max-width:1200px;margin:0 auto}.section h2{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;color:var(--dark);margin-bottom:2rem;position:relative;display:inline-block}.section h2::after{content:'';position:absolute;bottom:-8px;left:0;width:60px;height:4px;background:var(--accent);border-radius:2px}.skills-strip{display:flex;flex-wrap:wrap;gap:1rem}.skill-chip{padding:.75rem 1.5rem;background:linear-gradient(135deg,#f8fafc,#e2e8f0);border-radius:50px;font-weight:500;color:var(--dark);box-shadow:0 4px 12px rgba(0,0,0,0.1);transition:transform .2s,box-shadow .2s}.skill-chip:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.15)}.timeline{position:relative;padding-left:2rem}.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--accent),#8b5cf6)}.timeline-item{position:relative;margin-bottom:2rem;animation:fadeIn .6s ease forwards;animation-delay:var(--delay,0.5s);opacity:0}@keyframes fadeIn{to{opacity:1}}.timeline-marker{position:absolute;left:-2.25rem;top:.5rem;width:12px;height:12px;background:var(--accent);border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 3px var(--accent)}.timeline-content{background:#fff;padding:1.5rem;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}.timeline-content h3{color:var(--dark);margin-bottom:.25rem}.timeline-content .company{color:var(--accent);font-weight:500}.timeline-content .period{font-size:.85rem;color:#888;display:block;margin-bottom:.75rem}.timeline-content ul{margin-left:1.25rem;color:#555}.projects-asymmetric{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}.projects-asymmetric .project-block:nth-child(odd){transform:translateY(2rem)}.project-block{background:linear-gradient(135deg,#fff,#f8fafc);padding:2rem;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);border-left:4px solid var(--accent)}.project-block h3{color:var(--dark);margin-bottom:.75rem;font-size:1.25rem}.project-block p{color:#666;margin-bottom:1.25rem}.block-links{display:flex;gap:1rem}.block-links a{padding:.5rem 1rem;background:var(--accent);color:#fff;text-decoration:none;border-radius:6px;font-size:.9rem;font-weight:500}.edu-block{background:linear-gradient(135deg,var(--accent),#8b5cf6);padding:2rem;border-radius:16px;color:#fff}.edu-block h3{font-size:1.5rem;margin-bottom:.5rem}.edu-block p{opacity:.9}.footer{padding:3rem 2rem;text-align:center;background:var(--dark)}.footer-links{display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap}.footer-links a{color:#fff;text-decoration:none;opacity:.8;transition:opacity .2s}.footer-links a:hover{opacity:1}@media(max-width:768px){.hero h1{font-size:2.5rem}.projects-asymmetric{grid-template-columns:1fr}.projects-asymmetric .project-block:nth-child(odd){transform:none}}`;

  const js = `document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a').forEach(a=>{a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')});const observer=new IntersectionObserver(e=>{e.forEach(el=>{if(el.isIntersecting)el.target.style.animationPlayState='running'})},{threshold:.1});document.querySelectorAll('.timeline-item').forEach(item=>{item.style.animationPlayState='paused';observer.observe(item)})});`;

  return { html, css, js };
};

const generateTemplateE = (data) => {
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || {};
  const socialLinks = data.socialLinks || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.fullName} | Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="page">
    <header class="header">
      ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.fullName}" class="portrait">` : ''}
      <div class="header-text">
        <h1>${data.fullName}</h1>
        <p class="subtitle">${data.professionalTitle || 'Developer'}</p>
        <p class="bio">${data.bio || 'Passionate developer crafting digital experiences.'}</p>
        <div class="header-links">${socialLinks.github ? `<a href="${socialLinks.github}">GitHub</a>` : ''}${socialLinks.linkedin ? `<a href="${socialLinks.linkedin}">LinkedIn</a>` : ''}${socialLinks.twitter ? `<a href="${socialLinks.twitter}">Twitter</a>` : ''}${socialLinks.blog ? `<a href="${socialLinks.blog}">Blog</a>` : ''}</div>
      </div>
    </header>
    <hr class="divider">
    <section class="section">
      <h2>Skills</h2>
      <div class="skills-list">${skills.join(' \u00b7 ')}</div>
    </section>
    <hr class="divider">
    <section class="section">
      <h2>Experience</h2>
      ${experience.map(exp => `
      <div class="exp-block">
        <div class="exp-meta"><span class="job">${exp.jobTitle}</span><span class="at">at</span><span class="company">${exp.company}</span><span class="years">${exp.startDate || ''} \u2014 ${exp.endDate || 'Present'}</span></div>
        <ul>${(exp.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
      </div>`).join('')}
    </section>
    <hr class="divider">
    <section class="section">
      <h2>Projects</h2>
      ${projects.map(p => `
      <div class="proj-block">
        <div class="proj-header"><h3>${p.name}</h3><div class="proj-links">${p.liveUrl ? `<a href="${p.liveUrl}">Live</a>` : ''}${p.githubUrl ? `<a href="${p.githubUrl}">Code</a>` : ''}</div></div>
        <p>${p.description || ''}</p>
      </div>`).join('')}
    </section>
    <hr class="divider">
    <section class="section">
      <h2>Education</h2>
      <div class="edu-block"><p class="degree">${education.degree || 'Degree'}</p><p class="school">${education.institution || 'University'}</p><p class="year">${education.graduationYear || ''}</p></div>
    </section>
    <hr class="divider">
    <footer class="footer">${data.resumeUrl ? `<a href="${data.resumeUrl}" class="resume-link">Resume</a>` : ''}</footer>
  </div>
  <script src="script.js"></script>
</body>
</html>`;

  const css = `*{margin:0;padding:0;box-sizing:border-box}:root{--text:#2d2d2d;--accent:${data.brandColor||'#3B82F6'};--muted:#6b6b6b;--border:#e5e5e5}.page{max-width:800px;margin:0 auto;padding:4rem 2rem;font-family:'Inter',sans-serif;color:var(--text);line-height:1.7}.header{display:flex;gap:3rem;align-items:flex-start}.portrait{width:150px;height:150px;border-radius:4px;object-fit:cover;border:1px solid var(--border)}.header-text h1{font-family:'Cormorant Garamond',serif;font-size:2.75rem;font-weight:600;color:var(--text);margin-bottom:.25rem;letter-spacing:-.02em}.subtitle{font-size:1.1rem;color:var(--accent);font-weight:400;margin-bottom:1rem}.bio{color:var(--muted);max-width:500px;margin-bottom:1.5rem;font-weight:300}.header-links{display:flex;gap:1.5rem;flex-wrap:wrap}.header-links a{color:var(--text);text-decoration:none;font-size:.9rem;position:relative}.header-links a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--accent);transition:width .2s}.header-links a:hover::after{width:100%}.divider{border:none;border-top:1px solid var(--border);margin:2.5rem 0}.section h2{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;margin-bottom:1.5rem;color:var(--text)}.skills-list{color:var(--muted);font-size:.95rem;letter-spacing:.02em}.exp-block{margin-bottom:2rem}.exp-block:last-child{margin-bottom:0}.exp-meta{display:flex;flex-wrap:wrap;gap:.5rem;align-items:baseline;margin-bottom:.75rem}.exp-meta .job{font-weight:600;font-size:1.05rem}.exp-meta .at{color:var(--muted);font-style:italic}.exp-meta .company{font-weight:500;color:var(--accent)}.exp-meta .years{color:var(--muted);font-size:.9rem}.exp-block ul{margin-left:1.25rem;color:var(--muted)}.exp-block li{margin-bottom:.35rem}.proj-block{margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid var(--border)}.proj-block:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none}.proj-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}.proj-header h3{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:600}.proj-links{display:flex;gap:1rem}.proj-links a{color:var(--accent);text-decoration:none;font-size:.85rem}.proj-block p{color:var(--muted)}.edu-block p{margin-bottom:.25rem}.edu-block .degree{font-weight:600}.edu-block .school{color:var(--accent)}.edu-block .year{color:var(--muted);font-size:.9rem}.footer{margin-top:1rem}.resume-link{display:inline-block;padding:.75rem 2rem;border:1px solid var(--text);color:var(--text);text-decoration:none;font-size:.9rem;transition:all .2s}.resume-link:hover{background:var(--text);color:#fff}@media(max-width:600px){.header{flex-direction:column;gap:1.5rem}.portrait{width:120px;height:120px}.header-text h1{font-size:2rem}}`;

  const js = `document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a').forEach(a=>{a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')})});`;

  return { html, css, js };
};

module.exports = { generateTemplateA, generateTemplateB, generateTemplateC, generateTemplateD, generateTemplateE };
