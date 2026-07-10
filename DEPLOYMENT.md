# 📁 Project File Structure

```
al-bataka-website/
│
├── 🌐 Website Files (For Domain Upload)
│   ├── index.html              ← Home page
│   ├── about.html              ← Corporate Profile
│   ├── services.html           ← Services
│   ├── projects.html           ← Projects Portfolio
│   ├── support.html            ← Project Support
│   ├── contact.html            ← Contact Form
│   │
│   ├── 🎨 Main Styles
│   │   ├── style.css           ← Global styles, colors, animations
│   │   ├── mobile.css          ← Responsive (tablet/mobile)
│   │   │
│   │   └── 📄 Page-Specific Styles
│   │       ├── about.css       ← Corporate page styles
│   │       ├── services.css    ← Services page styles
│   │       ├── projects.css    ← Projects page styles
│   │       ├── support.css     ← Support page styles
│   │       └── contact.css     ← Contact page styles
│   │
│   ├── 📜 JavaScript Files
│   │   ├── script.js           ← Main interactive features
│   │   │
│   │   └── 📄 Page-Specific Scripts
│   │       ├── home.js         ← Home page only
│   │       ├── about.js        ← Corporate page only
│   │       ├── services.js     ← Services page only
│   │       ├── projects.js     ← Projects page only
│   │       ├── support.js      ← Support page only
│   │       └── contact.js      ← Contact page only
│   │
│   └── 🖼️ Assets
│       └── images/
│           ├── logo_final.png           ← Company logo
│           ├── hero.png                 ← Homepage hero bg
│           ├── team.png                 ← About page
│           ├── safety.png               ← Core values
│           ├── materials.png            ← Services
│           ├── transport.png            ← Equipment
│           ├── excavator.png            ← Equipment
│           ├── bulldozer.png            ← Equipment
│           ├── wheel loader.jpg         ← Equipment
│           ├── backhoe loader.png       ← Equipment
│           ├── porta_cabin.jpg          ← Equipment
│           ├── generator.png            ← Equipment
│           ├── safety.jpg               ← Image
│           ├── value.jpg                ← Image
│           └── ... (other images)
│
├── ⚙️ Backend (For VPS / Node.js Hosting Only)
│   ├── server.js               ← Node.js API server
│   ├── package.json            ← Dependencies
│   ├── package-lock.json       ← Lock file (auto-generated)
│   ├── .env                    ← **CREATE THIS** - Email credentials
│   └── inquiries.log           ← Contact form submissions (auto-created)
│
├── 📖 Documentation
│   ├── README.md               ← Full deployment guide
│   ├── DEPLOYMENT.md           ← This file - quick structure reference
│   └── sitemap.xml             ← SEO sitemap
│
├── 🔒 Configuration
│   ├── .gitignore              ← Files to exclude from git
│   ├── robots.txt              ← SEO robots instructions
│   └── .env.example            ← Example environment file
│
└── 📝 Additional Files (Not for upload)
    ├── node_modules/           ← npm packages (DO NOT UPLOAD)
    ├── .kilo/                  ← Kilo CLI config (DO NOT UPLOAD)
    ├── .git/                   ← Git repository (DO NOT UPLOAD)
    ├── server-output.log       ← Server logs (DO NOT UPLOAD)
    ├── ms-vscode.live-server*  ← VS Code extensions (DO NOT UPLOAD)
    └── *.pdf                   ← Design mockups (DO NOT UPLOAD)
```

---

## 📤 What to Upload to Your Domain / Hosting

### **Option A: Shared Hosting (cPanel, Hostinger, GoDaddy)** ⭐ **NO Node.js**

**Upload ONLY these files** to `public_html/` or `htdocs/`:

```
✅ index.html
✅ about.html
✅ services.html
✅ projects.html
✅ support.html
✅ contact.html
✅ style.css
✅ mobile.css
✅ about.css
✅ services.css
✅ projects.css
✅ support.css
✅ contact.css
✅ script.js
✅ home.js
✅ about.js
✅ services.js
✅ projects.js
✅ support.js
✅ contact.js
✅ assets/ (entire folder with all images)
✅ README.md (optional)
✅ sitemap.xml (optional for SEO)
✅ robots.txt (optional)
```

**DO NOT upload** (backend files not needed on shared hosting):
```
❌ server.js
❌ package.json
❌ package-lock.json
❌ .env (contains secrets)
❌ node_modules/
❌ inquiries.log
❌ server-output.log
```

**Contact Form on Shared Hosting:**
- Replace the form with **Formspree** or **Formcarry** integration
- See README.md section "Option B: Use Formspree / Formcarry for Contact Form"

---

### **Option B: VPS / Cloud Server (Ubuntu, DigitalOcean, AWS)** ⭐ **With Node.js**

**Upload ALL files** (except these ignored by .gitignore):
```
✅ Everything except:
   - node_modules/ (will run `npm install` on server)
   - .env (create separately on server)
   - .git/
   - .kilo/
   - *.log files
```

**Full upload list:**
```
index.html
about.html
services.html
projects.html
support.html
contact.html
style.css
mobile.css
about.css
services.css
projects.css
support.css
contact.css
script.js
home.js
about.js
services.js
projects.js
support.js
contact.js
assets/
server.js
package.json
package-lock.json
README.md
sitemap.xml
robots.txt
.gitignore
```

---

## 🗂️ Folder Descriptions

| Folder/File | Purpose | Upload to Domain? |
|-------------|---------|------------------|
| `index.html` | Home page | ✅ YES |
| `about.html` | Corporate profile | ✅ YES |
| `services.html` | Services listing | ✅ YES |
| `projects.html` | Portfolio | ✅ YES |
| `support.html` | Support details | ✅ YES |
| `contact.html` | Contact form | ✅ YES |
| `style.css` | Main styles | ✅ YES |
| `mobile.css` | Responsive styles | ✅ YES |
| `*.css` (page-specific) | Page-specific styles | ✅ YES |
| `script.js` | Main JavaScript | ✅ YES |
| `*.js` (page-specific) | Page-specific scripts | ✅ YES |
| `assets/` | All images | ✅ YES (entire folder) |
| `server.js` | Node.js backend | ❌ NO (shared hosting)<br>✅ YES (VPS) |
| `package.json` | Node dependencies | ❌ NO (shared hosting)<br>✅ YES (VPS) |
| `.env` | Email config | ❌ NEVER upload (sensitive) |
| `node_modules/` | npm packages | ❌ NO (reinstall on server) |
| `inquiries.log` | Form submissions | ❌ NO (auto-created) |
| `README.md` | Documentation | ✅ Optional |
| `sitemap.xml` | SEO sitemap | ✅ YES |
| `robots.txt` | SEO robots | ✅ YES |

---

## 🚀 Deployment Checklist

### Before Uploading:
- [ ] Edit all HTML files with your company info
- [ ] Replace images in `assets/images/`
- [ ] Update colors in `style.css` (lines 12-28)
- [ ] Update Google Maps in `contact.html`
- [ ] Test locally: `npm start` → http://localhost:3000
- [ ] Hard refresh and check all 6 pages load

### For Shared Hosting (cPanel):
- [ ] Zip files: `index.html`, `about.html`, `services.html`, `projects.html`, `support.html`, `contact.html`, `style.css`, `mobile.css`, `about.css`, `services.css`, `support.css`, `contact.css`, `projects.css`, `script.js`, `home.js`, `about.js`, `services.js`, `projects.js`, `support.js`, `contact.js`, `assets/`, `sitemap.xml`, `robots.txt`
- [ ] Upload ZIP to `public_html/` and extract
- [ ] Set `index.html` as default page
- [ ] Test: `http://yourdomain.com`
- [ ] Contact form: Set up Formspree (see README.md)

### For VPS (Node.js):
- [ ] Upload ALL files (including `server.js`, `package.json`)
- [ ] SSH into server
- [ ] Run: `npm install`
- [ ] Create `.env` with email credentials
- [ ] Start with PM2: `pm2 start server.js --name albaraka`
- [ ] Configure Nginx reverse proxy
- [ ] Set up SSL certificate
- [ ] Test: `http://yourdomain.com`

---

## 🔧 File Edit Reference

| What to Edit | File | Location | Example |
|---------------|------|----------|---------|
| Company name | `index.html` | Line 6 (title), throughout | Al Baraka Diyar |
| Phone number | `index.html` | Lines 695, 702, 709 | +971 2 555 9000 |
| Email address | `index.html`, `contact.html` | Multiple locations | info@albaraka.com |
| Address | `contact.html` | Lines 695-696 | Musaffah, Abu Dhabi |
| Logo image | `index.html` | Line 155 (src) | assets/images/logo.png |
| Brand colors | `style.css` | Lines 12-28 (--accent-gold) | #C5A059 → your color |
| Contact form recipient | `.env` | `CONTACT_RECEIVER` | info@yourcompany.com |
| Google Map | `contact.html` | Line 92 (iframe src) | Embed code from Google Maps |

---

## ❓ Common Questions

**Q: Where do I put my company logo?**  
A: Replace `assets/images/logo_final.png` with your logo (PNG with transparent background, recommended size: 300x100px).

**Q: Do I need server.js on my hosting?**  
A: Only if you have a VPS. For shared hosting (cPanel), **delete/ignore** `server.js` and use Formspree for the contact form.

**Q: How do I change the gold color?**  
A: Edit `style.css` line 15: `--accent-gold: #C5A059;` → replace with your hex color.

**Q: Where are the partner/client logos?**  
A: The partners section (index.html lines 654-680) currently shows text. To add logos, upload images to `assets/images/partners/` and update HTML to use `<img>` tags. See README.md for details.

**Q: My contact form isn't working!**  
A: For VPS: Check `.env` file has correct email credentials. For shared hosting: Replace with Formspree integration (see README.md).

---

**Need help?** Refer to the full **README.md** for detailed deployment instructions.
