/* =========================================================
   ARUSH KANODIYA — PORTFOLIO LOGIC
   ---------------------------------------------------------
   SECURITY WARNING
   This is a front-end demo. Admin credentials below are
   hardcoded and visible to anyone who reads this file.
   For a real public site you MUST:
     - move authentication to a backend (Node/PHP/Firebase)
     - hash passwords (bcrypt/argon2)
     - use secure HTTP-only session cookies
     - authorise every write on the server
   This file stores demo credentials so you can preview the
   dashboard, nothing more. Do not ship it as real security.
   ========================================================= */

(() => {
  "use strict";

  /* ======================================================
     0. CONSTANTS & STORAGE KEYS
     ====================================================== */
  const STORAGE_KEY = "arush_portfolio_data_v1";
  const SESSION_KEY = "arush_portfolio_admin_session";

  // ---- DEMO-ONLY CREDENTIALS (replace with backend auth) ----
  const DEMO_ADMIN_ID = "admin workingonthisisarush";
  const DEMO_ADMIN_PASS = "kanodiyaarushcreation";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ======================================================
     1. DEFAULT CONTENT
     ====================================================== */
  function defaultData() {
    return {
      profile: {
        name: "Arush Kanodiya",
        tagline: "Coder. Creator. Developer. Future Innovator.",
        intro:
          "I'm passionate about technology, programming, and creating digital experiences. I love exploring new ideas, building projects, solving problems, and turning imagination into reality through code.",
        about:
          "I'm Arush Kanodiya — a programmer, technology enthusiast, and creative developer driven by curiosity. I'm passionate about coding and programming, and I love exploring how software and hardware come together. My interests span web development, Arduino and electronics, artificial intelligence, and creative digital design including graphic design and wallpapers. I'm always learning new technologies and building useful projects that turn imagination into reality.",
        journey:
          "From my first lines of code to building hardware projects and exploring AI, my journey has been driven by curiosity, experimentation, and a constant desire to improve.",
        interests:
          "Coding, technology, electronics, anime-inspired creativity, digital design, and innovation — I find inspiration everywhere and love turning it into something tangible.",
        goals:
          "Becoming a better developer, creating innovative products, and exploring emerging technologies — while building things that are genuinely useful.",
        profileImage: ""
      },
      experience: [
        { id: "e1", period: "2021 — Present", title: "Programming & Web Development", desc: "Learning and building with HTML, CSS, JavaScript, and modern web tooling. Turning ideas into working interfaces and apps." },
        { id: "e2", period: "2022 — Present", title: "Arduino & Electronics", desc: "Exploring microcontrollers and hardware: LED matrixes, sensors, and prototype circuits for real-world projects." },
        { id: "e3", period: "2023 — Present", title: "Creative Digital Projects", desc: "Designing wallpapers, visual content, and anime-inspired creative work under ASTRA WALLS." },
        { id: "e4", period: "2024 — Present", title: "AI Tools & Automation", desc: "Investigating AI assistants, automation ideas, and how AI tooling can enhance productivity and creativity." }
      ],
      skills: [
        { id: "s1",  name: "HTML",                level: 90 },
        { id: "s2",  name: "CSS",                 level: 85 },
        { id: "s3",  name: "JavaScript",          level: 80 },
        { id: "s4",  name: "Arduino",             level: 70 },
        { id: "s5",  name: "C / C++ (Basic)",     level: 55 },
        { id: "s6",  name: "Web Development",     level: 80 },
        { id: "s7",  name: "UI / UX Design",      level: 70 },
        { id: "s8",  name: "Electronics",         level: 60 },
        { id: "s9",  name: "AI Tools",            level: 65 },
        { id: "s10", name: "Creative Design",     level: 75 },
        { id: "s11", name: "Problem Solving",     level: 85 },
        { id: "s12", name: "Technology Research", level: 70 }
      ],
      projects: [
        { id: "p1", title: "CHRONIX", desc: "Arduino-based LED matrix clock project with digital clock display and custom display modes.", tech: "Arduino, C++, Electronics", status: "In Progress", image: "", link: "" },
        { id: "p2", title: "Sign2Speak", desc: "ESP32-based sign language translation glove concept using flex sensors and voice output.", tech: "ESP32, Flex Sensors, Voice", status: "Concept", image: "", link: "" },
        { id: "p3", title: "ASTRA WALLS", desc: "Digital wallpaper brand and creative design project — anime-inspired and premium aesthetic wallpapers.", tech: "Design, Branding", status: "Ongoing", image: "", link: "" },
        { id: "p4", title: "MEXT", desc: "Anime streaming platform concept focused on anime discovery and a personalised user experience.", tech: "Web Concepts, UI/UX", status: "Concept", image: "", link: "" },
        { id: "p5", title: "GAME VERSE", desc: "Video game arcade website concept with registration, food menu, reviews, and administration.", tech: "Web, UI/UX", status: "Concept", image: "", link: "" },
        { id: "p6", title: "PERSONAL AI ASSISTANT", desc: "Exploration of AI assistants and automation ideas for daily tasks.", tech: "AI Tools, Automation", status: "Exploration", image: "", link: "" }
      ],
      certificates: [
        { 
          id: "c1", 
          name: "HTML Essentials", 
          org: "Cisco Networking Academy", 
          date: "15 Jan 2026", 
          file: "certificate-html-essentials.jpg", /* Place the uploaded image in the same folder */
          verify: "" 
        }
      ],
      achievements: [
        { id: "a1", title: "First Personal Project", desc: "Add your real programming milestone here from the admin dashboard." }
      ],
      socials: [
        { id: "so1", label: "Instagram", url: "https://www.instagram.com/kanodiya.arush/?hl=en" }
      ],
      settings: {
        email: "hello@example.com",
        accent: "#6c8cff",
        accent2: "#b06cff",
        tagline: "Arush Kanodiya — Portfolio"
      }
    };
  }

  /* ======================================================
     2. DATA LAYER
     ====================================================== */
  const Store = {
    data: null,

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        this.data = raw ? mergeDeep(defaultData(), JSON.parse(raw)) : defaultData();
      } catch (err) {
        console.warn("Storage load failed, using defaults.", err);
        this.data = defaultData();
      }
      return this.data;
    },

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        return true;
      } catch (err) {
        console.error("Save failed:", err);
        toast("Could not save. Storage may be full.", true);
        return false;
      }
    },

    reset() {
      this.data = defaultData();
      this.save();
    }
  };

  function mergeDeep(base, override) {
    if (Array.isArray(base)) return Array.isArray(override) ? override : base;
    if (typeof base !== "object" || base === null) return override !== undefined ? override : base;
    const out = { ...base };
    if (override && typeof override === "object") {
      for (const key of Object.keys(override)) {
        out[key] = mergeDeep(base[key], override[key]);
      }
    }
    return out;
  }

  /* ======================================================
     3. UTILITIES
     ====================================================== */
  const uid = (prefix = "id") =>
    prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  const escapeHTML = (str = "") =>
    String(str).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));

  function toast(message, isError = false) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("error", isError);
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2600);
  }

  function placeholderImage(label = "Image") {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1a1a2e"/>
            <stop offset="100%" stop-color="#12121c"/>
          </linearGradient>
        </defs>
        <rect width="640" height="400" fill="url(#g)"/>
        <text x="320" y="205" text-anchor="middle" fill="#6c8cff"
              font-family="Arial, sans-serif" font-size="22" font-weight="600">
          ${escapeHTML(label)}
        </text>
      </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* ======================================================
     4. RENDERING — PUBLIC SITE
     ====================================================== */
  function renderAll() {
    const d = Store.data;

    $("#heroName").textContent = (d.profile.name || "Arush Kanodiya").toUpperCase() + ".";
    $("#heroIntro").textContent = d.profile.intro;
    $("#aboutText").innerHTML = escapeHTML(d.profile.about).replace(/\n/g, "<br>");
    $("#journeyText").textContent = d.profile.journey;
    $("#interestsText").textContent = d.profile.interests;
    $("#goalsText").textContent = d.profile.goals;

    const profileImg = $("#profileImage");
    profileImg.src = d.profile.profileImage && d.profile.profileImage.trim()
      ? d.profile.profileImage
      : placeholderImage("Arush Kanodiya");
    profileImg.onerror = () => { profileImg.src = placeholderImage("Arush Kanodiya"); };

    const timeline = $("#experienceTimeline");
    timeline.innerHTML = d.experience.length
      ? d.experience.map(e => `
          <article class="tl-item glass reveal">
            <p class="tl-period">${escapeHTML(e.period)}</p>
            <h3 class="tl-title">${escapeHTML(e.title)}</h3>
            <p class="tl-desc">${escapeHTML(e.desc)}</p>
          </article>`).join("")
      : `<p class="empty-state">No experience entries yet.</p>`;

    const skillsGrid = $("#skillsGrid");
    skillsGrid.innerHTML = d.skills.length
      ? d.skills.map(s => `
          <article class="skill-card glass reveal">
            <div class="skill-top">
              <span class="skill-name">${escapeHTML(s.name)}</span>
              <span class="skill-pct">${Number(s.level) || 0}%</span>
            </div>
            <div class="skill-bar"><div class="skill-fill" data-level="${Number(s.level) || 0}"></div></div>
          </article>`).join("")
      : `<p class="empty-state">No skills yet.</p>`;

    const projectsGrid = $("#projectsGrid");
    projectsGrid.innerHTML = d.projects.length
      ? d.projects.map(p => {
          const tech = (p.tech || "").split(",").map(t => t.trim()).filter(Boolean);
          const img = p.image && p.image.trim() ? p.image : placeholderImage(p.title);
          const link = p.link && p.link.trim()
            ? `<a class="project-link" href="${escapeHTML(p.link)}" target="_blank" rel="noopener noreferrer">View Project →</a>`
            : `<span class="project-link" style="color:var(--muted)">Details coming soon</span>`;
          return `
            <article class="project-card glass reveal">
              <div class="project-img"><img src="${escapeHTML(img)}" alt="${escapeHTML(p.title)}" loading="lazy"
                 onerror="this.onerror=null;this.src='${placeholderImage("Project")}'"></div>
              <div class="project-body">
                <span class="project-status">${escapeHTML(p.status || "Project")}</span>
                <h3 class="project-title">${escapeHTML(p.title)}</h3>
                <p class="project-desc">${escapeHTML(p.desc)}</p>
                <div class="project-tech">${tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join("")}</div>
                ${link}
              </div>
            </article>`;
        }).join("")
      : `<p class="empty-state">No projects yet.</p>`;

    const certGrid = $("#certGrid");
    certGrid.innerHTML = d.certificates.length
      ? d.certificates.map(c => {
          const imgSrc = c.file && c.file.trim() ? c.file : placeholderImage("Certificate");
          return `
          <article class="cert-card glass reveal">
            <img class="cert-img" src="${escapeHTML(imgSrc)}" alt="${escapeHTML(c.name)}" loading="lazy" onerror="this.onerror=null;this.src='${placeholderImage('Certificate')}'">
            <h3 class="cert-name">${escapeHTML(c.name)}</h3>
            <p class="cert-org">${escapeHTML(c.org || "—")}</p>
            <p class="cert-date">${escapeHTML(c.date || "")}</p>
            ${c.verify ? `<a class="cert-link" href="${escapeHTML(c.verify)}" target="_blank" rel="noopener noreferrer">Verify →</a>` : ""}
            ${c.file ? `<a class="cert-link" href="${escapeHTML(c.file)}" target="_blank" rel="noopener noreferrer" style="margin-left:12px">View original →</a>` : ""}
          </article>`;
        }).join("")
      : `<p class="empty-state">No certificates added yet.</p>`;

    const achieveGrid = $("#achieveGrid");
    achieveGrid.innerHTML = d.achievements.length
      ? d.achievements.map(a => `
          <article class="achieve-card glass reveal">
            <h3 class="achieve-title">${escapeHTML(a.title)}</h3>
            <p class="achieve-desc">${escapeHTML(a.desc || "")}</p>
          </article>`).join("")
      : `<p class="empty-state">No achievements added yet.</p>`;

    const socialsHTML = d.socials
      .filter(s => s.label && s.url)
      .map(s => `<a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHTML(s.label)}">${escapeHTML(s.label.slice(0, 2).toUpperCase())}</a>`)
      .join("");
    $("#heroSocials").innerHTML = socialsHTML || `<span class="section-note">Add social links in admin.</span>`;
    $("#contactSocials").innerHTML = socialsHTML || `<span class="section-note">No links yet.</span>`;

    const emailEl = $("#contactEmail");
    emailEl.textContent = d.settings.email || "hello@example.com";
    emailEl.href = "mailto:" + (d.settings.email || "hello@example.com");

    document.documentElement.style.setProperty("--accent", d.settings.accent || "#6c8cff");
    document.documentElement.style.setProperty("--accent-2", d.settings.accent2 || "#b06cff");

    document.title = d.settings.tagline || "Arush Kanodiya — Portfolio";

    requestAnimationFrame(() => {
      initReveal();
      animateSkillBars();
    });

    renderAdminLists();
  }

  /* ======================================================
     5. PUBLIC INTERACTIONS
     ====================================================== */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  function animateSkillBars() {
    const bars = $$(".skill-fill");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = Number(entry.target.dataset.level) || 0;
          entry.target.style.width = level + "%";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => io.observe(b));
  }

  function initTyping() {
    const target = $("#typingText");
    if (!target) return;
    const roles = ["Web Developer", "Arduino Enthusiast", "Creative Designer", "AI Explorer", "Problem Solver"];
    let roleIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const current = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        target.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          return setTimeout(tick, 1600);
        }
      } else {
        charIdx--;
        target.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 90);
    }
    tick();
  }

  function initNavbar() {
    const navbar = $("#navbar");
    const hamburger = $("#hamburger");
    const navLinks = $("#navLinks");

    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    hamburger.addEventListener("click", () => {
      const open = hamburger.classList.toggle("open");
      navLinks.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    });

    $$(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    const sections = $$("section[id]");
    const linkMap = new Map();
    $$(".nav-link").forEach(l => {
      const id = l.getAttribute("href")?.replace("#", "");
      if (id) linkMap.set(id, l);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && linkMap.has(entry.target.id)) {
          $$(".nav-link").forEach(l => l.classList.remove("active"));
          linkMap.get(entry.target.id).classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => io.observe(s));
  }

  function initScrollProgress() {
    const bar = $("#scrollProgress");
    const backTop = $("#backToTop");

    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = (scrolled * 100) + "%";
      backTop.classList.toggle("show", h.scrollTop > 500);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();

    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initCursor() {
    if (matchMedia("(hover: none)").matches) return;
    const dot = $("#cursorDot");
    const ring = $("#cursorRing");
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    (function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(loop);
    })();

    $$("a, button, .project-card, .skill-card, input, textarea, select").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }

  function initStatCounters() {
    const nums = $$(".stat-num");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count) || 0;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current;
        }, 30);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  }

  /* ======================================================
     6. ADMIN AUTH (DEMO ONLY)
     ====================================================== */
  const Auth = {
    isLoggedIn() {
      try { return sessionStorage.getItem(SESSION_KEY) === "1"; }
      catch { return false; }
    },
    login(user, pass) {
      if (user === DEMO_ADMIN_ID && pass === DEMO_ADMIN_PASS) {
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
        return true;
      }
      return false;
    },
    logout() {
      try { sessionStorage.removeItem(SESSION_KEY); } catch {}
    }
  };

  function openLoginModal() {
    const err = $("#loginError");
    if (err) err.textContent = "";
    $("#loginForm").reset();
    $("#adminLogin").classList.add("open");
    setTimeout(() => $("#loginUser").focus(), 150);
  }
  function closeLoginModal() { $("#adminLogin").classList.remove("open"); }

  function initLogin() {
    const form = $("#loginForm");
    if (!form) { console.error("loginForm not found in DOM"); return; }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = $("#loginUser").value.trim();
      const pass = $("#loginPass").value;
      const err = $("#loginError");

      if (Auth.login(user, pass)) {
        closeLoginModal();
        openDashboard();
        toast("Welcome back, Arush.");
      } else {
        err.textContent = "Incorrect ID or password.";
      }
    });

    $("#togglePass").addEventListener("click", () => {
      const input = $("#loginPass");
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      $("#togglePass").textContent = isHidden ? "Hide" : "Show";
    });

    $$("[data-close-modal]").forEach(btn =>
      btn.addEventListener("click", closeLoginModal));

    $("#adminLogin").addEventListener("click", (e) => {
      if (e.target.id === "adminLogin") closeLoginModal();
    });

    $$('a[href="#admin"]').forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        if (Auth.isLoggedIn()) openDashboard();
        else openLoginModal();
      });
    });
  }

  /* ======================================================
     7. ADMIN DASHBOARD
     ====================================================== */
  function openDashboard() {
    const dash = $("#adminDashboard");
    dash.classList.add("open");
    dash.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderAdminLists();
    populateAdminForms();
    updateDashboardStats();
  }

  function closeDashboard() {
    const dash = $("#adminDashboard");
    dash.classList.remove("open");
    dash.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateDashboardStats() {
    const d = Store.data;
    $("#statProjects").textContent = d.projects.length;
    $("#statSkills").textContent = d.skills.length;
    $("#statCerts").textContent = d.certificates.length;
    $("#statAchieve").textContent = d.achievements.length;
  }

  function renderManagerList(containerId, items, fields, editType, deleteType) {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = items.length
      ? items.map(item => `
          <div class="manager-item">
            <div class="mi-info">
              <strong>${escapeHTML(item[fields.primary] || "(untitled)")}</strong>
              <small>${escapeHTML(item[fields.secondary] || "")}</small>
            </div>
            <div class="mi-actions">
              <button class="mi-btn" data-edit="${editType}" data-id="${item.id}">Edit</button>
              <button class="mi-btn danger" data-del="${deleteType}" data-id="${item.id}">Delete</button>
            </div>
          </div>`).join("")
      : `<p class="empty-state">None yet.</p>`;
  }

  function renderAdminLists() {
    if (!$("#adminDashboard")) return;
    const d = Store.data;

    renderManagerList("#expList", d.experience, { primary: "title", secondary: "period" }, "exp", "exp");
    renderManagerList("#skillList", d.skills, { primary: "name", secondary: "" }, "skill", "skill");
    renderManagerList("#projList", d.projects, { primary: "title", secondary: "status" }, "proj", "proj");
    renderManagerList("#certList", d.certificates, { primary: "name", secondary: "org" }, "cert", "cert");
    renderManagerList("#achList", d.achievements, { primary: "title", secondary: "desc" }, "ach", "ach");
    renderManagerList("#socialList", d.socials, { primary: "label", secondary: "url" }, "social", "social");

    updateDashboardStats();
  }

  function populateAdminForms() {
    const d = Store.data;
    const aboutForm = $("#formAbout");
    if (aboutForm) {
      aboutForm.name.value = d.profile.name;
      aboutForm.tagline.value = d.profile.tagline;
      aboutForm.intro.value = d.profile.intro;
      aboutForm.about.value = d.profile.about;
      aboutForm.profileImage.value = d.profile.profileImage || "";
      aboutForm.journey.value = d.profile.journey;
      aboutForm.interests.value = d.profile.interests;
      aboutForm.goals.value = d.profile.goals;
    }

    const socialForm = $("#formSocial");
    if (socialForm) {
      socialForm.email.value = d.settings.email;
    }

    const settingsForm = $("#formSettings");
    if (settingsForm) {
      settingsForm.accent.value = d.settings.accent || "#6c8cff";
      settingsForm.accent2.value = d.settings.accent2 || "#b06cff";
      settingsForm.tagline.value = d.settings.tagline || "";
    }
  }

  function initAdminForms() {
    $("#formAbout").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      Object.assign(Store.data.profile, {
        name: f.name.value.trim(),
        tagline: f.tagline.value.trim(),
        intro: f.intro.value.trim(),
        about: f.about.value.trim(),
        profileImage: f.profileImage.value.trim(),
        journey: f.journey.value.trim(),
        interests: f.interests.value.trim(),
        goals: f.goals.value.trim()
      });
      if (Store.save()) { renderAll(); toast("About Me saved."); }
    });

    $("#formExp").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const id = f.id.value;
      const item = {
        id: id || uid("e"),
        period: f.period.value.trim(),
        title: f.title.value.trim(),
        desc: f.desc.value.trim()
      };
      if (!item.title) return toast("Title is required.", true);
      upsert("experience", item);
      f.reset(); f.id.value = "";
      if (Store.save()) { renderAll(); toast("Experience saved."); }
    });

    $("#formSkill").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const id = f.id.value;
      const item = {
        id: id || uid("s"),
        name: f.name.value.trim(),
        level: Math.max(0, Math.min(100, Number(f.level.value) || 0))
      };
      if (!item.name) return toast("Skill name required.", true);
      upsert("skills", item);
      f.reset(); f.id.value = "";
      if (Store.save()) { renderAll(); toast("Skill saved."); }
    });

    $("#formProj").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const id = f.id.value;
      const item = {
        id: id || uid("p"),
        title: f.title.value.trim(),
        desc: f.desc.value.trim(),
        tech: f.tech.value.trim(),
        status: f.status.value,
        image: f.image.value.trim(),
        link: f.link.value.trim()
      };
      if (!item.title) return toast("Title is required.", true);
      upsert("projects", item);
      f.reset(); f.id.value = "";
      if (Store.save()) { renderAll(); toast("Project saved."); }
    });

    $("#formCert").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const id = f.id.value;
      const item = {
        id: id || uid("c"),
        name: f.name.value.trim(),
        org: f.org.value.trim(),
        date: f.date.value.trim(),
        file: f.file.value.trim(),
        verify: f.verify.value.trim()
      };
      if (!item.name) return toast("Name required.", true);
      upsert("certificates", item);
      f.reset(); f.id.value = "";
      if (Store.save()) { renderAll(); toast("Certificate saved."); }
    });

    $("#formAch").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const id = f.id.value;
      const item = {
        id: id || uid("a"),
        title: f.title.value.trim(),
        desc: f.desc.value.trim()
      };
      if (!item.title) return toast("Title required.", true);
      upsert("achievements", item);
      f.reset(); f.id.value = "";
      if (Store.save()) { renderAll(); toast("Achievement saved."); }
    });

    $("#formSocial").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      Store.data.settings.email = f.email.value.trim();

      const label = f.socialLabel.value.trim();
      const url = f.socialUrl.value.trim();
      const sid = f.socialId.value;
      if (label || url) {
        if (!label || !url) {
          toast("Both label and URL required for a link.", true);
          return;
        }
        upsert("socials", { id: sid || uid("so"), label, url });
      }

      f.socialId.value = "";
      f.socialLabel.value = "";
      f.socialUrl.value = "";

      if (Store.save()) { renderAll(); populateAdminForms(); toast("Social links saved."); }
    });

    $("#formSettings").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      Store.data.settings.accent = f.accent.value;
      Store.data.settings.accent2 = f.accent2.value;
      Store.data.settings.tagline = f.tagline.value.trim();
      if (Store.save()) { renderAll(); toast("Settings saved."); }
    });

    $("#restoreDefaults").addEventListener("click", () => {
      if (!confirm("Restore default content? Your current changes will be replaced.")) return;
      Store.reset();
      renderAll();
      populateAdminForms();
      toast("Default content restored.");
    });

    $("#btnExport").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(Store.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "arush-portfolio-backup.json";
      a.click();
      URL.revokeObjectURL(url);
      toast("Exported backup file.");
    });

    $("#fileImport").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          Store.data = mergeDeep(defaultData(), parsed);
          Store.save();
          renderAll();
          populateAdminForms();
          toast("Import successful.");
        } catch (err) {
          toast("Invalid JSON file.", true);
        }
      };
      reader.readAsText(file);
    });
  }

  function upsert(collection, item) {
    const arr = Store.data[collection];
    const idx = arr.findIndex(x => x.id === item.id);
    if (idx >= 0) arr[idx] = item;
    else arr.push(item);
  }

  function removeItem(collection, id) {
    Store.data[collection] = Store.data[collection].filter(x => x.id !== id);
  }

  function initManagerActions() {
    document.addEventListener("click", (e) => {
      const editBtn = e.target.closest("[data-edit]");
      const delBtn = e.target.closest("[data-del]");

      if (editBtn) {
        const { edit: type, id } = editBtn.dataset;
        const record = findRecord(type, id);
        if (!record) return;
        fillFormForEdit(type, record);
      }

      if (delBtn) {
        const { del: type, id } = delBtn.dataset;
        if (!confirm("Delete this item?")) return;
        const map = {
          exp: "experience", skill: "skills", proj: "projects",
          cert: "certificates", ach: "achievements", social: "socials"
        };
        removeItem(map[type], id);
        if (Store.save()) { renderAll(); toast("Item deleted."); }
      }
    });
  }

  function findRecord(type, id) {
    const map = {
      exp: ["experience"], skill: ["skills"], proj: ["projects"],
      cert: ["certificates"], ach: ["achievements"], social: ["socials"]
    };
    const arr = Store.data[map[type][0]];
    return arr.find(x => x.id === id);
  }

  function fillFormForEdit(type, record) {
    const formMap = {
      exp: "#formExp", skill: "#formSkill", proj: "#formProj",
      cert: "#formCert", ach: "#formAch"
    };
    if (type === "social") {
      const f = $("#formSocial");
      f.socialId.value = record.id;
      f.socialLabel.value = record.label;
      f.socialUrl.value = record.url;
      return;
    }
    const form = $(formMap[type]);
    if (!form) return;
    form.id.value = record.id;
    Object.keys(record).forEach(key => {
      if (key === "id") return;
      const field = form.elements[key];
      if (field) field.value = record[key] || "";
    });
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ======================================================
     8. DASHBOARD NAVIGATION
     ====================================================== */
  function initDashboardNav() {
    $$("#dashNav button[data-panel]").forEach(btn => {
      btn.addEventListener("click", () => {
        const panel = btn.dataset.panel;
        $$("#dashNav button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        $$(".dash-panel").forEach(p => p.classList.toggle("active", p.dataset.panel === panel));
      });
    });

    $("#dashNav [data-action='logout']").addEventListener("click", () => {
      Auth.logout();
      closeDashboard();
      toast("Logged out.");
    });

    $("#dashExit").addEventListener("click", () => {
      closeDashboard();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ======================================================
     9. INIT
     ====================================================== */
  function initLoader() {
    window.addEventListener("load", () => {
      setTimeout(() => $("#loader").classList.add("done"), 450);
    });
  }

  function initFooterYear() {
    $("#footerYear").textContent = new Date().getFullYear();
  }

  function init() {
    Store.load();
    renderAll();
    initLoader();
    initNavbar();
    initTyping();
    initScrollProgress();
    initCursor();
    initStatCounters();
    initLogin();
    initAdminForms();
    initManagerActions();
    initDashboardNav();
    initFooterYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
