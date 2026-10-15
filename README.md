# Sachin Saravanan — Premium Animated Developer Portfolio

A responsive, high-performance developer portfolio website for **Sachin Saravanan** (Aspiring Full Stack Developer & Data Analytics Enthusiast), built with modern HTML5, CSS3, and Vanilla JavaScript.

Designed with a classic navy-blue and crisp white/slate aesthetic, smooth scroll-triggered reveals, interactive typing headline, and verified GitHub Pages compatibility.

---

## 📁 Project Structure

```text
Portfolio/
├── index.html                 # Semantic HTML5 markup, SEO meta tags, SVG icons
├── style.css                  # Custom Navy & White design system, responsive styles, animations
├── script.js                  # Vanilla JS: ScrollSpy, typing animation, reveals, clipboard copy
├── README.md                  # Project documentation & deployment guide
└── assets/
    ├── images/
    │   ├── sachins.jpg                   # Profile photograph
    │   ├── busora-preview.png            # Busora project screenshot
    │   ├── psychiatric-care-preview.png  # Post-Discharge Psychiatric Care screenshot
    │   ├── tnea-college-finder-preview.png # Smart TNEA College Finder screenshot
    │   └── saravana-hotel-preview.png    # Sri Saravana Hotel screenshot
    ├── resume/
    │   └── Sachin_Saravanan_Resume.pdf   # Downloadable PDF resume (verified relative link)
    └── certificates/
        ├── README.md                     # Certificate directory placeholder
        ├── mongodb-basics.pdf            # (Upload destination)
        ├── joy-of-computing-nptel.pdf    # (Upload destination)
        └── iot-course.pdf                # (Upload destination)
```

---

## 🚀 Running Locally

Because this website uses pure HTML, CSS, and Vanilla JavaScript, no build step or node package installation is required.

### Option 1: Python Built-in Server
Open your terminal inside the `Portfolio/` directory:
```bash
# Python 3
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

### Option 2: Node.js `npx serve`
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🛠️ How to Customize & Maintain Assets

### 1. Replacing Your Profile Photo
1. Place your new portrait image in `assets/images/`.
2. Name it `sachins.jpg` (or update the `src` attribute in `index.html` under the `#home` Hero section).
3. Recommended aspect ratio: 1:1 (Square), minimum 600x600 pixels.

### 2. Updating Project Screenshots
1. Save your screenshots to `assets/images/`:
   - `busora-preview.png`
   - `psychiatric-care-preview.png`
   - `tnea-college-finder-preview.png`
   - `saravana-hotel-preview.png`
2. Recommended resolution: 1200x675 pixels (16:9 ratio) in WebP or PNG format.

### 3. Editing Project Links & Descriptions
1. Open `index.html` and scroll to `<section id="projects">`.
2. Update the `href` attribute for each project's **Live Demo** button.
3. When repository URLs become public, replace the `<span class="repo-status-chip">` with:
```html
<a href="YOUR_GITHUB_REPO_URL" target="_blank" rel="noopener noreferrer" class="btn btn-card-secondary">
  <svg>...</svg>
  <span>GitHub Repo</span>
</a>
```

### 4. Adding Official Certificates
1. Copy your verified PDF documents into `assets/certificates/`:
   - `mongodb-basics.pdf`
   - `joy-of-computing-nptel.pdf`
   - `iot-course.pdf`
2. In `index.html` under `<section id="certificates">`, replace the placeholder notice in the desired card with a download link:
```html
<a href="assets/certificates/mongodb-basics.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
  <span>View Certificate (PDF)</span>
</a>
```

### 5. Replacing Your Resume
1. Export your updated resume as a PDF.
2. Replace `assets/resume/Sachin_Saravanan_Resume.pdf` with your new file using the exact same filename.
3. Both the **Hero Section** and **Resume Section** buttons will automatically link to the new file.

---

## 🌐 Deploying to GitHub Pages

1. **Initialize Git & Push**:
   ```bash
   git init
   git add .
   git commit -m "Build premium animated portfolio for Sachin Saravanan"
   git branch -M main
   git remote add origin https://github.com/sachinsaravanan54/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub (`Settings` > `Pages`).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.
   - Your website will be live in minutes at: `https://sachinsaravanan54.github.io/portfolio/`

> **Note on Relative Paths:** All assets, stylesheets, scripts, and PDF downloads use strict relative paths (e.g. `assets/resume/...` rather than `/assets/resume/...`), ensuring seamless functionality under custom domains and GitHub Pages subpaths.

---

## 🌟 Key Features & Technical Highlights

- **Visual Aesthetics:** Classic deep navy-blue primary palette with crisp white/slate content cards, glowing radial mesh accents, and balanced micro-interactions.
- **Scroll-Triggered Reveals:** Progressive, natural content reveals powered by the modern `IntersectionObserver` API without scroll hijacking or layout shift.
- **Hero Typing Effect:** Dynamic typewriter animation cycling between full-stack developer and data analytics titles.
- **Interactive Resume Download:** Direct HTML5 `download` attribute targeting the verified PDF resume file.
- **Accessibility & Reduced Motion:** Full `@media (prefers-reduced-motion: reduce)` compliance, keyboard navigation focus rings, ARIA roles, and high contrast typography.
- **Client-Side Quick Mail Assistant:** Instant mail composer opening pre-filled drafts in the user's default email client, with one-click clipboard copy and toast notifications.
