// Fetches your public Medium RSS feed and saves blog-posts.json (title, link, date, tags, short summary).
import fs from "node:fs";
const user = (process.env.MEDIUM_USER || "").replace(/^@/, "");
if (!user) { console.error("Set MEDIUM_USER to your Medium username."); process.exit(1); }
const res = await fetch(`https://medium.com/feed/@${user}`, { headers: { "User-Agent": "Mozilla/5.0 (portfolio-sync)" } });
if (!res.ok) { console.error("Medium feed error", res.status); process.exit(1); }
const xml = await res.text();
const unwrap = s => s.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
const tag = (s, t) => { const m = s.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`)); return m ? unwrap(m[1]) : ""; };
const dec = s => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
  const i = m[1], text = dec((tag(i, "content:encoded") || tag(i, "description")).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return {
    title: dec(tag(i, "title")), url: tag(i, "link").split("?")[0], date: new Date(tag(i, "pubDate")).toISOString(),
    tags: [...i.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(c => dec(unwrap(c[1]))),
    summary: text.slice(0, 220) + (text.length > 220 ? "…" : ""), minutes: Math.max(1, Math.round(text.split(" ").length / 220))
  };
}).filter(p => p.url.startsWith("https://"));
fs.writeFileSync("blog-posts.json", JSON.stringify(posts, null, 2) + "\n");
console.log(`Saved ${posts.length} posts`);
