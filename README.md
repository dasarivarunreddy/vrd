# Portfolio

Plain HTML, CSS and JS. No build step.

- Edit all content in the top block of `site.js` (name, links, skills, projects, timeline, certifications, posts).
- Add your CV: put `cv.pdf` here and set `cvFile: "cv.pdf"` in `site.js`.
- Set your email and LinkedIn in `site.js`.
- Deploy: upload every file to the root of your GitHub repo (GitHub Pages) or drag the folder to Netlify.
- If your final domain differs from varundasari.com, change it in `sitemap.xml` and `robots.txt`.

Security: strict Content-Security-Policy, no cookies or trackers, all content inserted as text.

## Medium sync
1. In `.github/workflows/medium.yml`, replace `YOUR_MEDIUM_USERNAME` with your Medium username (no @).
2. Push everything to your repo. In GitHub go to Actions, then Sync Medium posts, then Run workflow.
3. It then re-checks every 6 hours and commits `blog-posts.json`; the blog page reads that file. Posts link out to Medium.
