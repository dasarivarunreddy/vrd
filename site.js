"use strict";
/* ===== EDIT THIS BLOCK: all site content lives here ===== */
const SITE = {
  domain: "https://varunreddydasari.com", name: "Varun Reddy Dasari", full: "Dasari Varun Reddy",
  headline: "Cybersecurity Engineer | Security Researcher | MSc Cyber Security",
  intro: "I'm an MSc Computer Science for Cyber Security student at Heriot-Watt University in Edinburgh, with a B.Tech in Computer Science and Engineering (Cyber Security). I'm interested in penetration testing, vulnerability assessment and application security.",
  email: "varunreddydasari@outlook.com", github: "dasarivarunreddy", linkedin: "", cvFile: "",   // cvFile e.g. "cv.pdf" once the PDF is in this folder
  researchStatus: "proposed"                                         // proposed | in progress | completed | published
};
const SKILLS = {
  "Security testing": ["Nmap", "Burp Suite", "Metasploit", "Vulnerability assessment", "Penetration testing methodology"],
  "Programming and scripting": ["Python", "C", "JavaScript", "Java", "SQL"],
  "Systems and networking": ["Linux", "Networking fundamentals", "Protocols"],
  "Application security": ["Authentication", "Authorisation", "Input validation", "Access control", "Secure coding"],
  "Security research": ["Threat modelling", "Technical investigation", "Documentation"],
  "Tools and platforms": ["Git", "GitHub"]
};
const PROJECTS = [
  { slug: "velkrypt", title: "Velkrypt", category: "Capture the Flag and Security Tools", status: "Draft (details to verify)",
    summary: "A cybersecurity and CTF-oriented project. Intended to cover role-based access control, secure flag validation, a leaderboard and administration features." },
  { slug: "vapt-project", title: "Vulnerability Assessment and Penetration Testing project", category: "Penetration Testing and Vulnerability Assessment", status: "Draft (details to add)",
    summary: "A VAPT project from my B.Tech. Scope, tools, findings and my contribution still to be added." }
];
const CASE = ["Problem and motivation", "Objectives and scope", "Technologies and tools", "Architecture", "My contribution", "Methodology", "Security considerations and threat model", "Testing and verified results", "Challenges", "Limitations and future work", "Links (repository, demo, documentation)"];
const TIMELINE = [
  { t: "MSc Computer Science for Cyber Security", w: "Heriot-Watt University, Edinburgh", d: "January 2026 to present" },
  { t: "Cybersecurity Intern", w: "Hackersdaddy", d: "May 2024 to September 2024", x: "[ADD: what you worked on]" },
  { t: "B.Tech Computer Science and Engineering (Cyber Security)", w: "CMR College of Engineering & Technology, Hyderabad", d: "Class of 2025" }
];
const CERTS = [];   // { name, issuer, date, url } add only genuine, verifiable entries
/* ======================================================== */

const h = (t, a = {}, ...k) => { const n = document.createElement(t); for (const [x, v] of Object.entries(a)) x === "text" ? n.textContent = v : n.setAttribute(x, v); k.flat().forEach(c => c != null && n.append(c)); return n; };
const link = (t, href, c = "", ext = false) => h("a", { class: "btn " + c, href, text: t, ...(ext ? { rel: "noopener noreferrer" } : {}) });
const note = t => h("p", { class: "note", text: t });
const todo = t => h("p", {}, h("span", { class: "todo", text: t }));
const tags = a => h("div", { class: "tags" }, a.map(x => h("span", { class: "tag", text: x })));
const cards = l => h("div", { class: "cards" }, l);
const pcard = p => h("article", { class: "card" }, h("h3", {}, h("a", { href: "project.html?p=" + p.slug, text: p.title })), h("p", { text: p.summary }), tags([p.category, p.status]));
const head = (k, t, l) => [h("p", { class: "kick", text: k }), h("h1", { text: t }), l ? h("p", { class: "lead", text: l }) : null];
const tl = l => h("ol", { class: "tl" }, l.map(e => h("li", {}, h("h3", { text: e.t }), h("div", { class: "when", text: e.w + " · " + e.d }), e.x ? todo(e.x) : null)));
const GH = "https://github.com/" + SITE.github;
const NAV = [["index.html", "Home"], ["about.html", "About"], ["projects.html", "Projects"], ["skills.html", "Skills"], ["experience.html", "Experience"], ["research.html", "Research"], ["blog.html", "Blog"], ["cv.html", "CV"], ["contact.html", "Contact"]];
const page = document.body.dataset.page, app = document.getElementById("app");

const P = {
  home: () => [
    h("div", { class: "hero" }, h("p", { class: "kick", text: "Edinburgh, Scotland" }), h("h1", { text: SITE.name }), h("p", { class: "lead", text: SITE.headline }), h("p", { class: "lead", text: SITE.intro }),
      h("div", { class: "btns" }, link("Explore my projects", "projects.html", "p"), link("View my CV", "cv.html"), link("Contact me", "contact.html"), link("GitHub", GH, "", true))),
    h("h2", { text: "Featured projects" }), cards(PROJECTS.map(pcard)),
    h("h2", { text: "Skills overview" }), cards(Object.entries(SKILLS).map(([g, s]) => h("div", { class: "card" }, h("h3", { text: g }), tags(s)))),
    h("h2", { text: "Education and experience" }), tl(TIMELINE),
    h("h2", { text: "How I work" }), h("ol", { class: "steps" }, ["Identify", "Investigate", "Validate", "Document", "Improve"].map(s => h("li", { text: s })))],
  about: () => [...head("About", "About me", SITE.intro),
    h("h2", { text: "My journey" }), todo("[ADD: two or three sentences on why you got into cyber security]"),
    h("h2", { text: "Timeline" }), tl(TIMELINE),
    h("h2", { text: "Ethics" }), h("p", { text: "I test only systems I own or have written permission to test, follow responsible disclosure, and document what I find." }),
    h("h2", { text: "Goals" }), todo("[ADD: the roles you are aiming for]")],
  projects: () => {
    const q = h("input", { type: "search", placeholder: "Search projects", "aria-label": "Search projects" });
    const cats = [...new Set(PROJECTS.map(p => p.category))];
    const sel = h("select", { "aria-label": "Filter by category" }, h("option", { value: "", text: "All categories" }), cats.map(c => h("option", { value: c, text: c })));
    const out = h("div", { "aria-live": "polite" }), repos = h("div");
    const draw = () => { const s = q.value.toLowerCase(), l = PROJECTS.filter(p => (!sel.value || p.category === sel.value) && (p.title + p.summary).toLowerCase().includes(s)); out.replaceChildren(l.length ? cards(l.map(pcard)) : note("No projects match. Clear the search or choose another category.")); };
    q.oninput = sel.onchange = draw; draw();
    fetch("https://api.github.com/users/" + SITE.github + "/repos?sort=pushed&per_page=6&type=owner").then(r => { if (!r.ok) throw 0; return r.json(); }).then(l => {
      l = l.filter(r => !r.fork); repos.replaceChildren(h("h2", { text: "Public repositories (live from GitHub)" }), l.length ? cards(l.map(r => h("article", { class: "card" }, h("h3", {}, h("a", { href: r.html_url, rel: "noopener noreferrer", text: r.name })), h("p", { text: r.description || "No description." }), r.language ? tags([r.language]) : null))) : note("No public repositories yet."));
    }).catch(() => repos.replaceChildren(h("h2", { text: "Public repositories" }), note("Could not load GitHub right now. See " + GH)));
    return [...head("Projects", "Projects", "Real work only. Draft entries are labelled until I add the verified details."), h("div", { class: "tools" }, q, sel), out, repos];
  },
  project: () => {
    const p = PROJECTS.find(x => x.slug === new URLSearchParams(location.search).get("p"));
    if (!p) return [...head("Not found", "Project not found"), link("Back to projects", "projects.html", "p")];
    document.title = p.title + " · " + SITE.name;
    return [h("p", {}, h("a", { href: "projects.html", text: "Projects" }), " / " + p.title), ...head(p.category, p.title, p.summary), tags([p.status]),
      ...CASE.flatMap(c => [h("h2", { text: c }), todo("[ADD: " + c.toLowerCase() + "]")])];
  },
  skills: () => [...head("Skills", "Skills", "Tools and areas I work in. Each skill gets a link to evidence once I add it."), note("No proficiency ratings. Evidence links for each skill are still to be added."),
    ...Object.entries(SKILLS).flatMap(([g, s]) => [h("h2", { text: g }), tags(s)])],
  experience: () => [...head("Experience", "Experience"), h("h2", { text: "Employment and internships" }), tl(TIMELINE.slice(1, 2)),
    h("h2", { text: "Education" }), tl([TIMELINE[0], TIMELINE[2]]), h("h2", { text: "Projects" }), link("See my projects", "projects.html")],
  research: () => [...head("Research", "Research and dissertation"), tags(["Status: " + SITE.researchStatus]),
    note("My MSc dissertation topic is still being finalised, so nothing here is presented as completed research."),
    ...["Title and abstract", "Research question", "Methodology", "Findings and limitations"].flatMap(c => [h("h2", { text: c }), todo("[ADD: " + c.toLowerCase() + "]")])],
  certifications: () => [...head("Certifications", "Certifications"), CERTS.length ? cards(CERTS.map(c => h("div", { class: "card" }, h("h3", { text: c.name }), h("p", { text: c.issuer + " · " + c.date }), c.url ? link("Verify", c.url, "", true) : null))) : note("No certifications listed yet. Verified entries will be added with their credential links.")],
  blog: () => {
    const q = h("input", { type: "search", placeholder: "Search articles", "aria-label": "Search articles" }), out = h("div", { "aria-live": "polite" }, note("Loading articles…"));
    let all = [];
    const draw = () => { const s = q.value.toLowerCase(), l = all.filter(p => (p.title + p.summary + p.tags.join(" ")).toLowerCase().includes(s));
      out.replaceChildren(l.length ? cards(l.map(p => h("article", { class: "card" }, h("h3", {}, h("a", { href: p.url, rel: "noopener noreferrer", text: p.title })), h("p", { text: p.summary }),
        h("p", { class: "when", text: new Date(p.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }) + " · " + p.minutes + " min read · on Medium" }), tags(p.tags.slice(0, 4))))) : note(all.length ? "No articles match your search." : "No articles yet. Posts from Medium appear here automatically once the sync is set up.")); };
    q.oninput = draw;
    fetch("blog-posts.json").then(r => r.ok ? r.json() : []).then(l => { all = l.filter(p => typeof p.url === "string" && p.url.startsWith("https://")); draw(); }).catch(() => { all = []; draw(); });
    return [...head("Blog", "Write-ups and notes", "Articles I publish on Medium, synced automatically."), h("div", { class: "tools" }, q), out];
  },
  cv: () => [...head("CV", "Curriculum vitae"),
    h("div", { class: "btns" }, SITE.cvFile ? link("Download CV (PDF)", SITE.cvFile, "p") : null, Object.assign(h("button", { class: "btn", type: "button", text: "Print this page" }), { onclick: () => print() })),
    SITE.cvFile ? null : note("The CV PDF has not been added yet. Save it as cv.pdf next to this site and set cvFile in site.js."),
    h("h2", { text: "Summary" }), h("p", { text: SITE.intro }), h("h2", { text: "Education and experience" }), tl(TIMELINE),
    h("h2", { text: "Skills" }), tags(Object.values(SKILLS).flat())],
  contact: () => {
    const msg = h("p", { role: "status" }), f = h("form", { novalidate: "" });
    const fld = (id, l, t = "input") => h("label", {}, l, h(t, { id, name: id, required: "", ...(t === "input" ? { type: id === "email" ? "email" : "text" } : {}) }));
    f.append(fld("name", "Name"), fld("email", "Your email"), fld("subject", "Subject"), fld("message", "Message", "textarea"), h("button", { class: "btn p", type: "submit", text: "Send by email" }), msg);
    f.onsubmit = e => { e.preventDefault(); const v = i => f.elements[i].value.trim();
      if (!v("name") || !/^\S+@\S+\.\S+$/.test(v("email")) || !v("subject") || !v("message")) { msg.className = "err"; msg.textContent = "Please fill in every field with a valid email address."; return; }
      if (!SITE.email) { msg.className = "err"; msg.textContent = "The contact email is not configured yet."; return; }
      msg.className = "ok"; msg.textContent = "Opening your email app…";
      location.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent(v("subject")) + "&body=" + encodeURIComponent(v("message") + "\n\n" + v("name") + " <" + v("email") + ">"); };
    return [...head("Contact", "Get in touch"), h("p", { class: "lead", text: "This form opens your email app with the message filled in. Nothing is stored on this site." }), f,
      h("div", { class: "btns" }, SITE.email ? link(SITE.email, "mailto:" + SITE.email, "p") : null, link("GitHub", GH, "", true), SITE.linkedin ? link("LinkedIn", SITE.linkedin, "", true) : null),
      SITE.email && SITE.linkedin ? null : todo("[ADD: email and LinkedIn URL in site.js]")];
  },
  privacy: () => [...head("Privacy", "Privacy notice"),
    h("p", { text: "This site has no analytics, no tracking and no cookies. Your browser's local storage keeps only your light or dark theme choice." }),
    h("p", { text: "The Projects page asks GitHub's public API for my repositories, so your browser contacts GitHub when you open it. The contact form builds an email in your own mail app. Nothing you type is sent to or stored by this site." })],
  notfound: () => [...head("404", "Page not found", "That page does not exist."), link("Back to home", "index.html", "p")]
};

/* Shared header, footer, theme */
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) { }
const cur = page === "project" ? "projects" : page, active = n => n[0].replace(".html", "") === (cur === "home" ? "index" : cur);
const th = h("button", { class: "th", type: "button", text: "Theme", "aria-label": "Switch colour theme" });
th.onclick = () => { const d = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches; root.dataset.theme = d ? "light" : "dark"; try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { } };
document.body.prepend(h("header", { class: "bar" }, h("div", { class: "in" }, h("a", { class: "logo", href: "index.html" }, "Varun", h("b", { text: " Dasari" })),
  h("nav", { "aria-label": "Main" }, NAV.map(n => h("a", { href: n[0], text: n[1], ...(active(n) ? { "aria-current": "page" } : {}) })), th))));
document.body.append(h("footer", {}, "© " + new Date().getFullYear() + " " + SITE.full, h("br"), h("a", { href: "certifications.html", text: "Certifications" }), h("a", { href: "privacy.html", text: "Privacy" }), h("a", { href: GH, rel: "noopener noreferrer", text: "GitHub" })));
if (!document.title.includes("·")) document.title = (NAV.find(active) || ["", "Page"])[1] + " · " + SITE.name;
app.replaceChildren(...P[page]().flat().filter(Boolean));
